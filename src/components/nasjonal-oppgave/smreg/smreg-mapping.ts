import { MulighetForArbeid, NasjonalFormValues } from '../form/NasjonalSykmeldingFormTypes'
import { Nullable } from '../../../utils/tsUtils'
import { Periode } from '../schema/sykmelding/Periode'
import { toDateString } from '../../../utils/dateUtils'
import { DiagnoseSystem } from '../../FormComponents/DiagnosePicker/DiagnosePicker'
import { DiagnosekodeSystem } from '../schema/diagnosekoder/Diagnosekoder'
import { RegistrertSykmelding, RegistrertSykmeldingSchema } from '../schema/sykmelding/RegistrertSykmelding'
import { Papirsykmelding } from '../schema/sykmelding/Papirsykmelding'

export function mapFormValueToSmregRegistrertSykmelding(
    values: NasjonalFormValues,
    sykmelding: Papirsykmelding | null,
): RegistrertSykmelding {
    return RegistrertSykmeldingSchema.parse({
        pasientFnr: values.pasientopplysninger.fnr,
        sykmelderFnr: '',
        perioder: values.mulighetForArbeid.map(mapFormPeriodToRegistrertPeriod),
        medisinskVurdering: {
            svangerskap: values.medisinskVurdering.svangerskap,
            yrkesskade: values.medisinskVurdering.yrkesskade,
            yrkesskadeDato: values.medisinskVurdering.yrkesskadeDato
                ? toDateString(values.medisinskVurdering.yrkesskadeDato)
                : null,
            hovedDiagnose: {
                system: diagnoseSystemToWeirdString(values.medisinskVurdering.hoveddiagnose.system),
                kode: values.medisinskVurdering.hoveddiagnose.code,
                tekst: values.medisinskVurdering.hoveddiagnose.text,
            },
            biDiagnoser: values.medisinskVurdering.bidiagnoser.map((it) => ({
                system: diagnoseSystemToWeirdString(it.system),
                kode: it.code,
                tekst: it.text,
            })),
            annenFraversArsak: values.medisinskVurdering.annenFraversArsak
                ? {
                      grunn: values.medisinskVurdering.annenFraversArsakGrunn ?? [],
                      beskrivelse: values.medisinskVurdering.annenFraversArsakBeskrivelse,
                  }
                : null,
        },
        arbeidsgiver: {
            harArbeidsgiver: values.arbeidsgiver.harArbeidsgiver,
            navn: values.arbeidsgiver.arbeidsgiverNavn,
            yrkesbetegnelse: values.arbeidsgiver.yrkesbetegnelse,
            stillingsprosent: values.arbeidsgiver.stillingsprosent,
        },
        behandletDato: values.behandler.behandletDato ? toDateString(values.behandler.behandletDato) : null,
        skjermesForPasient: values.skjermesForPasient,
        behandler: {
            hpr: values.behandler.hpr,
            // TODO: Lol why are all these values here?
            adresse: sykmelding?.behandler?.adresse ?? {
                gate: null,
                postnummer: null,
                kommune: null,
                postboks: null,
                land: null,
            },
            tlf: values.behandler.tlf ?? sykmelding?.behandler?.tlf ?? null,
            her: null,
            aktoerId: '',
            fnr: '',
            fornavn: '',
            mellomnavn: null,
            etternavn: '',
        },
        kontaktMedPasient: {
            kontaktDato: values.tilbakedatering.tilbakedatertDato
                ? toDateString(values.tilbakedatering.tilbakedatertDato)
                : null,
            begrunnelseIkkeKontakt: values.tilbakedatering.kunneIkkeIvaretaEgneInteresserBegrunnelse,
        },
        meldingTilNAV: {
            bistandUmiddelbart: values.bistandFraNAV.bistandFraNAV,
            beskrivBistand: values.bistandFraNAV.beskrivelse,
        },
        meldingTilArbeidsgiver: values.andreInnspillTilArbeidsgiver,
        harUtdypendeOpplysninger: values.harUtdypendeOpplysninger,
        // Was not used in smreg
        syketilfelleStartDato: null,
        navnFastlege: null,
    })
}

export function mapFormPeriodToRegistrertPeriod(periode: MulighetForArbeid): Nullable<Periode> {
    const dates = {
        fom: periode.fom != null ? toDateString(periode.fom) : null,
        tom: periode.tom != null ? toDateString(periode.tom) : null,
    }

    switch (periode.type) {
        case 'reisetilskudd':
            return {
                ...dates,
                reisetilskudd: true,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            }

        case 'aktivitetIkkeMulig':
            return {
                ...dates,
                reisetilskudd: false,
                aktivitetIkkeMulig: {
                    medisinskArsak: periode.medisinskArsak
                        ? {
                              arsak: periode.medisinskArsakType ?? [],
                              beskrivelse: periode.medisinskArsakBeskrivelse,
                          }
                        : null,
                    arbeidsrelatertArsak: periode.arbeidsrelatertArsak
                        ? {
                              arsak: periode.arbeidsrelatertArsakType ?? [],
                              beskrivelse: periode.arbeidsrelatertArsakBeskrivelse,
                          }
                        : null,
                },
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            }

        case 'avventende':
            return {
                ...dates,
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: periode.avventendeInnspillTilArbeidsgiver,
                gradert: null,
            }

        case 'gradert':
            return {
                ...dates,
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: {
                    grad: periode.grad,
                    reisetilskudd: periode.reisetilskudd,
                },
            }

        case 'behandlingsdager':
            return {
                ...dates,
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: periode.antall,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            }
    }
}

function diagnoseSystemToWeirdString(system: DiagnoseSystem): string {
    switch (system) {
        case 'ICD10':
            return DiagnosekodeSystem.ICD10
        case 'ICPC2':
            return DiagnosekodeSystem.ICPC2
    }
}
