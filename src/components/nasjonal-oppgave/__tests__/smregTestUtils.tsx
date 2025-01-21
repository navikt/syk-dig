import { http, HttpResponse } from 'msw'
import { ReactElement } from 'react'

import { server } from '../../../mocks/server'
import pasientNavn from '../mock/pasientNavn.json'
import sykmelder from '../mock/sykmelder.json'
import { apiUrl } from '../smreg/api'
import NasjonalSykmeldingForm from '../form/NasjonalSykmeldingForm'
import {useQuery} from "@apollo/client";
import {NasjonalOppgaveByIdDocument} from "../../../graphql/queries/graphql.generated";

export function mockBehandlerinfo(): void {
    server.use(http.get(apiUrl('/proxy/sykmelder/:hpr'), () => HttpResponse.json(sykmelder)))
}

export function mockPasientinfo(): void {
    server.use(http.get(apiUrl('/proxy/pasient'), () => HttpResponse.json(pasientNavn)))
}

export function TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway({
    oppgaveId,
}: {
    oppgaveId: string
}): ReactElement {
    const query = useQuery(NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId },
    })

    if (query.loading) {
        return <div>Loading...</div>
    }

    if (query.data?.nasjonalOppgave?.__typename === 'NasjonalOppgave') {
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
