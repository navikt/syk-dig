import { ApolloCache, ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client'
import { Resolver } from '@apollo/client/core/LocalState'
import { useEffect } from 'react'

import { ModiaContextDocument, UpdateAktivEnhetMutationVariables } from '../queries/graphql.generated'
import { ModiaContext, ModiaContextError } from '../../modia/ModiaService'

export const modiaLocalResolvers: Record<string, Resolver> = {
    updateModiaEnhet: (
        _,
        { enhetId }: UpdateAktivEnhetMutationVariables,
        { cache: apolloCache }: { cache: ApolloCache<unknown> },
    ) => {
        const modiaQuery = apolloCache.readQuery({ query: ModiaContextDocument })

        apolloCache.writeQuery({
            query: ModiaContextDocument,
            data: {
                __typename: 'Query',
                ...modiaQuery,
                modia: modiaQuery?.modia ? { ...modiaQuery.modia, aktivEnhet: enhetId } : null,
            },
        })
    },
}

export function setInitialModiaQueryState(cache: ApolloCache<unknown>, modiaContext: ModiaContext): void {
    const existingContext = cache.readQuery({ query: ModiaContextDocument })
    cache.writeQuery({
        query: ModiaContextDocument,
        data: {
            __typename: 'Query',
            modia: {
                __typename: 'ModiaContext',
                ...modiaContext,
                aktivEnhet:
                    existingContext?.modia?.aktivEnhet ??
                    modiaContext.aktivEnhet ??
                    modiaContext.enheter[0]?.enhetId ??
                    null,
                enheter: modiaContext.enheter.map((it) => ({
                    __typename: 'ModiaEnhet' as const,
                    ...it,
                })),
            },
        },
    })
}

export function useModiaContextUpdated(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    modiaContext: ModiaContext | ModiaContextError | undefined,
): void {
    useEffect(() => {
        if (modiaContext && !('errorType' in modiaContext)) {
            setInitialModiaQueryState(apolloClient.cache, modiaContext)
        }
    }, [apolloClient.cache, modiaContext])
}

export function useSelectedModiaEnhet(): string {
    const { data } = useQuery(ModiaContextDocument)

    if (!data?.modia) {
        throw new Error('Modia context failed to load')
    }

    if (data.modia.enheter.length === 0) {
        throw new Error('User without modia enheter')
    }

    if (!data?.modia?.aktivEnhet) {
        return data.modia.enheter[0].enhetId
    }

    return data.modia.aktivEnhet
}
