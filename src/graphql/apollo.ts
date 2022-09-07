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

import logger from '../utils/logger';

import possibleTypesGenerated from './queries/possible-types.generated';

export const cacheConfig: Pick<InMemoryCacheConfig, 'possibleTypes' | 'typePolicies'> = {
    possibleTypes: possibleTypesGenerated.possibleTypes,
    typePolicies: {},
};

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
    const cache = new InMemoryCache(cacheConfig);
    const httpLink = new HttpLink({
        uri: `/api/graphql`,
    });

    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        cache,
        link: from([
            errorLink,
            new RetryLink({
                attempts: { max: 3 },
            }),
            httpLink,
        ]),
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
