import {
    ApolloClient,
    from,
    HttpLink,
    InMemoryCache,
    InMemoryCacheConfig,
    NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { logger } from '@navikt/next-logger';

import { ModiaContext, ModiaContextError } from '../modia/ModiaService';

import possibleTypesGenerated from './queries/possible-types.generated';
import { modiaLocalResolvers, setInitialModiaQueryState } from './localState/modia';

export const cacheConfig: Pick<InMemoryCacheConfig, 'possibleTypes' | 'typePolicies'> = {
    possibleTypes: possibleTypesGenerated.possibleTypes,
    typePolicies: {
        Digitaliseringsoppgave: { keyFields: ['oppgaveId'] },
    },
};

export function createApolloClient(
    modiaContext: ModiaContext | ModiaContextError | undefined,
): ApolloClient<NormalizedCacheObject> {
    const cache = new InMemoryCache(cacheConfig);

    if (modiaContext && !('errorType' in modiaContext)) {
        setInitialModiaQueryState(cache, modiaContext);
    }

    const httpLink = new HttpLink({
        uri: `/api/graphql`,
    });

    return new ApolloClient({
        connectToDevTools: true,
        ssrMode: typeof window === 'undefined',
        cache,
        link: from([
            errorLink,
            new RetryLink({
                attempts: { max: 3 },
            }),
            httpLink,
        ]),
        resolvers: {
            Mutation: {
                ...modiaLocalResolvers,
            },
        },
    });
}

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
            logger.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`);
        });

    if (networkError) {
        logger.error(`[Network error]: ${networkError}`);
    }
});
