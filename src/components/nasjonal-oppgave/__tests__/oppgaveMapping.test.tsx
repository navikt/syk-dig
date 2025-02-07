import { describe, it, expect } from 'vitest'

import { render, screen, within } from '../../../utils/testUtils'
import NasjonalOppgaveView from '../NasjonalOppgaveView'
import {
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    NasjonalOppgaveByIdDocument,
    NasjonalOppgaveFragment,
    NasjonalOppgaveStatusEnum,
    NasjonalOppgaveStatusFragment,
} from '../../../graphql/queries/graphql.generated'
import { formatsmregDate, formatsmregDateShorthand } from '../smregDateUtils'
import { ArbeidsrelatertArsakTypeValues, MedisinskArsakTypeValues } from '../schema/sykmelding/Periode'
import { createMock } from '../../../utils/test/apolloTestUtils'

import { mockBehandlerinfo, mockPasientinfo } from './smregTestUtils'
import { createNasjonalOppgave, createNasjonalOppgaveStatus } from './testData/dataCreators'

describe('Mapping opppgave fetched from API', async () => {
    it('Should map all fields when "nasjonalOppgave.nasjonalSykmelding" is completely filled out', async () => {
        mockPasientinfo()
        mockBehandlerinfo()

        const nasjonalOppgave: NasjonalOppgaveFragment = createNasjonalOppgave({ oppgaveId: '123456789' })
        const mocks = createMock({
            request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: '123456789' } },
            result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgave } },
        })

        render(<NasjonalOppgaveView oppgaveId={nasjonalOppgave.oppgaveId} layout={undefined} />, {
            mocks: [mocks],
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()

        // 1 Pasientopplysninger
        expect(await screen.findByLabelText('1.2 Fødselsnummer (11 siffer)')).toHaveDisplayValue('20026900817')

        // 2 Arbeidsgiver
        expect(screen.getByLabelText('2.1 Pasienten har')).toHaveDisplayValue('Én arbeidsgiver')
        expect(screen.getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen')).toHaveDisplayValue(
            'Langtvekkistan politidistrikt',
        )
        expect(screen.getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet')).toHaveDisplayValue('Politi')
        expect(screen.getByLabelText('2.4 Stillingsprosent')).toHaveDisplayValue('100')

        // 3 Diagnose
        expect(screen.getAllByDisplayValue('ICD10')).toHaveLength(2)
        expect(
            within(screen.getByRole('region', { name: '3.1 Hoveddiagnose' })).getAllByText('Main diagnosis text'),
        ).toHaveLength(1)

        const bidiagnoseSection = within(screen.getByRole('region', { name: '3.2 Bidiagnose' }))
        expect(bidiagnoseSection.getAllByText('Secondary diagnosis text')).toHaveLength(1)
        expect(screen.getByRole('checkbox', { name: /Annen lovfestet fraværsgrunn/ })).toBeChecked()
        expect(screen.getByRole('checkbox', { name: /Når vedkommende er under behandling/ })).toBeChecked()
        expect(
            screen.getByRole('checkbox', { name: /Når vedkommende er til nødvendig kontrollundersøkelse/ }),
        ).toBeChecked()
        expect(screen.getByRole('checkbox', { name: /Når vedkommende er under behandling/ })).toBeChecked()
        expect(screen.getByLabelText('3.3.2 Beskriv fravær (valgfritt)')).toHaveDisplayValue('Dette er årsaken')
        expect(screen.getByRole('checkbox', { name: /Sykdommen er svangerskapsrelatert/ })).toBeChecked()
        expect(screen.getByRole('checkbox', { name: /Sykmeldingen kan skyldes en yrkesskade/ })).toBeChecked()
        expect(screen.getByText(formatsmregDate('2020-03-05'))).toBeInTheDocument()
        expect(screen.getByRole('checkbox', { name: /nødvendig å skjerme pasienten/ })).not.toBeChecked()

        // 4 Mulighet for arbeid
        expect(screen.getByDisplayValue('4.1 Avventende sykmelding')).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-01-01'))).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-01-15'))).toBeInTheDocument()
        expect(screen.getByLabelText('Andre innspill til arbeidsgiver')).toHaveDisplayValue('Må avvente')

        expect(screen.getByDisplayValue('4.2 Gradert sykmelding')).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-01-16'))).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-01-30'))).toBeInTheDocument()
        expect(screen.getByLabelText('Oppgi grad')).toHaveDisplayValue('80')
        expect(screen.getByRole('checkbox', { name: /Pasienten kan være delvis i arbeid/ })).toBeChecked()

        expect(screen.getByDisplayValue('4.3 100% sykmelding')).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-02-01'))).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-02-15'))).toBeInTheDocument()
        expect(screen.getByRole('checkbox', { name: /Det er medisinske årsaker/ })).toBeChecked()
        expect(nasjonalOppgave.nasjonalSykmelding.perioder[2].aktivitetIkkeMulig?.medisinskArsak?.arsak).toHaveLength(1)
        nasjonalOppgave.nasjonalSykmelding.perioder[2].aktivitetIkkeMulig?.medisinskArsak?.arsak.forEach((arsak) => {
            expect(
                screen.getByRole('checkbox', { name: MedisinskArsakTypeValues[arsak as MedisinskArsakType] }),
            ).toBeChecked()
        })
        expect(screen.getByDisplayValue('Dette er beskrivelsen på den medisinske årsaken')).toBeInTheDocument()
        expect(
            nasjonalOppgave.nasjonalSykmelding.perioder[2].aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak,
        ).toHaveLength(1)
        nasjonalOppgave.nasjonalSykmelding.perioder[2].aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak.forEach(
            (arsak) => {
                expect(
                    screen.getByRole('checkbox', {
                        name: ArbeidsrelatertArsakTypeValues[arsak as ArbeidsrelatertArsakType],
                    }),
                ).toBeChecked()
            },
        )
        expect(screen.getByDisplayValue('Dette er beskrivelsen på den arbeidsrelaterte årsaken')).toBeInTheDocument()

        expect(screen.getByDisplayValue('4.4 Behandlingsdager')).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-02-16'))).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-02-28'))).toBeInTheDocument()
        expect(screen.getByLabelText('Oppgi antall dager i perioden')).toHaveDisplayValue('13')

        expect(screen.getByDisplayValue('4.5 Reisetilskudd')).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-03-01'))).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatsmregDateShorthand('2025-03-15'))).toBeInTheDocument()

        // 6 Utdypende opplysninger
        expect(screen.getByRole('checkbox', { name: /Sykmeldingen har utdypende opplysninger/ })).not.toBeChecked()

        // 8 Melding til NAV
        expect(screen.getByRole('checkbox', { name: /Ønskes bistand fra NAV nå?/ })).toBeChecked()
        expect(screen.getByLabelText('Begrunn nærmere')).toHaveDisplayValue('Dette er en beskrivelse av bistand')

        // 9 Melding til arbeidsgiveren
        expect(screen.getByLabelText('9.1 Andre innspill til arbeidsgiveren')).toHaveDisplayValue(
            'Melding til arbeidsgiver',
        )

        // 10 Tilbakedatering
        expect(screen.getByRole('checkbox', { name: /Er sykmeldingen tilbakedatert?/ })).toBeChecked()
        expect(screen.getByLabelText('Oppgi dato for dokumenterbar kontakt med pasienten')).toHaveDisplayValue(
            formatsmregDateShorthand('2025-01-10'),
        )
        expect(
            screen.getByRole('checkbox', { name: /Pasienten har ikke kunnet ivareta egne interesser/ }),
        ).toBeChecked()
        expect(screen.getByLabelText('Begrunn')).toHaveDisplayValue('Pasienten kunne ikke bevege seg')

        // 12 Behandler
        expect(screen.getByLabelText('12.1 Behandletdato')).toHaveDisplayValue(formatsmregDateShorthand('2025-01-14'))
    }, 15000)

    describe('NasjonalOppgaveStatus', () => {
        it('Should show status for nasjonalOppgave AVVIST', async () => {
            const nasjonalOppgaveStatus: NasjonalOppgaveStatusFragment = createNasjonalOppgaveStatus({
                oppgaveId: 'Avvist',
                status: NasjonalOppgaveStatusEnum.Avvist,
            })
            const mocks = createMock({
                request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: 'Avvist' } },
                result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgaveStatus } },
            })

            render(<NasjonalOppgaveView oppgaveId={nasjonalOppgaveStatus.oppgaveId} layout={undefined} />, {
                mocks: [mocks],
            })

            expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
            expect(await screen.findByRole('heading', { name: 'Oppgaven er avvist' })).toBeInTheDocument()

            expect(screen.queryByRole('botton', { name: 'Registrer sykmeldingen' })).not.toBeInTheDocument()
        })

        it('Should show status for nasjonalOppgave FERDIGSTILT', async () => {
            const nasjonalOppgaveStatus: NasjonalOppgaveStatusFragment = createNasjonalOppgaveStatus({
                oppgaveId: 'ferdigstilt',
                status: NasjonalOppgaveStatusEnum.Ferdigstilt,
            })
            const mocks = createMock({
                request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: 'ferdigstilt' } },
                result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgaveStatus } },
            })

            render(<NasjonalOppgaveView oppgaveId={nasjonalOppgaveStatus.oppgaveId} layout={undefined} />, {
                mocks: [mocks],
            })

            expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
            expect(await screen.findByRole('heading', { name: 'Oppgaven er allerede ferdigstilt' })).toBeInTheDocument()

            expect(screen.queryByRole('botton', { name: 'Registrer sykmeldingen' })).not.toBeInTheDocument()
        })

        it('Should show status for nasjonalOppgave IKKE_EN_SYKMELDING', async () => {
            const nasjonalOppgaveStatus: NasjonalOppgaveStatusFragment = createNasjonalOppgaveStatus({
                oppgaveId: 'ikkeensykmelding',
                status: NasjonalOppgaveStatusEnum.IkkeEnSykmelding,
            })
            const mocks = createMock({
                request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: 'ikkeensykmelding' } },
                result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgaveStatus } },
            })

            render(<NasjonalOppgaveView oppgaveId={nasjonalOppgaveStatus.oppgaveId} layout={undefined} />, {
                mocks: [mocks],
            })

            expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
            expect(
                await screen.findByRole('heading', {
                    name: 'Oppgaven har blitt sendt tilbake til Gosys fordi det ikke var en sykmelding',
                }),
            ).toBeInTheDocument()

            expect(screen.queryByRole('botton', { name: 'Registrer sykmeldingen' })).not.toBeInTheDocument()
        })

        it('Should show status for nasjonalOppgave FINNES_IKKE', async () => {
            const nasjonalOppgaveStatus: NasjonalOppgaveStatusFragment = createNasjonalOppgaveStatus({
                oppgaveId: 'FinnesIkke',
                status: NasjonalOppgaveStatusEnum.FinnesIkke,
            })
            const mocks = createMock({
                request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: 'FinnesIkke' } },
                result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgaveStatus } },
            })

            render(<NasjonalOppgaveView oppgaveId={nasjonalOppgaveStatus.oppgaveId} layout={undefined} />, {
                mocks: [mocks],
            })

            expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
            expect(await screen.findByRole('heading', { name: 'Vi klarte ikke å finne oppgaven' })).toBeInTheDocument()

            expect(screen.queryByRole('botton', { name: 'Registrer sykmeldingen' })).not.toBeInTheDocument()
        })
    })
})
