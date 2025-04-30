import { test, expect } from '@playwright/test'

import { clickAndWait, waitForGraphQL } from '../utils/request'

import {
    fillArbeidsgiverSection,
    fillDiagnoseSection,
    fillMulighetForArbeidSection,
    fillPasientOpplysningerSection,
} from './user-actions'

test('should be able to submit oppgave', async ({ page, browserName }) => {
    //TODO: temporarily skip because of a bug with msw and chrome having high processing duration on save
    test.skip(browserName === 'chromium', 'Skip on Chrome/Chromium')

    await page.goto('/nasjonal/000000000')

    await fillPasientOpplysningerSection(page)('12345678910')

    await fillArbeidsgiverSection(page)({
        pasientenHar: 'EN_ARBEIDSGIVER',
        arbeidsgiver: 'Politiet',
        yrke: 'Politibetjent',
        stillingsprosent: '25',
    })

    await fillDiagnoseSection(page)([
        { system: 'ICD10', search: 'L81', click: /L811/ },
        { system: 'ICPC2', search: 'H0', click: /H02/ },
    ])

    await fillMulighetForArbeidSection(page)([
        {
            periodeType: '4.1 Avventende sykmelding',
            fom: '010120',
            tom: '030120',
            innspill: 'Innspill til arbeidsgiver',
        },
        { periodeType: '4.2 Gradert sykmelding', fom: '010220', tom: '030220', grad: '80' },
        { periodeType: '4.3 100% sykmelding', fom: '010320', tom: '030320' },
        { periodeType: '4.4 Behandlingsdager', fom: '010420', tom: '030420', behandlingsdager: '1' },
        { periodeType: '4.5 Reisetilskudd', fom: '010520', tom: '030520' },
    ])

    // 6 Utdypende opplysninger
    await page.getByRole('checkbox', { name: /Sykmeldingen har utdypende opplysninger/ }).click()

    // 8 Melding til NAV
    await page.getByRole('checkbox', { name: /Ønskes bistand fra NAV nå?/ }).click()
    await page.getByRole('textbox', { name: 'Begrunn nærmere' }).fill('Melding til NAV')

    // 9 Melding til arbeidsgiver
    await page.getByRole('textbox', { name: '9.1 Andre innspill til arbeidsgiveren' }).fill('Melding til arbeidsgiver')

    // 10 Tilbakdedatering
    await page.getByRole('checkbox', { name: /Er sykmeldingen tilbakedatert?/ }).check()
    await page.getByLabel('Oppgi dato for dokumenterbar kontakt med pasienten').fill('151020')
    await page.getByRole('checkbox', { name: /Pasienten har ikke kunnet ivareta egne interesser/ }).check()
    await page.getByRole('textbox', { name: 'Begrunn', exact: true }).fill('Hadde omgangssyke')

    // 12 Behandler
    await page.getByLabel('12.1 Behandletdato').fill('010220')
    await page.getByRole('textbox', { name: /12.4 HPR-nummer/ }).fill('1234567')
    await page.getByRole('textbox', { name: '12.5 Telefon' }).fill('12345678')

    await page.getByText('Feltene stemmer overens med').click()

    const request = await clickAndWait(
        page.getByRole('button', { name: 'Registrer sykmeldingen' }).click(),
        waitForGraphQL(page, 'SaveOppgaveNasjonal'),
    )

    await expect(page.getByText(/Oppgaven ble registrert/)).toBeVisible()

    expect(request.postDataJSON().variables).toEqual({
        oppgaveId: '000000000',
        sykmeldingValues: {
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
                    kode: 'L811',
                    tekst: 'Kloasme',
                },
                biDiagnoser: [
                    {
                        system: '2.16.578.1.12.4.1.1.7170',
                        kode: 'H02',
                        tekst: 'Hørsel symptomer/plager',
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
                tlf: '12345678',
                hpr: '1234567',
            },
            kontaktMedPasient: {
                kontaktDato: '2020-10-15',
                begrunnelseIkkeKontakt: 'Hadde omgangssyke',
            },
            meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Melding til NAV' },
            meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
            harUtdypendeOpplysninger: true,
        },
        sykmeldingStatus: 'UNDER_ARBEID',
        navEnhet: '0312',
    })
})
