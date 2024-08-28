import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { render, screen, within } from '../../../utils/testUtils'
import { server } from '../../../mocks/server'
import { apiUrl } from '../smreg/api'
import NasjonalOppgaveView from '../NasjonalOppgaveView'

import fullOppgaveWithoutPeriods from './testData/fullOppgaveWithoutPeriods.json'
import { mockBehandlerinfo, mockPasientinfo } from './smregTestUtils'

describe('Mulighet for arbeid section', async () => {
    beforeEach(() => {
        mockBehandlerinfo()
        mockPasientinfo()
    })

    it('Should be able to delete periode without messing up other periods', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let invokedBody: any | null = null
        server.use(
            http.get(apiUrl(`/oppgave/${fullOppgaveWithoutPeriods.oppgaveid}`), () =>
                HttpResponse.json(fullOppgaveWithoutPeriods),
            ),
            http.post(apiUrl(`/oppgave/${fullOppgaveWithoutPeriods.oppgaveid}/send`), async ({ request }) => {
                invokedBody = await request.json()
                return new HttpResponse(undefined, { status: 204 })
            }),
        )

        render(<NasjonalOppgaveView oppgaveId={`${fullOppgaveWithoutPeriods.oppgaveid}`} layout={undefined} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

        // Add avventende periode
        const arbeidsSection = within(screen.getByRole('region', { name: '4 Mulighet for arbeid' }))
        await userEvent.selectOptions(
            await arbeidsSection.findByRole('combobox', { name: 'Periodetype' }),
            'avventende',
        )
        await userEvent.type(arbeidsSection.getByLabelText('F.o.m'), '010120')
        await userEvent.type(arbeidsSection.getByLabelText('T.o.m'), '030120')
        await userEvent.type(arbeidsSection.getByText('Andre innspill til arbeidsgiver'), 'Innspill til arbeidsgiver')

        // Add gradert periode
        await userEvent.click(screen.getByText('Legg til periode'))

        const gradertPeriodeSection = within(screen.getByRole('region', { name: 'Periode 2' }))
        await userEvent.selectOptions(gradertPeriodeSection.getByLabelText('Periodetype'), '4.2 Gradert sykmelding')
        await userEvent.type(gradertPeriodeSection.getByLabelText('F.o.m'), '010220')
        await userEvent.type(gradertPeriodeSection.getByLabelText('T.o.m'), '030220')
        await userEvent.type(gradertPeriodeSection.getByText('Oppgi grad'), '80')

        // Add 100% periode
        await userEvent.click(screen.getByText('Legg til periode'))

        const vanligPeriodeSection = within(screen.getByRole('region', { name: 'Periode 3' }))
        await userEvent.selectOptions(vanligPeriodeSection.getByLabelText('Periodetype'), '4.3 100% sykmelding')
        await userEvent.type(vanligPeriodeSection.getByLabelText('F.o.m'), '010320')
        await userEvent.type(vanligPeriodeSection.getByLabelText('T.o.m'), '030320')
        await userEvent.click(vanligPeriodeSection.getByText(/Det er medisinske årsaker/))
        await userEvent.click(vanligPeriodeSection.getByText(/Helsetilstanden hindrer pasienten/))
        await userEvent.type(vanligPeriodeSection.getByText('Beskrivelse'), 'Medisinsk beskrivelse')
        await userEvent.click(vanligPeriodeSection.getByText(/Forhold på arbeidsplassen vanskeliggjør/))
        await userEvent.click(vanligPeriodeSection.getByText(/Manglende tilrettelegging/))
        await userEvent.type(vanligPeriodeSection.getAllByText('Beskrivelse')[1], 'Arbeidsrelatert beskrivelse')

        await userEvent.click(gradertPeriodeSection.getByRole('button', { name: 'Fjern periode' }))

        expect(screen.getAllByText('Periodetype')).toHaveLength(2)

        await userEvent.click(screen.getByText(/Feltene stemmer overens/))
        await userEvent.click(screen.getByRole('button', { name: 'Registrer sykmeldingen' }))

        expect(invokedBody.perioder).toEqual([
            {
                fom: '2020-01-01',
                tom: '2020-01-03',
                reisetilskudd: false,
                avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                aktivitetIkkeMulig: null,
                gradert: null,
                behandlingsdager: null,
            },
            {
                fom: '2020-03-01',
                tom: '2020-03-03',
                reisetilskudd: false,
                behandlingsdager: null,
                gradert: null,
                avventendeInnspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        arsak: ['TILSTAND_HINDRER_AKTIVITET'],
                        beskrivelse: 'Medisinsk beskrivelse',
                    },
                    arbeidsrelatertArsak: {
                        arsak: ['MANGLENDE_TILRETTELEGGING'],
                        beskrivelse: 'Arbeidsrelatert beskrivelse',
                    },
                },
            },
        ])
    }, 25_000)
})
