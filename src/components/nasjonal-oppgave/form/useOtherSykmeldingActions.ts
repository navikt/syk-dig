import { gql, MutationTuple, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

/**
 * Is this functionally the same as tilbake to gosys in syk-dig? Can we re-use that mutation?
 */
export function useTilbakeTilGosysSmreg({
    onCompleted,
}: {
    onCompleted?: () => void
}): MutationTuple<unknown, { oppgaveId: string }> {
    return useMutation<unknown, { oppgaveId: string }>(
        gql`
            mutation TilbakeTilGosys($oppgaveId: String!) {
                tilGosys(oppgaveId: $oppgaveId, input: " ")
                    @rest(path: "oppgave/{args.oppgaveId}/tilgosys", method: "POST")
            }
        `,
        {
            onCompleted: () => {
                onCompleted?.()
            },
            onError: (error, opts) => {
                if (error.networkError) {
                    if ('response' in error.networkError) {
                        logger.info(
                            `Server responded with ${error.networkError.statusCode} (tilbake til gosys, ${opts?.variables?.oppgaveId}), squelching error log`,
                        )
                        return
                    }
                    throw error
                }
            },
        },
    )
}

/**
 * Is this functionally the same as tilbake to gosys in syk-dig? Can we re-use that mutation?
 */
export function useAvvisSykmeldingSmreg({
    onCompleted,
}: {
    onCompleted?: () => void
}): MutationTuple<unknown, { oppgaveId: string; input: { reason: string | null } }> {
    return useMutation<unknown, { oppgaveId: string; input: { reason: string | null } }>(
        gql`
            mutation TilbakeTilGosys($oppgaveId: String!, $input: Avvis!) {
                tilGosys(oppgaveId: $oppgaveId, input: $input)
                    @rest(path: "oppgave/{args.oppgaveId}/avvis", method: "POST")
            }
        `,
        {
            onCompleted: () => {
                onCompleted?.()
            },
            onError: (error, opts) => {
                if (error.networkError) {
                    if ('response' in error.networkError) {
                        logger.info(
                            `Server responded with ${error.networkError.statusCode} (avvis sykmelding, ${opts?.variables?.oppgaveId}), squelching error log`,
                        )
                        return
                    }
                    throw error
                }
            },
        },
    )
}
