import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { PropsWithChildren, ReactElement } from 'react'
import { RenderOptions, render, Screen } from '@testing-library/react'
import { Cache, InMemoryCache } from '@apollo/client'
import open from 'open'

import { cacheConfig } from '../graphql/apollo'
import { ModiaProvider } from '../modia/modia-context'

type ProviderProps = {
    readonly initialState?: Cache.WriteQueryOptions<unknown, unknown>[]
    readonly mocks?: MockedResponse[]
    readonly useRestLink?: boolean
}

function AllTheProviders({ children, initialState, mocks }: PropsWithChildren<ProviderProps>): ReactElement {
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
            <MockedProvider mocks={mocks} cache={cache}>
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

export async function openPlayground(screen: Screen): Promise<void> {
    await open(screen.logTestingPlaygroundURL())
}

export * from '@testing-library/react'

export { customRender as render }
