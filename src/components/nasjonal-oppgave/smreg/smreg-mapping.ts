import { MulighetForArbeid, NasjonalFormValues } from '../form/NasjonalSykmeldingFormTypes'
import { toDateString } from '../../../utils/dateUtils'
import { DiagnoseSystem } from '../../FormComponents/DiagnosePicker/diagnose-combobox/types'
import {NasjonalSykmeldingFragment, Periode} from "../../../graphql/queries/graphql.generated";
import {DiagnosekodeSystem} from "../schema/sykmelding/Diagnosekoder";

export function mapFormValueToSmregRegistrertSykmelding(
    values: NasjonalFormValues,
    sykmelding: NasjonalSykmeldingFragment | null,
): NasjonalSykmeldingFragment {
    return {
        __typename: 'NasjonalSykmelding',
        journalpostId: '',
        fnr: values.pasientopplysninger.fnr,
        perioder: values.mulighetForArbeid.map(mapFormPeriodToRegistrertPeriod),
        medisinskVurdering: {
            __typename:  'MedisinskVurdering',
            svangerskap: values.medisinskVurdering.svangerskap,
            yrkesskade: values.medisinskVurdering.yrkesskade,
            yrkesskadeDato: values.medisinskVurdering.yrkesskadeDato
                ? toDateString(values.medisinskVurdering.yrkesskadeDato)
                : null,
            hovedDiagnose: {
                __typename:  'DiagnoseSchema',
                system: diagnoseSystemToAbbrevation(values.medisinskVurdering.hoveddiagnose.system),
                kode: values.medisinskVurdering.hoveddiagnose.code,
                tekst: values.medisinskVurdering.hoveddiagnose.text,
            },
            biDiagnoser: values.medisinskVurdering.bidiagnoser.map((it) => ({
                __typename:  'DiagnoseSchema',
                system: diagnoseSystemToAbbrevation(it.system),
                kode: it.code,
                tekst: it.text,
            })),
            annenFraversArsak: values.medisinskVurdering.annenFraversArsak
                ? {
                     __typename: 'AnnenFraversArsak',
                      grunn: values.medisinskVurdering.annenFraversArsakGrunn ?? [],
                      beskrivelse: values.medisinskVurdering.annenFraversArsakBeskrivelse,
                  }
                : null,
        },
        arbeidsgiver: {
            __typename: 'Arbeidsgiver',
            harArbeidsgiver: values.arbeidsgiver.harArbeidsgiver,
            navn: values.arbeidsgiver.arbeidsgiverNavn,
            yrkesbetegnelse: values.arbeidsgiver.yrkesbetegnelse,
            stillingsprosent: values.arbeidsgiver.stillingsprosent,
        },
        behandletTidspunkt: values.behandler.behandletDato ? toDateString(values.behandler.behandletDato) : null,
        skjermesForPasient: values.skjermesForPasient,
        behandler: {
            __typename: 'Behandler',
            hpr: values.behandler.hpr,
            tlf: values.behandler.tlf ?? sykmelding?.behandler?.tlf ?? null,
            fnr: '',
            fornavn: '',
            mellomnavn: null,
            etternavn: '',
        },
        kontaktMedPasient: {
            __typename: 'KontaktMedPasient',
            kontaktDato: values.tilbakedatering.tilbakedatertDato
                ? toDateString(values.tilbakedatering.tilbakedatertDato)
                : null,
            begrunnelseIkkeKontakt: values.tilbakedatering.kunneIkkeIvaretaEgneInteresserBegrunnelse,
        },
        meldingTilNAV: {
            __typename: 'MeldingTilNAV',
            bistandUmiddelbart: values.bistandFraNAV.bistandFraNAV,
            beskrivBistand: values.bistandFraNAV.beskrivelse,
        },
        meldingTilArbeidsgiver: values.andreInnspillTilArbeidsgiver,
        syketilfelleStartDato: null
    }
}

export function mapFormPeriodToRegistrertPeriod(periode: MulighetForArbeid): Periode {
    const dates = {
        fom: toDateString(periode.fom),
        tom: toDateString(periode.tom),
    }

    switch (periode.type) {
        case 'reisetilskudd':
            return {
                ...dates,
                __typename: 'Periode',
                reisetilskudd: true,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            }

        case 'aktivitetIkkeMulig':
            return {
                ...dates,
                __typename: 'Periode',
                reisetilskudd: false,
                aktivitetIkkeMulig: {
                    __typename: 'AktivitetIkkeMulig',
                    medisinskArsak:
                         {
                              __typename: 'MedisinskArsak',
                              arsak: periode.medisinskArsakType,
                              beskrivelse: periode.medisinskArsakBeskrivelse,
                          },
                    arbeidsrelatertArsak:
                         {
                              __typename: 'ArbeidsrelatertArsak',
                              arsak: periode.arbeidsrelatertArsakType,
                              beskrivelse: periode.arbeidsrelatertArsakBeskrivelse,
                          }

                },
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: null,
            }

        case 'avventende':
            return {
                ...dates,
                __typename: 'Periode',
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: periode.avventendeInnspillTilArbeidsgiver,
                gradert: null,
            }

        case 'gradert':
            return {
                ...dates,
                __typename: 'Periode',
                reisetilskudd: false,
                aktivitetIkkeMulig: null,
                behandlingsdager: null,
                avventendeInnspillTilArbeidsgiver: null,
                gradert: {
                    __typename: 'Gradert',
                    grad: periode.grad,
                    reisetilskudd: periode.reisetilskudd,
                },
            }

        case 'behandlingsdager':
            return {
                ...dates,
                __typename: 'Periode',
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
    }
}
