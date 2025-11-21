import { MockedProvider } from '@apollo/client/testing/react'
import { PropsWithChildren, ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import { ApolloLink, Cache, InMemoryCache } from '@apollo/client'
import { MockLink } from '@apollo/client/testing'
import { ErrorLink } from '@apollo/client/link/error'
import { logger } from '@navikt/next-logger'

import { cacheConfig } from '../graphql/apollo'
import { ModiaProvider } from '../modia/modia-context'

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<never, never>[]
    readonly mocks?: MockLink.MockedResponse[]
    readonly useRestLink?: boolean
}

function AllTheProviders({ children, initialState, mocks }: PropsWithChildren<ProviderProps>): ReactElement {
    const cache = new InMemoryCache(cacheConfig)

    initialState?.forEach((it) => cache.writeQuery(it))

    const mockLink = new MockLink(mocks ?? [], { showWarnings: true })
    const errorLoggingLink = new ErrorLink(({ error }) => {
        logger.warn(`GraphQL Error in test: ${error.message}`)
    })

    return (
        <ModiaProvider
            modiaContext={{
                fornavn: 'Test',
                etternavn: 'saksbehandler',
                ident: 'A1337',
                aktivEnhet: 'B17',
                enheter: [
                    { navn: 'Tromsø Kontaktsenter', enhetId: 'B17' },
                    { navn: 'NAV Tøyen', enhetId: 'L99' },
                ],
            }}
        >
            <MockedProvider mocks={mocks} cache={cache} link={ApolloLink.from([errorLoggingLink, mockLink])}>
                {children}
            </MockedProvider>
        </ModiaProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'> & ProviderProps,
): ReturnType<typeof render> =>
    render(ui, {
        wrapper: (props) => (
            <AllTheProviders
                {...props}
                initialState={options?.initialState}
                mocks={options?.mocks}
                useRestLink={options?.useRestLink}
            />
        ),
        ...options,
    })

export * from '@testing-library/react'

export { customRender as render }
