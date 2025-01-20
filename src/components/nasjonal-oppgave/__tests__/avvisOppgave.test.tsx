import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { within } from '@testing-library/react'

import { render, screen } from '../../../utils/testUtils'
import { apiUrl } from '../smreg/api'
import { server } from '../../../mocks/server'

import fullOppgave from './testData/fullOppgave.json'
import {
    mockBehandlerinfo,
    mockPasientinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'

describe('Avvis oppgave', async () => {
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it.skip('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {
        server.use(
            http.get(apiUrl(`/proxy/oppgave/${fullOppgave.oppgaveid}`), () => HttpResponse.json(fullOppgave)),
            http.post(
                apiUrl(`/proxy/oppgave/${fullOppgave.oppgaveid}/avvis`),
                () => new HttpResponse(undefined, { status: 204 }),
            ),
        )

        render(
            <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                oppgaveId={`${fullOppgave.oppgaveid}`}
            />,
            {
                useRestLink: true,
            },
        )

        await userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmeldingen' }))
        expect(await screen.findByText('Er du sikker på at du vil avvise sykmeldingen?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmelding' }))

        expect(
            within(await screen.findByRole('dialog', { name: 'Oppgaven ble ferdigstilt.' })).getByRole('button', {
                name: 'Klikk her dersom du ikke blir videresendt...',
            }),
        ).toBeInTheDocument()
    }, 25_000)
})
