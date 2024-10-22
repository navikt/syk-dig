import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { render, screen, within } from '../../../utils/testUtils'
import { server } from '../../../mocks/server'
import { apiUrl } from '../smreg/api'
import { RegistrertSykmelding } from '../schema/sykmelding/RegistrertSykmelding'

import emptyOppgave from './testData/emptyOppgave.json'
import {
    mockBehandlerinfo,
    mockPasientinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'

describe('Submit oppgave', async () => {
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    it('Should be able to fill out and submit form', async () => {
        let invokedBody: RegistrertSykmelding | null = null
        server.use(
            http.get(apiUrl(`/proxy/oppgave/${emptyOppgave.oppgaveid}`), () => HttpResponse.json(emptyOppgave)),
            http.post(apiUrl(`/proxy/oppgave/${emptyOppgave.oppgaveid}/send`), async ({ request }) => {
                invokedBody = (await request.json()) as RegistrertSykmelding

                return new HttpResponse(undefined, { status: 204 })
            }),
        )

        render(
            <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                oppgaveId={`${emptyOppgave.oppgaveid}`}
            />,
            {
                useRestLink: true,
            },
        )

        await userEvent.type(await screen.findByLabelText('1.2 Fødselsnummer (11 siffer)'), '12345678910')

        const arbeidsgiverSection = within(screen.getByRole('region', { name: '2 Arbeidsgiver' }))
        await userEvent.selectOptions(arbeidsgiverSection.getByLabelText('2.1 Pasienten har'), 'Én arbeidsgiver')
        await userEvent.type(arbeidsgiverSection.getByLabelText('2.2 Arbeidsgiver for denne sykmeldingen'), 'Politiet')
        await userEvent.type(
            arbeidsgiverSection.getByLabelText('2.3 Yrke/stilling for dette arbeidsforholdet'),
            'Politibetjent',
        )
        await userEvent.type(arbeidsgiverSection.getByLabelText('2.4 Stillingsprosent'), '25')

        const diagnoseSection = within(screen.getByRole('region', { name: '3 Diagnose' }))

        await userEvent.type(diagnoseSection.getByLabelText('3.1.2 Kode'), 'A000{arrowDown}{enter}')
        await userEvent.click(diagnoseSection.getByRole('button', { name: 'Legg til bidiagnose' }))
        await userEvent.type(await diagnoseSection.findByLabelText('3.2.2 Kode'), 'A000{arrowDown}{enter}')
        await userEvent.click(diagnoseSection.getByRole('checkbox', { name: /Annen lovfestet fraværsgrunn/ }))
        await userEvent.click(
            diagnoseSection.getByRole('checkbox', {
                name: /Når vedkommende er innlagt i en godkjent helseinstitusjon/,
            }),
        )
        await userEvent.type(
            diagnoseSection.getByLabelText('3.3.2 Beskriv fravær (valgfritt)'),
            'Dette er en beskrivelse av fraværet',
        )
        await userEvent.click(diagnoseSection.getByRole('checkbox', { name: /Sykdommen er svangerskapsrelatert/ }))
        await userEvent.click(diagnoseSection.getByRole('checkbox', { name: /Sykmeldingen kan skyldes en yrkesskade/ }))
        await userEvent.type(diagnoseSection.getByLabelText('3.6 Eventuell skadedato'), '010120{enter}')
        await userEvent.click(diagnoseSection.getByRole('checkbox', { name: /nødvendig å skjerme pasienten/ }))

        const arbeidsSection = within(screen.getByRole('region', { name: '4 Mulighet for arbeid' }))
        await userEvent.selectOptions(arbeidsSection.getByLabelText('Periodetype'), '4.1 Avventende sykmelding')
        await userEvent.type(arbeidsSection.getByLabelText('F.o.m'), '010120')
        await userEvent.type(arbeidsSection.getByLabelText('T.o.m'), '030120')
        await userEvent.type(
            arbeidsSection.getByLabelText('Andre innspill til arbeidsgiver'),
            'Innspill til arbeidsgiver',
        )

        await userEvent.click(arbeidsSection.getByRole('button', { name: 'Legg til periode' }))

        const gradertPeriodeSection = within(screen.getByRole('region', { name: 'Periode 2' }))
        await userEvent.selectOptions(gradertPeriodeSection.getByLabelText('Periodetype'), '4.2 Gradert sykmelding')
        await userEvent.type(gradertPeriodeSection.getByLabelText('Oppgi grad'), '80{enter}')
        await userEvent.type(gradertPeriodeSection.getByLabelText('F.o.m'), '010220')
        await userEvent.type(gradertPeriodeSection.getByLabelText('T.o.m'), '030220')
        await userEvent.click(
            gradertPeriodeSection.getByRole('checkbox', { name: /Pasienten kan være delvis i arbeid/ }),
        )

        await userEvent.click(arbeidsSection.getByRole('button', { name: 'Legg til periode' }))

        const vanligPeriodeSection = within(screen.getByRole('region', { name: 'Periode 3' }))
        await userEvent.selectOptions(vanligPeriodeSection.getByLabelText('Periodetype'), '4.3 100% sykmelding')
        await userEvent.type(vanligPeriodeSection.getByLabelText('F.o.m'), '010320')
        await userEvent.type(vanligPeriodeSection.getByLabelText('T.o.m'), '030320')
        await userEvent.click(vanligPeriodeSection.getByRole('checkbox', { name: /Det er medisinske årsaker/ }))
        await userEvent.click(
            vanligPeriodeSection.getByRole('checkbox', {
                name: /Helsetilstanden hindrer pasienten i å være i aktivitet/,
            }),
        )
        await userEvent.type(vanligPeriodeSection.getByLabelText('Beskrivelse'), 'Medisinsk beskrivelse')
        await userEvent.click(
            vanligPeriodeSection.getByRole('checkbox', {
                name: /Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet/,
            }),
        )
        await userEvent.click(
            vanligPeriodeSection.getByRole('checkbox', { name: /Manglende tilrettelegging på arbeidsplassen/ }),
        )
        await userEvent.type(vanligPeriodeSection.getAllByLabelText('Beskrivelse')[1], 'Arbeidsrelatert beskrivelse')

        await userEvent.click(arbeidsSection.getByRole('button', { name: 'Legg til periode' }))

        const behandlingsdagerSection = within(screen.getByRole('region', { name: 'Periode 4' }))
        await userEvent.selectOptions(behandlingsdagerSection.getByLabelText('Periodetype'), '4.4 Behandlingsdager')
        await userEvent.type(behandlingsdagerSection.getByLabelText('F.o.m'), '010420')
        await userEvent.type(behandlingsdagerSection.getByLabelText('T.o.m'), '030420')
        await userEvent.type(behandlingsdagerSection.getByLabelText('Oppgi antall dager i perioden'), '1{enter}')

        await userEvent.click(arbeidsSection.getByRole('button', { name: 'Legg til periode' }))

        const reisetilskuddSection = within(screen.getByRole('region', { name: 'Periode 5' }))
        await userEvent.selectOptions(reisetilskuddSection.getByLabelText('Periodetype'), '4.5 Reisetilskudd')
        await userEvent.type(reisetilskuddSection.getByLabelText('F.o.m'), '010520')
        await userEvent.type(reisetilskuddSection.getByLabelText('T.o.m'), '030520')

        // 6 Utdypende opplysninger
        await userEvent.click(screen.getByRole('checkbox', { name: /Sykmeldingen har utdypende opplysninger/ }))

        // 8 Melding til NAV
        await userEvent.click(screen.getByRole('checkbox', { name: /Ønskes bistand fra NAV nå?/ }))
        await userEvent.type(screen.getByRole('textbox', { name: 'Begrunn nærmere' }), 'Melding til NAV')

        // 9 Melding til arbeidsgiver
        await userEvent.type(
            screen.getByRole('textbox', { name: '9.1 Andre innspill til arbeidsgiveren' }),
            'Melding til arbeidsgiver',
        )

        // 10 Tilbakdedatering
        await userEvent.click(screen.getByRole('checkbox', { name: /Er sykmeldingen tilbakedatert?/ }))
        await userEvent.type(
            screen.getByLabelText('Oppgi dato for dokumenterbar kontakt med pasienten'),
            '151020{enter}',
        )
        await userEvent.click(
            screen.getByRole('checkbox', { name: /Pasienten har ikke kunnet ivareta egne interesser/ }),
        )
        await userEvent.type(screen.getByLabelText('Begrunn'), 'Hadde omgangssyke')

        // 12 Behandler
        await userEvent.type(screen.getByLabelText('12.1 Behandletdato'), '010220{enter}')
        await userEvent.type(screen.getByRole('textbox', { name: /12.4 HPR-nummer/ }), '1234567')
        await userEvent.type(screen.getByRole('textbox', { name: '12.5 Telefon' }), '12345678')

        // ----- REGISTRATION -----
        await userEvent.click(screen.getByRole('checkbox', { name: /Feltene stemmer overens/ }))
        await userEvent.click(screen.getByRole('button', { name: 'Registrer sykmeldingen' }))

        // Shouldn't have any validation errors
        expect(
            screen.queryByRole('region', {
                name: /du må fylle ut disse feltene før du kan registrere sykmeldingen/i,
            }),
        ).not.toBeInTheDocument()

        expect(invokedBody).not.toBeNull()
        const body = {
            ...invokedBody!,
            perioder: invokedBody!.perioder.sort((a: { fom: string }, b: { fom: string }) =>
                a.fom.localeCompare(b.fom),
            ),
        }

        expect(body).toEqual({
            pasientFnr: '12345678910',
            sykmelderFnr: '',
            perioder: [
                {
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                    behandlingsdager: null,
                    fom: '2020-01-01',
                    gradert: null,
                    reisetilskudd: false,
                    tom: '2020-01-03',
                },
                {
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    fom: '2020-02-01',
                    gradert: { reisetilskudd: true, grad: 80 },
                    reisetilskudd: false,
                    tom: '2020-02-03',
                },
                {
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
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    fom: '2020-03-01',
                    gradert: null,
                    reisetilskudd: false,
                    tom: '2020-03-03',
                },
                {
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: 1,
                    fom: '2020-04-01',
                    gradert: null,
                    reisetilskudd: false,
                    tom: '2020-04-03',
                },
                {
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    fom: '2020-05-01',
                    gradert: null,
                    reisetilskudd: true,
                    tom: '2020-05-03',
                },
            ].sort((a: { fom: string }, b: { fom: string }) => a.fom.localeCompare(b.fom)),
            medisinskVurdering: {
                svangerskap: true,
                yrkesskade: true,
                yrkesskadeDato: '2020-01-01',
                hovedDiagnose: {
                    system: '2.16.578.1.12.4.1.1.7110',
                    kode: 'A000',
                    tekst: 'Kolera som skyldes Vibrio cholerae 01, biovar cholerae',
                },
                biDiagnoser: [
                    {
                        system: '2.16.578.1.12.4.1.1.7110',
                        kode: 'A000',
                        tekst: 'Kolera som skyldes Vibrio cholerae 01, biovar cholerae',
                    },
                ],
                annenFraversArsak: {
                    grunn: ['GODKJENT_HELSEINSTITUSJON'],
                    beskrivelse: 'Dette er en beskrivelse av fraværet',
                },
            },
            arbeidsgiver: {
                harArbeidsgiver: 'EN_ARBEIDSGIVER',
                navn: 'Politiet',
                yrkesbetegnelse: 'Politibetjent',
                stillingsprosent: 25,
            },
            behandletDato: '2020-02-01',
            skjermesForPasient: true,
            behandler: {
                fnr: '',
                fornavn: '',
                mellomnavn: null,
                etternavn: '',
                hpr: '1234567',
                her: null,
                aktoerId: '',
                adresse: {
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: '12345678',
            },
            harUtdypendeOpplysninger: true,
            meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
            meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Melding til NAV' },
            kontaktMedPasient: {
                kontaktDato: '2020-10-15',
                begrunnelseIkkeKontakt: 'Hadde omgangssyke',
            },
            syketilfelleStartDato: null,
            navnFastlege: null,
        })
    }, 45_000)
})
