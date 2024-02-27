import { gql, MutationResult, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { RuleHitErrors } from '../schema/RuleHitErrors'
import { Oppgave } from '../schema/oppgave/Oppgave'
import { mapFormValueToSmregRegistrertSykmelding } from '../smreg/smreg-mapping'
import { useSelectedModiaEnhet } from '../../../graphql/localState/modia'
import { redirectTilGosys } from '../../../utils/gosys'

import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'

export function useNasjonalSykmeldingSubmitHandler(
    oppgaveMeta: { oppgaveId: string } | { ferdigstilt: true; sykmeldingId: string },
    oppgave: Oppgave,
): [(values: NasjonalFormValues) => void, MutationResult<{ ruleHits: RuleHitErrors | null }>] {
    const enhetId = useSelectedModiaEnhet()

    const url =
        'sykmeldingId' in oppgaveMeta
            ? `sykmelding/${oppgaveMeta.sykmeldingId}`
            : `oppgave/${oppgaveMeta.oppgaveId}/send`

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
            context: { headers: { 'X-Nav-Enhet': enhetId } },
            onCompleted: (data) => {
                if (data.ruleHits == null) {
                    redirectTilGosys()
                }
            },
            onError: (error) => {
                if (error.networkError) {
                    if ('response' in error.networkError) {
                        logger.info(`Server responded with ${error.networkError.statusCode}, squelching error log`)
                        return
                    }
                    throw error
                }
            },
        },
    )

    return [
        async (values) => {
            const mappedValues = mapFormValueToSmregRegistrertSykmelding(values, oppgave)

            await mutate({
                variables: { input: mappedValues, path: url },
            })
        },
        result,
    ]
}
