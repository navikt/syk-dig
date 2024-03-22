import { gql, MutationResult, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { RuleHitErrors } from '../schema/RuleHitErrors'

import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'

export function useNasjonalSykmeldingSubmitHandler(
    oppgave: { oppgaveId: string } | { ferdigstilt: true; sykmeldingId: string },
): [(values: NasjonalFormValues) => void, MutationResult<{ ruleHits: RuleHitErrors | null }>] {
    const url = 'sykmeldingId' in oppgave ? `sykmelding/${oppgave.sykmeldingId}` : `oppgave/${oppgave.oppgaveId}/send`

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
            await mutate({
                variables: { input: values, path: url },
            })
        },
        result,
    ]
}
