import { http, HttpResponse } from 'msw'
import { PropsWithChildren, ReactElement } from 'react'
import { ApolloLink, useQuery } from '@apollo/client'
import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react'
import { MockedProvider, MockedResponse, MockLink } from '@apollo/client/testing'
import { onError } from '@apollo/client/link/error'

import { server } from '../../../mocks/server'
import pasientNavn from '../mock/pasientNavn.json'
import sykmelder from '../mock/sykmelder.json'
import { apiUrl } from '../smreg/api'
import NasjonalSykmeldingForm from '../form/NasjonalSykmeldingForm'
import { NasjonalOppgaveByIdDocument } from '../../../graphql/queries/graphql.generated'

type ProviderProps = {
    readonly mocks?: MockedResponse[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customRenderHook = <TProps, TResult>(
    hook: (props: TProps) => TResult,
    options: Omit<RenderHookOptions<TProps>, 'wrapper'> & ProviderProps = {},
): RenderHookResult<TResult, TProps> => {
    const { mocks, ...renderOptions } = options

    return renderHook(hook, {
        wrapper: (props) => <AllTheProviders {...props} mocks={mocks} />,
        ...renderOptions,
    })
}

export function mockBehandlerinfo(): void {
    server.use(http.get(apiUrl('/proxy/sykmelder/:hpr'), () => HttpResponse.json(sykmelder)))
}

export function mockPasientinfo(): void {
    server.use(http.get(apiUrl('/proxy/pasient'), () => HttpResponse.json(pasientNavn)))
}

const errorLoggingLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions?.dontLog) {
                // eslint-disable-next-line no-console
                console.log('[GraphQL error]:' + `Message: ${message},` + `Location: ${locations},` + `Path: ${path}`)
            }
        })
    }

    if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`)
    }
})

function AllTheProviders({ children, mocks }: PropsWithChildren<ProviderProps>): ReactElement {
    const mockLink = new MockLink(mocks ?? [])
    const link = ApolloLink.from([errorLoggingLink, mockLink])

    return (
        <MockedProvider link={link} mocks={mocks}>
            {children}
        </MockedProvider>
    )
}

export function TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway({
    oppgaveId,
}: {
    oppgaveId: string
}): ReactElement {
    const query = useQuery(NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId: oppgaveId },
    })

    if (query.loading) {
        return <div>Loading...</div>
    }

    if (query.data?.nasjonalOppgave?.__typename === 'NasjonalOppgave') {
        return (
            <NasjonalSykmeldingForm
                oppgaveId={oppgaveId}
                sykmelding={query.data?.nasjonalOppgave?.nasjonalSykmelding ?? null}
                ferdigstilt={false}
            />
        )
    }
    return <div>Sykmelding ble ikke funnet</div>
}
