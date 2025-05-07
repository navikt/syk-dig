import { logger } from '@navikt/next-logger'

import { raise } from '../../utils/tsUtils'
import { toDateString } from '../../utils/dateUtils'
import { DiagnoseSystem } from '../FormComponents/DiagnosePicker/diagnose-combobox/types'
import {
    NasjonalSykmeldingFragment,
    NasjonalSykmeldingValues,
    PeriodeValues,
} from '../../graphql/queries/graphql.generated'

import { DiagnosekodeSystem } from './schema/diagnosekoder/Diagnosekoder'
import { MulighetForArbeid, NasjonalFormValues } from './form/NasjonalSykmeldingFormTypes'

export function mapFormValueToNasjonalSykmelding(
    values: NasjonalFormValues,
    sykmelding: NasjonalSykmeldingFragment | null,
): NasjonalSykmeldingValues {
    return {
        pasientFnr: values.pasientopplysninger.fnr ?? raise('Oppgave kan ikke lagres uten fnr'),
        sykmelderFnr: '',
        perioder: values.mulighetForArbeid.map(mapFormPeriodToRegistrertPeriod),
        medisinskVurdering: {
            svangerskap: values.medisinskVurdering.svangerskap,
            yrkesskade: values.medisinskVurdering.yrkesskade,
            yrkesskadeDato: values.medisinskVurdering.yrkesskadeDato
                ? toDateString(values.medisinskVurdering.yrkesskadeDato)
                : null,
            hovedDiagnose: {
                system: diagnoseSystemToAbbrevation(values.medisinskVurdering.hoveddiagnose.system),
                kode:
                    values.medisinskVurdering.hoveddiagnose.code ??
                    raise('Oppgave kan ikke lagres uten kode for hoveddiagnose'),
                tekst: values.medisinskVurdering.hoveddiagnose.text,
            },
            biDiagnoser: values.medisinskVurdering.bidiagnoser.map((it) => ({
                system: diagnoseSystemToAbbrevation(it.system),
                kode: it.code ?? raise('Oppgave kan ikke lagres uten kode for hoveddiagnose'),
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
        behandletDato: values.behandler.behandletDato
            ? toDateString(values.behandler.behandletDato)
            : raise('Oppgave kan ikke lagres uten behandlet dato'),
        skjermesForPasient: values.skjermesForPasient,
        behandler: {
            hpr: values.behandler.hpr,
            tlf: values.behandler.tlf ?? sykmelding?.behandler?.tlf ?? null,
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
    }
}

export function mapFormPeriodToRegistrertPeriod(periode: MulighetForArbeid): PeriodeValues {
    const dates = {
        fom: periode.fom ? toDateString(periode.fom) : raise('Sykmeldingsperiode må ha fom. dato'),
        tom: periode.tom ? toDateString(periode.tom) : raise('Sykmeldingsperiode må ha tom. dato'),
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
                    grad: periode.grad ?? raise('Sykmelding med gradert periode må ha grad'),
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

function diagnoseSystemToAbbrevation(system: DiagnoseSystem): string {
    switch (system) {
        case 'ICD10':
            return DiagnosekodeSystem.ICD10
        case 'ICPC2':
            return DiagnosekodeSystem.ICPC2
        default:
            logger.warn(`Unknown diagnosekode-string: ${system}, defaulting to ICD10`)
            return 'ICD10'
    }
}
