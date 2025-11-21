import {
    ApolloClient,
    ApolloLink,
    CombinedGraphQLErrors,
    HttpLink,
    InMemoryCache,
    InMemoryCacheConfig,
    ServerError,
} from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { logger } from '@navikt/next-logger'

import { isLocalOrDemo } from '../utils/env'

import possibleTypesGenerated from './queries/possible-types.generated'

export const cacheConfig: Pick<InMemoryCacheConfig, 'possibleTypes' | 'typePolicies'> = {
    possibleTypes: possibleTypesGenerated.possibleTypes,
    typePolicies: {
        Digitaliseringsoppgave: { keyFields: ['oppgaveId'] },
        DigitaliseringsoppgaveStatus: { keyFields: ['oppgaveId'] },
        Document: { keyFields: ['dokumentInfoId'] },
        NasjonalOppgaveStatus: { keyFields: ['oppgaveId'] },
        NasjonalSykmeldingStatus: { keyFields: ['sykmeldingId'] },
    },
}

export function createApolloClient(): ApolloClient {
    const cache = new InMemoryCache(cacheConfig)

    const httpLink = new HttpLink({
        uri: !isLocalOrDemo ? `/api/graphql` : `/api/graphql-mock`,
    })

    return new ApolloClient({
        devtools: { enabled: true },
        ssrMode: typeof window === 'undefined',
        cache,
        link: ApolloLink.from([
            errorLink,
            new RetryLink({
                attempts: { max: 5 },
                delay: {
                    initial: 250,
                    jitter: true,
                },
            }),
            httpLink,
        ]),
    })
}

export const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
            logger.error(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`),
        )
    } else if (ServerError.is(error)) {
        logger.error(new Error(`[Server error]: ${error.message}`, { cause: error }))
    } else if (error) {
        logger.error(new Error(`[Other error]: ${error.message}`, { cause: error }))
    }
})
