import { http, HttpResponse } from 'msw'
import {PropsWithChildren, ReactElement} from 'react'

import { server } from '../../../mocks/server'
import pasientNavn from '../mock/pasientNavn.json'
import sykmelder from '../mock/sykmelder.json'
import { apiUrl } from '../smreg/api'
import NasjonalSykmeldingForm from '../form/NasjonalSykmeldingForm'
import {ApolloLink, gql, QueryResult, useQuery} from "@apollo/client";
import {
    NasjonalOppgaveByIdDocument,
    NasjonalOppgaveByIdQuery,
    NasjonalOppgaveByIdQueryVariables, OppgaveByIdDocument
} from "../../../graphql/queries/graphql.generated";
import { print } from 'graphql';
import {renderHook, RenderHookOptions, RenderHookResult} from "@testing-library/react";
import {MockedProvider, MockedResponse, MockLink} from "@apollo/client/testing";
import {onError} from "@apollo/client/link/error";

type ProviderProps = {
    readonly mocks?: MockedResponse[]
}

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
                console.log('[GraphQL error]:' + `Message: ${message},` + `Location: ${locations},` + `Path: ${path}`)
            }
        })
    }

    if (networkError) {
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
    oppgaveId
}: {
    oppgaveId: string,

}): ReactElement {
   const query = useQuery(
        NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId: oppgaveId },
    })

    if (query.loading) {
        return <div>Loading...</div>
    }

    console.log("Query vars" + query.variables?.oppgaveId);
    console.log("Queryerror " + JSON.stringify(query.error))
    console.log("Query Variables: ", JSON.stringify(query.variables));
    console.log("Query data" + JSON.stringify(query.data));
    console.log("Query data" + query.data);

    /* <NasjonalSykmeldingForm
    /* <NasjonalSykmeldingForm
    oppgaveId={oppgaveId}
    sykmelding={query.data?.nasjonalOppgave.nasjonalSykmelding ?? null}
    ferdigstilt={false}
    />*/
    if (query.data?.nasjonalOppgave?.__typename === 'NasjonalOppgave') {
        console.log("Perioder " + query.data?.nasjonalOppgave.nasjonalSykmelding?.perioder)
        console.log("OppgaveId " + JSON.stringify(query.data?.nasjonalOppgave.oppgaveId))
        return (
            <div></div>

        )
    }
    else {
        return <div>Sykmelding ble ikke funnet</div>
    }

}
