import { gql, MutationResult, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'
import { useRouter, useSearchParams } from 'next/navigation'

import { RuleHitErrors } from '../schema/RuleHitErrors'
import { mapFormValueToSmregRegistrertSykmelding } from '../smreg/smreg-mapping'
import { useModiaContext } from '../../../modia/modia-context'
import { redirectTilGosys } from '../../../utils/gosys'
import { raise } from '../../../utils/tsUtils'
import { NasjonalSykmeldingFragment } from '../../../graphql/queries/graphql.generated'
import { redirectTilModia } from '../../../utils/modia'

import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'

export function useNasjonalSykmeldingSubmitHandler(
    oppgaveMeta: { oppgaveId: string } | { ferdigstilt: true; sykmeldingId: string },
    sykmelding: NasjonalSykmeldingFragment | null,
): [(values: NasjonalFormValues) => Promise<void>, MutationResult<{ ruleHits: RuleHitErrors | null }>] {
    const router = useRouter()
    const params = useSearchParams()
    const context = useModiaContext()

    const url =
        'sykmeldingId' in oppgaveMeta
            ? `proxy/sykmelding/${oppgaveMeta.sykmeldingId}`
            : `proxy/oppgave/${oppgaveMeta.oppgaveId}/send`

    const [mutate, result] = useMutation<{ ruleHits: RuleHitErrors | null }>(
        gql`
            mutation SaveNasjonalSykmelding($input: RegistrertSykmelding!) {
                ruleHits: saveNasjonalSykmelding(input: $input)
                    @rest(type: "RuleHits", path: $path, method: "POST", bodyKey: "input") {
                    status
                    ruleHits
                }
            }
        `,
        {
            context: { headers: { 'X-Nav-Enhet': context.selectedEnhetId ?? raise('Mangler valgt enhet') } },
            onCompleted: (data) => {
                logger.info(
                    `Submitted nasjonal sykmelding (${JSON.stringify(oppgaveMeta, null, 2)}) OK (rule hits: ${data.ruleHits != null})`,
                )

                if (data.ruleHits == null) {
                    if (params?.get('source') === 'registrer-sykmelding') {
                        router.push('/registrer-sykmelding')
                    } else if ('ferdigstilt' in oppgaveMeta) {
                        redirectTilModia()
                    } else {
                        redirectTilGosys()
                    }
                }
            },
            onError: (error) => {
                if (error.networkError) {
                    if ('response' in error.networkError) {
                        logger.info(
                            `Server responded with ${error.networkError.statusCode} (save nasjonal sykmelding, ${JSON.stringify(oppgaveMeta)}), squelching error log`,
                        )
                        return
                    }
                    throw error
                }
            },
        },
    )

    return [
        async (values) => {
            try {
                const mappedValues = mapFormValueToSmregRegistrertSykmelding(values, sykmelding)
                logger.info(`Submitting nasjonal sykmelding with values ${JSON.stringify(oppgaveMeta, null, 2)}`)

                await mutate({
                    variables: { input: mappedValues, path: url },
                })
            } catch (error) {
                logger.error(
                    new Error(`Unknown parsing error, oppgaveMeta: ${JSON.stringify(oppgaveMeta)}`, { cause: error }),
                )

                throw error
            }
        },
        result,
    ]
}
