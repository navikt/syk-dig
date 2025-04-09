import { MutationTuple, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import {
    AvvisNasjonalOppgaveDocument,
    OppdatertSykmeldingStatus,
    AvvisNasjonalOppgaveMutation,
    AvvisNasjonalOppgaveMutationVariables,
    TilbakeTilGosysNasjonalDocument,
} from '../../../graphql/queries/graphql.generated'

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

export function useAvvisSykmeldingNasjonal({
    onCompleted,
}: {
    onCompleted?: () => void
}): MutationTuple<AvvisNasjonalOppgaveMutation, AvvisNasjonalOppgaveMutationVariables> {
    return useMutation<AvvisNasjonalOppgaveMutation, AvvisNasjonalOppgaveMutationVariables>(
        AvvisNasjonalOppgaveDocument,
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
