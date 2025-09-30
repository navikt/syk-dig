import {
    AnnenFraversArsakGrunn,
    ArbeidsrelatertArsakType,
    HarArbeidsgiver,
    MedisinskArsakType,
    NasjonalOppgaveFragment,
    NasjonalOppgaveStatusEnum,
    NasjonalOppgaveStatusFragment,
    NasjonalSykmeldingValues,
    Navn,
    NavnFragment,
    Sykmelder,
    SykmelderFragment,
} from '../../graphql/queries/graphql.generated'

export function createNasjonalOppgave(overrides?: Partial<NasjonalOppgaveFragment>): NasjonalOppgaveFragment {
    return {
        __typename: 'NasjonalOppgave',
        oppgaveId: '123456789',
        nasjonalSykmelding: {
            __typename: 'NasjonalSykmelding',
            sykmeldingId: '3edded4c-2654-447d-a210-94ca8eb31801',
            journalpostId: '467035825',
            fnr: '20026900817',
            datoOpprettet: '2020-06-16T08:14:24',
            syketilfelleStartDato: '2020-06-16',
            arbeidsgiver: {
                __typename: 'Arbeidsgiver',
                harArbeidsgiver: HarArbeidsgiver.EnArbeidsgiver,
                navn: 'Langtvekkistan politidistrikt',
                yrkesbetegnelse: 'Politi',
                stillingsprosent: 100,
            },
            medisinskVurdering: {
                __typename: 'MedisinskVurdering',
                hovedDiagnose: {
                    __typename: 'DiagnoseSchema',
                    kode: 'A01',
                    tekst: 'Main diagnosis text',
                    system: 'ICD-10',
                },
                biDiagnoser: [
                    {
                        __typename: 'DiagnoseSchema',
                        kode: 'B02',
                        tekst: 'Secondary diagnosis text',
                        system: 'ICD-10',
                    },
                ],
                svangerskap: true,
                yrkesskade: true,
                yrkesskadeDato: '2020-03-05',
                annenFraversArsak: {
                    __typename: 'AnnenFraversArsak',
                    grunn: [
                        AnnenFraversArsakGrunn.BehandlingForhindrerArbeid,
                        AnnenFraversArsakGrunn.NodvendigKontrollundenrsokelse,
                    ],
                    beskrivelse: 'Dette er årsaken',
                },
            },
            skjermesForPasient: false,
            meldingTilNAV: {
                __typename: 'MeldingTilNAV',
                bistandUmiddelbart: true,
                beskrivBistand: 'Dette er en beskrivelse av bistand',
            },
            meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
            kontaktMedPasient: {
                __typename: 'KontaktMedPasient',
                kontaktDato: '2025-01-10',
                begrunnelseIkkeKontakt: 'Pasienten kunne ikke bevege seg',
            },
            behandletTidspunkt: '2025-01-14',
            behandler: {
                __typename: 'Behandler',
                fornavn: 'Nina Unni',
                mellomnavn: null,
                etternavn: 'Borge',
                fnr: '01117302624',
                hpr: '007125186',
                tlf: '+4712345678',
            },
            perioder: [
                {
                    __typename: 'Periode',
                    fom: '2025-01-01',
                    tom: '2025-01-15',
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: 'Må avvente',
                    behandlingsdager: null,
                    gradert: null,
                    reisetilskudd: false,
                },
                {
                    __typename: 'Periode',
                    fom: '2025-01-16',
                    tom: '2025-01-30',
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    gradert: {
                        __typename: 'Gradert',
                        grad: 80,
                        reisetilskudd: true,
                    },
                    reisetilskudd: false,
                },
                {
                    __typename: 'Periode',

                    fom: '2025-02-01',
                    tom: '2025-02-15',
                    aktivitetIkkeMulig: {
                        __typename: 'AktivitetIkkeMulig',
                        medisinskArsak: {
                            __typename: 'MedisinskArsak',
                            arsak: [MedisinskArsakType.AktivitetForhindrerBedring],
                            beskrivelse: 'Dette er beskrivelsen på den medisinske årsaken',
                        },
                        arbeidsrelatertArsak: {
                            __typename: 'ArbeidsrelatertArsak',
                            arsak: [ArbeidsrelatertArsakType.ManglendeTilrettelegging],
                            beskrivelse: 'Dette er beskrivelsen på den arbeidsrelaterte årsaken',
                        },
                    },
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    gradert: null,
                    reisetilskudd: false,
                },
                {
                    __typename: 'Periode',
                    fom: '2025-02-16',
                    tom: '2025-02-28',
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: 13,
                    gradert: null,
                    reisetilskudd: false,
                },
                {
                    __typename: 'Periode',
                    fom: '2025-03-01',
                    tom: '2025-03-15',
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    gradert: null,
                    reisetilskudd: true,
                },
            ],
            harUtdypendeOpplysninger: false,
        },
        documents: [
            {
                __typename: 'Document',
                dokumentInfoId: '695980624',
                tittel: 'Papirsykmelding',
            },
        ],
        ...overrides,
    }
}

export function emptyNasjonalOppgave(overrides?: Partial<NasjonalOppgaveFragment>): NasjonalOppgaveFragment {
    return {
        __typename: 'NasjonalOppgave',
        oppgaveId: '123',
        nasjonalSykmelding: {
            __typename: 'NasjonalSykmelding',
            sykmeldingId: 'a62a4ab1-aaf2-4394-9b16-0507583bcab3',
            journalpostId: '467035825',
            fnr: null,
            datoOpprettet: null,
            syketilfelleStartDato: null,
            arbeidsgiver: null,
            medisinskVurdering: null,
            skjermesForPasient: null,
            meldingTilNAV: null,
            meldingTilArbeidsgiver: null,
            kontaktMedPasient: null,
            behandletTidspunkt: null,
            behandler: null,
            perioder: [],
            harUtdypendeOpplysninger: false,
        },
        documents: [
            {
                __typename: 'Document',
                dokumentInfoId: '099b3362-100d-4743-9d93-6db46c6e9588',
                tittel: 'Papirsykmelding',
            },
        ],
        ...overrides,
    }
}

export function createSykmeldingValues(overrides?: Partial<NasjonalSykmeldingValues>): NasjonalSykmeldingValues {
    return {
        pasientFnr: '20026900817',
        sykmelderFnr: '',
        perioder: [
            {
                fom: '2025-01-01',
                tom: '2025-01-15',
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: 'Må avvente',
                gradert: null,
            },
            {
                fom: '2025-01-16',
                tom: '2025-01-30',
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: { grad: 80, reisetilskudd: true },
            },
            {
                fom: '2025-02-01',
                tom: '2025-02-15',
                reisetilskudd: false,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        arsak: [MedisinskArsakType.AktivitetForhindrerBedring],
                        beskrivelse: 'Dette er beskrivelsen på den medisinske årsaken',
                    },
                    arbeidsrelatertArsak: {
                        arsak: [ArbeidsrelatertArsakType.ManglendeTilrettelegging],
                        beskrivelse: 'Dette er beskrivelsen på den arbeidsrelaterte årsaken',
                    },
                },
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            },
            {
                fom: '2025-02-16',
                tom: '2025-02-28',
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: 13,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            },
            {
                fom: '2025-03-01',
                tom: '2025-03-15',
                reisetilskudd: true,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            },
        ],
        medisinskVurdering: {
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2020-03-05',
            hovedDiagnose: { system: '2.16.578.1.12.4.1.1.7110', kode: 'A01', tekst: 'Main diagnosis text' },
            biDiagnoser: [{ system: '2.16.578.1.12.4.1.1.7110', kode: 'B02', tekst: 'Secondary diagnosis text' }],
            annenFraversArsak: {
                grunn: [
                    AnnenFraversArsakGrunn.BehandlingForhindrerArbeid,
                    AnnenFraversArsakGrunn.NodvendigKontrollundenrsokelse,
                ],
                beskrivelse: 'Dette er årsaken',
            },
        },
        arbeidsgiver: {
            harArbeidsgiver: HarArbeidsgiver.EnArbeidsgiver,
            navn: 'Langtvekkistan politidistrikt',
            yrkesbetegnelse: 'Politi',
            stillingsprosent: 100,
        },
        behandletDato: '2025-01-14',
        skjermesForPasient: false,
        behandler: { hpr: '007125186', tlf: '+4712345678' },
        kontaktMedPasient: { kontaktDato: '2025-01-10', begrunnelseIkkeKontakt: 'Pasienten kunne ikke bevege seg' },
        meldingTilNAV: { bistandUmiddelbart: true, beskrivBistand: 'Dette er en beskrivelse av bistand' },
        meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
        harUtdypendeOpplysninger: false,
        ...overrides,
    }
}

export function createNasjonalOppgaveStatus(
    overrides?: Partial<NasjonalOppgaveStatusFragment>,
): NasjonalOppgaveStatusFragment {
    return {
        __typename: 'NasjonalOppgaveStatus',
        oppgaveId: '1234',
        status: NasjonalOppgaveStatusEnum.Ferdigstilt,
        ...overrides,
    }
}

export function createPasientNavn(overrides?: Partial<NavnFragment>): Navn {
    return {
        __typename: 'Navn',
        fornavn: 'Per',
        mellomnavn: 'Anders',
        etternavn: 'Persson',
        ...overrides,
    }
}

export function createSykmelder(overrides?: Partial<SykmelderFragment>): Sykmelder {
    return {
        __typename: 'Sykmelder',
        hprNummer: '007125186',
        fnr: '12345678910',
        aktorId: '',
        fornavn: 'Nobel',
        mellomnavn: null,
        etternavn: 'Busk',
        godkjenninger: [
            {
                __typename: 'Godkjenning',
                helsepersonellkategori: {
                    __typename: 'Kode',
                    aktiv: true,
                    oid: 9060,
                    verdi: 'LE',
                },
                autorisasjon: {
                    __typename: 'Kode',
                    aktiv: true,
                    oid: 7704,
                    verdi: '1',
                },
            },
            {
                __typename: 'Godkjenning',
                helsepersonellkategori: {
                    __typename: 'Kode',
                    aktiv: true,
                    oid: 9060,
                    verdi: 'KI',
                },
                autorisasjon: {
                    __typename: 'Kode',
                    aktiv: false,
                    oid: 7704,
                    verdi: '2',
                },
            },
            {
                __typename: 'Godkjenning',
                helsepersonellkategori: {
                    __typename: 'Kode',
                    aktiv: true,
                    oid: 9060,
                    verdi: 'FA1',
                },
                autorisasjon: {
                    __typename: 'Kode',
                    aktiv: false,
                    oid: 7704,
                    verdi: '4',
                },
            },
        ],
        ...overrides,
    }
}
