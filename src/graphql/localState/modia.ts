import { ApolloCache } from '@apollo/client';
import { Resolver } from '@apollo/client/core/LocalState';

import { ModiaContextDocument, UpdateAktivEnhetMutationVariables } from '../queries/graphql.generated';
import { ModiaContext } from '../../modia/ModiaService';

export const modiaLocalResolvers: Record<string, Resolver> = {
    updateModiaEnhet: (
        _,
        { enhetId }: UpdateAktivEnhetMutationVariables,
        { cache: apolloCache }: { cache: ApolloCache<unknown> },
    ) => {
        const modiaQuery = apolloCache.readQuery({ query: ModiaContextDocument });

        apolloCache.writeQuery({
            query: ModiaContextDocument,
            data: {
                __typename: 'Query',
                ...modiaQuery,
                modia: modiaQuery?.modia ? { ...modiaQuery.modia, aktivEnhet: enhetId } : null,
            },
        });
    },
};

export function setInitialModiaQueryState(cache: ApolloCache<unknown>, modiaContext: ModiaContext): void {
    cache.writeQuery({
        query: ModiaContextDocument,
        data: {
            __typename: 'Query',
            modia: {
                __typename: 'ModiaContext',
                ...modiaContext,
                enheter: modiaContext.enheter.map((it) => ({
                    __typename: 'ModiaEnhet' as const,
                    ...it,
                })),
            },
        },
    });
}
