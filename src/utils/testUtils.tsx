import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { PropsWithChildren, ReactElement } from 'react'
import { RenderOptions, render, Screen } from '@testing-library/react'
import { Cache, from, InMemoryCache, TypedDocumentNode } from '@apollo/client'
import { FetchResult } from '@apollo/client/link/core'
import { ResultFunction } from '@apollo/client/testing/core/mocking/mockLink'
import open from 'open'

import { cacheConfig } from '../graphql/apollo'
import smregRestLink from '../components/nasjonal-oppgave/smreg/rest-apollo-link'
import { ModiaProvider } from '../modia/modia-context'

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<unknown, unknown>[]
    readonly mocks?: MockedResponse[]
    readonly useRestLink?: boolean
}

function AllTheProviders({
    children,
    initialState,
    mocks,
    useRestLink,
}: PropsWithChildren<ProviderProps>): ReactElement {
    const cache = new InMemoryCache(cacheConfig)

    initialState?.forEach((it) => cache.writeQuery(it))

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
            <MockedProvider
                mocks={mocks}
                cache={cache}
                link={
                    useRestLink
                        ? /* Using the restLink allows the actual HTTP-requests to go through, so the
                         tests can use MSW for data while still piping the data through Apollo */
                          from([smregRestLink])
                        : undefined
                }
            >
                {children}
            </MockedProvider>
        </ModiaProvider>
    )
}

export function createInitialQuery<Query, Variables>(
    typedDocumentNode: TypedDocumentNode<Query, Variables>,
    data: Query,
    variables?: Variables,
): Cache.WriteQueryOptions<Query, Variables> {
    return {
        query: typedDocumentNode,
        data,
        variables,
    }
}

export function createMock<Query, Variables extends Record<string, unknown>>(mockedResponse: {
    request: { query: TypedDocumentNode<Query, Variables>; variables?: Variables }
    result?: FetchResult<Query> | ResultFunction<FetchResult<Query>>
    error?: Error
    delay?: number
    newData?: ResultFunction<FetchResult<Query>, Record<string, unknown>>
}): MockedResponse<Query> {
    return mockedResponse
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

export async function openPlayground(screen: Screen): Promise<void> {
    await open(screen.logTestingPlaygroundURL())
}

export * from '@testing-library/react'

export { customRender as render }
