import { useMutation } from '@apollo/client/react'
import { logger } from '@navikt/next-logger'
import { ServerError } from '@apollo/client'

import {
    AvvisNasjonalOppgaveDocument,
    AvvisNasjonalOppgaveMutation,
    AvvisNasjonalOppgaveMutationVariables,
    TilbakeTilGosysNasjonalDocument,
    TilbakeTilGosysNasjonalMutation,
    TilbakeTilGosysNasjonalMutationVariables,
} from '../../../graphql/queries/graphql.generated'

export function useTilbakeTilGosysNasjonal({
    onCompleted,
}: {
    onCompleted?: () => void
}): useMutation.ResultTuple<TilbakeTilGosysNasjonalMutation, TilbakeTilGosysNasjonalMutationVariables> {
    return useMutation<TilbakeTilGosysNasjonalMutation, TilbakeTilGosysNasjonalMutationVariables>(
        TilbakeTilGosysNasjonalDocument,
        {
            onCompleted: () => {
                onCompleted?.()
            },
            onError: (error, opts) => {
                if (ServerError.is(error)) {
                    logger.info(
                        `Server responded with ${error.statusCode} (tilbake til gosys, ${opts?.variables?.oppgaveId}), squelching error log`,
                    )
                    return
                }
                throw error
            },
        },
    )
}

export function useAvvisSykmeldingNasjonal({
    onCompleted,
}: {
    onCompleted?: () => void
}): useMutation.ResultTuple<AvvisNasjonalOppgaveMutation, AvvisNasjonalOppgaveMutationVariables> {
    return useMutation<AvvisNasjonalOppgaveMutation, AvvisNasjonalOppgaveMutationVariables>(
        AvvisNasjonalOppgaveDocument,
        {
            onCompleted: () => {
                onCompleted?.()
            },
            onError: (error, opts) => {
                if (ServerError.is(error)) {
                    logger.info(
                        `Server responded with ${error.statusCode} (avvis sykmelding, ${opts?.variables?.oppgaveId}), squelching error log`,
                    )
                    return
                }
                throw error
            },
        },
    )
}
