import { describe, it, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'

import { render, screen } from '../../../utils/testUtils'
import { server } from '../../../mocks/server'
import { apiUrl } from '../smreg/api'
import NasjonalOppgaveView from '../NasjonalOppgaveView'
import NasjonalOppgaveFerdigstiltView from '../NasjonalOppgaveFerdigstiltView'

import fullOppgave from './testData/fullOppgave.json'
import { mockBehandlerinfo, mockPasientinfo } from './smregTestUtils'

describe('Informing about new app', async () => {
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it('Should link to smreg oppgave', async () => {
        server.use(http.get(apiUrl(`/oppgave/${fullOppgave.oppgaveid}`), () => HttpResponse.json(fullOppgave)))

        render(<NasjonalOppgaveView oppgaveId={`${fullOppgave.oppgaveid}`} layout={undefined} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()
        expect(screen.getByText('Dette er en ny versjon av digitalisering av papirsykmeldinger')).toBeInTheDocument()

        const link = screen.getByRole('link', { name: 'denne sykmeldingen i den gamle løsningen' })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', 'https://smregistrering.intern.nav.no?oppgaveid=123')
    })

    it('Should link to smreg ferdigstilt oppgave', async () => {
        server.use(
            http.get(apiUrl(`/sykmelding/${fullOppgave.papirSmRegistering.sykmeldingId}/ferdigstilt`), () =>
                HttpResponse.json(fullOppgave),
            ),
        )

        render(
            <NasjonalOppgaveFerdigstiltView
                sykmeldingId={`${fullOppgave.papirSmRegistering.sykmeldingId}`}
                layout={undefined}
            />,
            {
                useRestLink: true,
            },
        )

        expect(
            await screen.findByRole('heading', { name: 'Korrigering av registrert papirsykmelding' }),
        ).toBeInTheDocument()
        expect(
            screen.getByText('Under kan du korrigere opplysningene i en allerede registrert papirsykmelding'),
        ).toBeInTheDocument()
        expect(screen.getByText('Dette er en ny versjon av digitalisering av papirsykmeldinger')).toBeInTheDocument()

        const link = screen.getByRole('link', { name: 'denne sykmeldingen i den gamle løsningen' })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute(
            'href',
            'https://smregistrering.intern.nav.no?sykmeldingid=a62a4ab1-aaf2-4394-9b16-0507583bcab3',
        )
    })
})
