import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { apiUrl } from '../smreg/api'
import { server } from '../../../mocks/server'
import { render, screen } from '../../../utils/testUtils'
import NasjonalOppgaveView from '../NasjonalOppgaveView'

import nullFnrOppgave from './testData/nullFnrOppgave.json'
import { mockBehandlerinfo } from './smregTestUtils'

describe('Load pasientinfo', async () => {
    beforeEach(() => {
        mockBehandlerinfo()
    })

    it('Should search for name of pasient when typing 11 digits in pasientFnr input field', async () => {
        server.use(
            http.get(apiUrl(`/oppgave/${nullFnrOppgave.oppgaveid}`), () => HttpResponse.json(nullFnrOppgave)),
            http.get(apiUrl('/pasient'), () =>
                HttpResponse.json({
                    fornavn: 'Per',
                    mellomnavn: 'Anders',
                    etternavn: 'Persson',
                }),
            ),
        )

        render(<NasjonalOppgaveView oppgaveId={`${nullFnrOppgave.oppgaveid}`} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(await screen.findByText('Per Anders Persson')).toBeInTheDocument()
    })

    it('Should display error when request fails', async () => {
        server.use(
            http.get(apiUrl(`/oppgave/${nullFnrOppgave.oppgaveid}`), () => HttpResponse.json(nullFnrOppgave)),
            http.get(apiUrl('/pasient'), () => HttpResponse.text('Internal server error', { status: 500 })),
        )

        render(<NasjonalOppgaveView oppgaveId={`${nullFnrOppgave.oppgaveid}`} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(
            await screen.findByText('En feil oppsto ved henting av pasient info. Ta kontakt dersom feilen vedvarer.'),
        ).toBeInTheDocument()
    })
})
