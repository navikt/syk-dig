import { describe, it, expect } from 'vitest'

import { toDate } from '../../../utils/dateUtils'
import { Periode } from '../schema/sykmelding/Periode'
import { NasjonalFormValues } from '../form/NasjonalSykmeldingFormTypes'
import { RegistrertSykmelding } from '../schema/sykmelding/RegistrertSykmelding'
import emptyOppgave from '../__tests__/testData/emptyOppgave.json'
import { OppgaveSchema } from '../schema/oppgave/Oppgave'

import { mapFormPeriodToRegistrertPeriod, mapFormValueToSmregRegistrertSykmelding } from './smreg-mapping'

/**
 * These tests are from the old smreg registrertSykmeldingUtils.test.ts file.
 *
 * Adapted to the new mapping functions.
 */
describe('smreg-mapping', () => {
    describe('Perioder', () => {
        describe('Avventende', () => {
            it('Returns avventende sykmelding', () => {
                const builtAvventendeSykmelding = mapFormPeriodToRegistrertPeriod({
                    type: 'avventende',
                    avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                })

                const expected = {
                    fom: '2020-10-01',
                    tom: '2020-10-02',
                    reisetilskudd: false,
                    avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                    gradert: null,
                    behandlingsdager: null,
                    aktivitetIkkeMulig: null,
                }
                expect(builtAvventendeSykmelding).toEqual(expected)
            })
        })

        describe('Gradert', () => {
            it('Returns gradert sykmelding', () => {
                const builtGradertSykmelding = mapFormPeriodToRegistrertPeriod({
                    type: 'gradert',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    grad: 80,
                    reisetilskudd: true,
                })

                const expected: Periode = {
                    fom: '2020-10-01',
                    tom: '2020-10-02',
                    reisetilskudd: false,
                    gradert: {
                        reisetilskudd: true,
                        grad: 80,
                    },
                    aktivitetIkkeMulig: null,
                    behandlingsdager: null,
                    avventendeInnspillTilArbeidsgiver: null,
                }
                expect(builtGradertSykmelding).toEqual(expected)
            })
        })

        describe('Aktivitet ikke mulig', () => {
            it('Return aktivitetIkkeMulig sykmelding', () => {
                const builtAktivitetIkkeMuligSykmelding = mapFormPeriodToRegistrertPeriod({
                    type: 'aktivitetIkkeMulig',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    medisinskArsak: true,
                    medisinskArsakType: ['AKTIVITET_FORVERRER_TILSTAND'],
                    medisinskArsakBeskrivelse: 'Kan ikke være i aktivitet pga medisin',
                    arbeidsrelatertArsak: true,
                    arbeidsrelatertArsakType: ['MANGLENDE_TILRETTELEGGING'],
                    arbeidsrelatertArsakBeskrivelse: 'Kan ikke være i aktivitet pga arbeid',
                })
                const expected: Periode = {
                    fom: '2020-10-01',
                    tom: '2020-10-02',
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        medisinskArsak: {
                            arsak: ['AKTIVITET_FORVERRER_TILSTAND'],
                            beskrivelse: 'Kan ikke være i aktivitet pga medisin',
                        },
                        arbeidsrelatertArsak: {
                            arsak: ['MANGLENDE_TILRETTELEGGING'],
                            beskrivelse: 'Kan ikke være i aktivitet pga arbeid',
                        },
                    },
                    behandlingsdager: null,
                    gradert: null,
                    avventendeInnspillTilArbeidsgiver: null,
                }

                expect(builtAktivitetIkkeMuligSykmelding).toEqual(expected)
            })

            it('Return aktivitetIkkeMulig sykmelding without other stuff', () => {
                const builtAktivitetIkkeMuligSykmelding = mapFormPeriodToRegistrertPeriod({
                    type: 'aktivitetIkkeMulig',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    medisinskArsak: false,
                    medisinskArsakType: [],
                    medisinskArsakBeskrivelse: null,
                    arbeidsrelatertArsak: false,
                    arbeidsrelatertArsakType: [],
                    arbeidsrelatertArsakBeskrivelse: null,
                })
                const expected: Periode = {
                    fom: '2020-10-01',
                    tom: '2020-10-02',
                    reisetilskudd: false,
                    aktivitetIkkeMulig: {
                        medisinskArsak: null,
                        arbeidsrelatertArsak: null,
                    },
                    behandlingsdager: null,
                    gradert: null,
                    avventendeInnspillTilArbeidsgiver: null,
                }

                expect(builtAktivitetIkkeMuligSykmelding).toEqual(expected)
            })
        })

        describe('Behandlingsdager', () => {
            it('Returns behandlingsdager sykmelding', () => {
                const builtBehandlingsdagerSykmelding = mapFormPeriodToRegistrertPeriod({
                    type: 'behandlingsdager',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    antall: 12,
                })

                const expected: Periode = {
                    fom: '2020-10-01',
                    tom: '2020-10-02',
                    reisetilskudd: false,
                    behandlingsdager: 12,
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    gradert: null,
                }

                expect(builtBehandlingsdagerSykmelding).toEqual(expected)
            })
        })

        describe('Reisetilskudd', () => {
            it('Returns reisetilskudd sykmelding', () => {
                const builtReisetilskuddSykmelding = mapFormPeriodToRegistrertPeriod({
                    type: 'reisetilskudd',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                })

                const expected: Periode = {
                    fom: '2020-10-01',
                    tom: '2020-10-02',
                    reisetilskudd: true,
                    behandlingsdager: null,
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    gradert: null,
                }

                expect(builtReisetilskuddSykmelding).toEqual(expected)
            })
        })

        it('Returns array containing all periods', () => {
            const formPeriods: NasjonalFormValues['mulighetForArbeid'] = [
                {
                    type: 'avventende',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    avventendeInnspillTilArbeidsgiver: 'Dette er et innspill til arbeidsgiver',
                },
                {
                    type: 'gradert',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    grad: null,
                    reisetilskudd: true,
                },
                {
                    type: 'aktivitetIkkeMulig',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    medisinskArsak: false,
                    medisinskArsakType: [],
                    medisinskArsakBeskrivelse: null,
                    arbeidsrelatertArsak: false,
                    arbeidsrelatertArsakType: [],
                    arbeidsrelatertArsakBeskrivelse: null,
                },
                {
                    type: 'behandlingsdager',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                    antall: 12,
                },
                {
                    type: 'reisetilskudd',
                    fom: toDate('2020-10-01'),
                    tom: toDate('2020-10-02'),
                },
            ]

            const builtPerioder = formPeriods.map(mapFormPeriodToRegistrertPeriod)
            expect(builtPerioder).toHaveLength(5)
            expect(builtPerioder.some((periode) => periode.avventendeInnspillTilArbeidsgiver)).toBeTruthy()
            expect(builtPerioder.some((periode) => periode.gradert)).toBeTruthy()
            expect(builtPerioder.some((periode) => periode.aktivitetIkkeMulig)).toBeTruthy()
            expect(builtPerioder.some((periode) => periode.behandlingsdager)).toBeTruthy()
            expect(builtPerioder.some((periode) => periode.reisetilskudd)).toBeTruthy()
        })
    })

    describe('buildRegistrertSykmelding', () => {
        it('Builds complete registrert sykmelding object', () => {
            const schema: NasjonalFormValues = {
                pasientopplysninger: {
                    fnr: '12345678910',
                },
                arbeidsgiver: {
                    harArbeidsgiver: 'EN_ARBEIDSGIVER',
                    arbeidsgiverNavn: 'Olav Normann',
                    yrkesbetegnelse: 'Brannmann',
                    stillingsprosent: 100,
                },
                medisinskVurdering: {
                    hoveddiagnose: {
                        system: 'ICD10',
                        code: 'A001',
                        text: 'Diagnosetekst',
                    },
                    bidiagnoser: [
                        {
                            system: 'ICPC2',
                            code: 'A002',
                            text: 'Diagnosetekst2',
                        },
                        {
                            system: 'ICD10',
                            code: 'A003',
                            text: 'Diagnosetekst3',
                        },
                    ],
                    yrkesskadeDato: null,
                    yrkesskade: true,
                    svangerskap: true,
                    annenFraversArsak: true,
                    annenFraversArsakGrunn: ['ABORT', 'ARBEIDSRETTET_TILTAK'],
                    annenFraversArsakBeskrivelse: 'Fraværsbeskrivelse',
                },
                skjermesForPasient: true,
                mulighetForArbeid: [
                    {
                        type: 'avventende',
                        fom: toDate('2021-02-03'),
                        tom: toDate('2021-02-04'),
                        avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                    },
                    {
                        type: 'gradert',
                        reisetilskudd: true,
                        fom: toDate('2021-03-03'),
                        tom: toDate('2021-03-04'),
                        grad: 80,
                    },
                    {
                        type: 'aktivitetIkkeMulig',
                        fom: toDate('2021-04-03'),
                        tom: toDate('2021-04-04'),
                        medisinskArsak: true,
                        medisinskArsakType: ['AKTIVITET_FORHINDRER_BEDRING', 'ANNET'],
                        medisinskArsakBeskrivelse: 'Medisinsk beskrivelse',
                        arbeidsrelatertArsak: true,
                        arbeidsrelatertArsakType: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                        arbeidsrelatertArsakBeskrivelse: 'Arbeidsrelatert beskrivelse',
                    },
                    {
                        type: 'behandlingsdager',
                        fom: toDate('2021-05-03'),
                        tom: toDate('2021-05-04'),
                        antall: 20,
                    },
                    {
                        type: 'reisetilskudd',
                        fom: toDate('2021-06-03'),
                        tom: toDate('2021-06-04'),
                    },
                ],
                harUtdypendeOpplysninger: true,
                bistandFraNAV: {
                    bistandFraNAV: true,
                    beskrivelse: 'Melding til NAV',
                },
                andreInnspillTilArbeidsgiver: 'Melding til arbeidsgiver',
                tilbakedatering: {
                    tilbakedatert: true,
                    tilbakedatertDato: toDate('2020-02-01'),
                    kunneIkkeIvaretaEgneInteresser: true,
                    kunneIkkeIvaretaEgneInteresserBegrunnelse: 'Pasienten hadde omgangssjuke',
                },
                behandler: {
                    behandletDato: toDate('2021-02-02'),
                    hpr: '12345',
                    tlf: '12345678',
                },
            }

            const expected: RegistrertSykmelding = {
                pasientFnr: '12345678910',
                sykmelderFnr: '',
                perioder: [
                    {
                        fom: '2021-02-03',
                        tom: '2021-02-04',
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
                        behandlingsdager: null,
                        gradert: null,
                        reisetilskudd: false,
                    },
                    {
                        fom: '2021-03-03',
                        tom: '2021-03-04',
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: {
                            reisetilskudd: true,
                            grad: 80,
                        },
                        reisetilskudd: false,
                    },
                    {
                        fom: '2021-04-03',
                        tom: '2021-04-04',
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                beskrivelse: 'Medisinsk beskrivelse',
                                arsak: ['AKTIVITET_FORHINDRER_BEDRING', 'ANNET'],
                            },
                            arbeidsrelatertArsak: {
                                beskrivelse: 'Arbeidsrelatert beskrivelse',
                                arsak: ['MANGLENDE_TILRETTELEGGING', 'ANNET'],
                            },
                        },
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: null,
                        reisetilskudd: false,
                    },
                    {
                        fom: '2021-05-03',
                        tom: '2021-05-04',
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: 20,
                        gradert: null,
                        reisetilskudd: false,
                    },
                    {
                        fom: '2021-06-03',
                        tom: '2021-06-04',
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: null,
                        reisetilskudd: true,
                    },
                ],
                medisinskVurdering: {
                    hovedDiagnose: {
                        system: '2.16.578.1.12.4.1.1.7110',
                        kode: 'A001',
                        tekst: 'Diagnosetekst',
                    },
                    biDiagnoser: [
                        {
                            system: '2.16.578.1.12.4.1.1.7170',
                            kode: 'A002',
                            tekst: 'Diagnosetekst2',
                        },
                        {
                            system: '2.16.578.1.12.4.1.1.7110',
                            kode: 'A003',
                            tekst: 'Diagnosetekst3',
                        },
                    ],
                    svangerskap: true,
                    yrkesskade: true,
                    yrkesskadeDato: null,
                    annenFraversArsak: {
                        beskrivelse: 'Fraværsbeskrivelse',
                        grunn: ['ABORT', 'ARBEIDSRETTET_TILTAK'],
                    },
                },
                arbeidsgiver: {
                    harArbeidsgiver: 'EN_ARBEIDSGIVER',
                    navn: 'Olav Normann',
                    yrkesbetegnelse: 'Brannmann',
                    stillingsprosent: 100,
                },
                behandletDato: '2021-02-02',
                skjermesForPasient: true,
                behandler: {
                    fornavn: '',
                    mellomnavn: null,
                    etternavn: '',
                    aktoerId: '',
                    fnr: '',
                    hpr: '12345',
                    her: null,
                    adresse: {
                        gate: null,
                        postnummer: null,
                        kommune: null,
                        postboks: null,
                        land: null,
                    },
                    tlf: '12345678',
                },
                kontaktMedPasient: {
                    kontaktDato: '2020-02-01',
                    begrunnelseIkkeKontakt: 'Pasienten hadde omgangssjuke',
                },
                syketilfelleStartDato: null,
                meldingTilNAV: {
                    bistandUmiddelbart: true,
                    beskrivBistand: 'Melding til NAV',
                },
                meldingTilArbeidsgiver: 'Melding til arbeidsgiver',
                harUtdypendeOpplysninger: true,
                navnFastlege: null,
            }

            expect(mapFormValueToSmregRegistrertSykmelding(schema, OppgaveSchema.parse(emptyOppgave))).toEqual(expected)
        })
    })
})
