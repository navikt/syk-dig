import { http, HttpResponse } from 'msw'
import { ReactElement } from 'react'

import { server } from '../../../mocks/server'
import pasientNavn from '../mock/pasientNavn.json'
import sykmelder from '../mock/sykmelder.json'
import { apiUrl } from '../smreg/api'
import NasjonalSykmeldingForm from '../form/NasjonalSykmeldingForm'
import {QueryResult, useQuery} from "@apollo/client";
import {
    NasjonalOppgaveByIdDocument,
    NasjonalOppgaveByIdQuery,
    NasjonalOppgaveByIdQueryVariables, OppgaveByIdDocument
} from "../../../graphql/queries/graphql.generated";

export function mockBehandlerinfo(): void {
    server.use(http.get(apiUrl('/proxy/sykmelder/:hpr'), () => HttpResponse.json(sykmelder)))
}

export function mockPasientinfo(): void {
    server.use(http.get(apiUrl('/proxy/pasient'), () => HttpResponse.json(pasientNavn)))
}

export function TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway({
    oppgaveId
}: {
    oppgaveId: string,

}): ReactElement {
    const query = useQuery(NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId: oppgaveId },
    })

    if (query.loading) {
        return <div>Loading...</div>
    }
    console.log("Queryerror " + JSON.stringify(query.error))
    console.log("Query Variables: ", JSON.stringify(query.variables));
    console.log("Query data" + JSON.stringify(query.data));
    if (query.data?.nasjonalOppgave?.__typename === 'NasjonalOppgave') {
        console.log("Perioder " + query.data?.nasjonalOppgave.nasjonalSykmelding?.perioder)
        console.log("OppgaveId " + query.data?.nasjonalOppgave.oppgaveId)
        return (
            <NasjonalSykmeldingForm
                oppgaveId={oppgaveId}
                sykmelding={query.data?.nasjonalOppgave.nasjonalSykmelding ?? null}
                ferdigstilt={false}
            />
        )
    }
    else {
        return <div>Sykmelding ble ikke funnet</div>
    }

}
