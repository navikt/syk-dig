import { http, HttpResponse } from 'msw'
import { ReactElement } from 'react'

import { server } from '../../../mocks/server'
import pasientNavn from '../mock/pasientNavn.json'
import sykmelder from '../mock/sykmelder.json'
import { apiUrl } from '../smreg/api'
import { useNasjonalOppgave } from '../useNasjonalOppgave'
import NasjonalSykmeldingForm from '../form/NasjonalSykmeldingForm'

export function mockBehandlerinfo(): void {
    server.use(http.get(apiUrl('/proxy//sykmelder/:hpr'), () => HttpResponse.json(sykmelder)))
}

export function mockPasientinfo(): void {
    server.use(http.get(apiUrl('/proxy/pasient'), () => HttpResponse.json(pasientNavn)))
}

export function TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway({
    oppgaveId,
}: {
    oppgaveId: string
}): ReactElement {
    const query = useNasjonalOppgave(oppgaveId)

    if (query.loading) {
        return <div>Loading...</div>
    }

    return (
        <NasjonalSykmeldingForm
            oppgaveId={oppgaveId}
            sykmelding={query.data?.oppgave.papirSmRegistering ?? null}
            ferdigstilt={false}
        />
    )
}
