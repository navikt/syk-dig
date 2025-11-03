import { MutationResult, useMutation } from '@apollo/client'

import { TilbakeTilGosysDocument, TilbakeTilGosysMutation } from '../../../../graphql/queries/graphql.generated'
import { Location, useOppgaveParam } from '../../../../utils/useOppgaveParam'
import { useModiaContext } from '../../../../modia/modia-context'

type UseHandleTilbakeTilGosysOptions = {
    onCompleted?: () => void
}

type UseHandleTilbakeTilGosys = [tilbakeTilGosys: () => void, result: MutationResult<TilbakeTilGosysMutation>]

export function useHandleTilbakeTilGosys({ onCompleted }: UseHandleTilbakeTilGosysOptions): UseHandleTilbakeTilGosys {
    const modiaContext = useModiaContext()
    const params = useOppgaveParam(Location.Utenlansk)
    const [tilbakeTilGosys, mutationResult] = useMutation(TilbakeTilGosysDocument)

    const mutation = async (): Promise<void> => {
        await tilbakeTilGosys({
            variables: { oppgaveId: params.oppgaveId, navEnhet: modiaContext.selectedEnhetId },
        })
        onCompleted?.()
    }

    return [mutation, mutationResult]
}
