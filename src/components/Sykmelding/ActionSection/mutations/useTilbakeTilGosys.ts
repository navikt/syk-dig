import { MutationResult, useMutation } from '@apollo/client'

import { TilbakeTilGosysDocument, TilbakeTilGosysMutation } from '../../../../graphql/queries/graphql.generated'
import { Location, useOppgaveParam } from '../../../../utils/useOppgaveParam'

type UseHandleTilbakeTilGosysOptions = {
    onCompleted?: () => void
}

type UseHandleTilbakeTilGosys = [tilbakeTilGosys: () => void, result: MutationResult<TilbakeTilGosysMutation>]

export function useHandleTilbakeTilGosys({ onCompleted }: UseHandleTilbakeTilGosysOptions): UseHandleTilbakeTilGosys {
    const params = useOppgaveParam(Location.Utenlansk)
    const [tilbakeTilGosys, mutationResult] = useMutation(TilbakeTilGosysDocument)

    const mutation = async (): Promise<void> => {
        await tilbakeTilGosys({
            variables: { oppgaveId: params.oppgaveId },
        })
        onCompleted?.()
    }

    return [mutation, mutationResult]
}
