import { ServerError } from '@apollo/client'
import { useMutation } from '@apollo/client/react'
import { logger } from '@navikt/next-logger'

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
    return useMutation(TilbakeTilGosysNasjonalDocument, {
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
            // oxlint-disable-next-line typescript/only-throw-error
            throw error
        },
    })
}

export function useAvvisSykmeldingNasjonal({
    onCompleted,
}: {
    onCompleted?: () => void
}): useMutation.ResultTuple<AvvisNasjonalOppgaveMutation, AvvisNasjonalOppgaveMutationVariables> {
    return useMutation(AvvisNasjonalOppgaveDocument, {
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
            // oxlint-disable-next-line typescript/only-throw-error
            throw error
        },
    })
}
