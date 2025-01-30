import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'

import { createMock, render, screen, within } from '../../../utils/testUtils'
import { NasjonalOppgaveByIdDocument } from '../../../graphql/queries/graphql.generated'

import fullOppgaveWithoutPeriods from './testData/fullOppgaveWithoutPeriods.json'
import {
    mockBehandlerinfo,
    mockPasientinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'

describe('Mulighet for arbeid section', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mocks: any[]
    let testOppgaveId: string
    beforeEach(() => {
        mockBehandlerinfo()
        mockPasientinfo()
        testOppgaveId = '12345'
        mocks = [
            createMock({
                request: {
                    query: NasjonalOppgaveByIdDocument,
                    variables: { oppgaveId: testOppgaveId },
                },
                result: {
                    data: {
                        __typename: 'Query',
                        nasjonalOppgave: {
                            __typename: 'NasjonalOppgave',
                            oppgaveId: testOppgaveId,
                            documents: [],
                            nasjonalSykmelding: {
                                __typename: 'NasjonalSykmelding',
                                sykmeldingId: null,
                                fnr: null,
                                journalpostId: '123',
                                datoOpprettet: null,
                                syketilfelleStartDato: null,
                                behandletTidspunkt: null,
                                skjermesForPasient: null,
                                meldingTilArbeidsgiver: null,
                                arbeidsgiver: null,
                                behandler: null,
                                perioder: [],
                                meldingTilNAV: null,
                                medisinskVurdering: null,
                                kontaktMedPasient: null,
                            },
                        },
                    },
                },
            }),
        ]
    })

    it('Should be able to delete periode without messing up other periods', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invokedBody: any | null = null

        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={true}>
                <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                    oppgaveId={`${fullOppgaveWithoutPeriods.oppgaveid}`}
                />
            </MockedProvider>,
            {
                useRestLink: true,
            },
        )

        // Add avventende periode
        const arbeidsSection = within(await screen.findByRole('region', { name: '4 Mulighet for arbeid' }))
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

        expect(
            screen.queryByRole('heading', {
                name: /du må fylle ut disse feltene før du kan registrere sykmeldingen/i,
            }),
        ).not.toBeInTheDocument()

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
