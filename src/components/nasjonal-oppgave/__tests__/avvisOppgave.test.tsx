import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { within } from '@testing-library/react'

import { render, screen } from '../../../utils/testUtils'
import { apiUrl } from '../smreg/api'
import { server } from '../../../mocks/server'
import NasjonalOppgaveView from '../NasjonalOppgaveView'

import fullOppgave from './testData/fullOppgave.json'
import { mockBehandlerinfo, mockPasientinfo } from './smregTestUtils'

describe('Avvis oppgave', async () => {
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {
        server.use(
            http.get(apiUrl(`/oppgave/${fullOppgave.oppgaveid}`), () => HttpResponse.json(fullOppgave)),
            http.post(
                apiUrl(`/oppgave/${fullOppgave.oppgaveid}/avvis`),
                () => new HttpResponse(undefined, { status: 204 }),
            ),
        )

        render(<NasjonalOppgaveView oppgaveId={`${fullOppgave.oppgaveid}`} layout={undefined} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

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
