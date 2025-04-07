import { gql, MutationTuple, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { useModiaContext } from '../../../modia/modia-context'
import { raise } from '../../../utils/tsUtils'
import { OppdatertSykmeldingStatus, TilbakeTilGosysNasjonalDocument } from '../../../graphql/queries/graphql.generated'

export function useTilbakeTilGosysNasjonal({
    onCompleted,
}: {
    onCompleted?: () => void
}): MutationTuple<OppdatertSykmeldingStatus, { oppgaveId: string }> {
    return useMutation<OppdatertSykmeldingStatus, { oppgaveId: string }>(TilbakeTilGosysNasjonalDocument, {
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
    })
}

/**
 * Is this functionally the same as tilbake to gosys in syk-dig? Can we re-use that mutation?
 */
export function useAvvisSykmeldingSmreg({
    onCompleted,
}: {
    onCompleted?: () => void
}): MutationTuple<unknown, { oppgaveId: string; input: { reason: string | null } }> {
    const context = useModiaContext()

    return useMutation<unknown, { oppgaveId: string; input: { reason: string | null } }>(
        gql`
            mutation TilbakeTilGosys($oppgaveId: String!, $input: Avvis!) {
                tilGosys(oppgaveId: $oppgaveId, input: $input)
                    @rest(path: "proxy/oppgave/{args.oppgaveId}/avvis", method: "POST")
            }
        `,
        {
            context: { headers: { 'X-Nav-Enhet': context.selectedEnhetId ?? raise('Mangler valgt enhet') } },
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
