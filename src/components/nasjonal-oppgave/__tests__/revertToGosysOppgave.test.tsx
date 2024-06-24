import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { render, screen, within } from '../../../utils/testUtils'
import { server } from '../../../mocks/server'
import { apiUrl } from '../smreg/api'
import NasjonalOppgaveView from '../NasjonalOppgaveView'

import emptyOppgave from './testData/emptyOppgave.json'
import { mockPasientinfo } from './smregTestUtils'

describe('Send til GOSYS', async () => {
    beforeEach(() => {
        mockPasientinfo()
    })

    it('Should display modal when clicking "Send til GOSYS"', async () => {
        server.use(
            http.get(apiUrl(`/oppgave/${emptyOppgave.oppgaveid}`), () => HttpResponse.json(emptyOppgave)),
            http.post(
                apiUrl(`/oppgave/${emptyOppgave.oppgaveid}/tilgosys`),
                () => new HttpResponse(undefined, { status: 204 }),
            ),
        )

        render(<NasjonalOppgaveView oppgaveId={`${emptyOppgave.oppgaveid}`} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

        await userEvent.click(await screen.findByRole('button', { name: 'Dette er ikke en sykmelding' }))
        expect(await screen.findByText('Send til GOSYS?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Send til GOSYS' }))

        const dialog = within(await screen.findByRole('dialog', { name: 'Oppgaven ble sendt tilbake til Gosys.' }))
        expect(dialog.getByRole('button', { name: 'Klikk her dersom du ikke blir videresendt...' })).toBeInTheDocument()
    })
})
