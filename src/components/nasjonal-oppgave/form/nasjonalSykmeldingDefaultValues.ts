import { DefaultValues } from 'react-hook-form'
import { logger } from '@navikt/next-logger'

import { DiagnosekodeSystem } from '../schema/diagnosekoder/Diagnosekoder'
import { notNull, raise } from '../../../utils/tsUtils'
import { Periode } from '../schema/sykmelding/Periode'
import { safeToDate, toDate } from '../../../utils/dateUtils'
import { Papirsykmelding } from '../schema/sykmelding/Papirsykmelding'
import { DiagnoseSystem } from '../../FormComponents/DiagnosePicker/diagnose-combobox/types'

import {
    AktivitetIkkeMuligPeriode,
    AvventendePeriode,
    BehandlingsdagerPeriode,
    GradertPeriode,
    MulighetForArbeid,
    NasjonalFormValues,
    ReisetilskuddPeriode,
} from './NasjonalSykmeldingFormTypes'

export function createDefaultValues(sykmelding: Papirsykmelding | null): DefaultValues<NasjonalFormValues> {
    return {
        pasientopplysninger: {
            fnr: sykmelding?.fnr ?? null,
        },
        arbeidsgiver: {
            harArbeidsgiver: sykmelding?.arbeidsgiver?.harArbeidsgiver ?? null,
            arbeidsgiverNavn: sykmelding?.arbeidsgiver?.navn ?? null,
            yrkesbetegnelse: sykmelding?.arbeidsgiver?.yrkesbetegnelse ?? null,
            stillingsprosent: sykmelding?.arbeidsgiver?.stillingsprosent ?? null,
        },
        medisinskVurdering: {
            hoveddiagnose: {
                system:
                    diagnoseCodeWeirdStringToSystem(sykmelding?.medisinskVurdering?.hovedDiagnose?.system) ?? 'ICD10',
                code: sykmelding?.medisinskVurdering?.hovedDiagnose?.kode ?? null,
                text: sykmelding?.medisinskVurdering?.hovedDiagnose?.tekst ?? null,
            },
            bidiagnoser:
                sykmelding?.medisinskVurdering?.biDiagnoser.filter(notNull).map((it) => ({
                    system: diagnoseCodeWeirdStringToSystem(it?.system) ?? 'ICD10',
                    code: it?.kode ?? null,
                    text: it?.tekst ?? null,
                })) ?? [],
            annenFraversArsak: sykmelding?.medisinskVurdering?.annenFraversArsak != null,
            annenFraversArsakGrunn: sykmelding?.medisinskVurdering?.annenFraversArsak?.grunn ?? null,
            annenFraversArsakBeskrivelse: sykmelding?.medisinskVurdering?.annenFraversArsak?.beskrivelse ?? null,
            svangerskap: sykmelding?.medisinskVurdering?.svangerskap ?? false,
            yrkesskade: sykmelding?.medisinskVurdering?.yrkesskade ?? false,
            yrkesskadeDato: safeToDate(sykmelding?.medisinskVurdering?.yrkesskadeDato),
        },
        harUtdypendeOpplysninger: false,
        skjermesForPasient: sykmelding?.skjermesForPasient ?? false,
        mulighetForArbeid:
            (sykmelding?.perioder?.length ?? 0) === 0
                ? [createEmptyAktivitetMuligPeriode()]
                : (sykmelding?.perioder?.map(periodeToMulighetForArbeid) ?? []),
        bistandFraNAV: {
            bistandFraNAV: sykmelding?.meldingTilNAV?.bistandUmiddelbart ?? false,
            beskrivelse: sykmelding?.meldingTilNAV?.beskrivBistand ?? null,
        },
        andreInnspillTilArbeidsgiver: sykmelding?.meldingTilArbeidsgiver ?? null,
        tilbakedatering: {
            tilbakedatert: sykmelding?.kontaktMedPasient?.kontaktDato != null ?? false,
            tilbakedatertDato: safeToDate(sykmelding?.kontaktMedPasient?.kontaktDato),
            kunneIkkeIvaretaEgneInteresser: !!sykmelding?.kontaktMedPasient?.begrunnelseIkkeKontakt,
            kunneIkkeIvaretaEgneInteresserBegrunnelse: sykmelding?.kontaktMedPasient?.begrunnelseIkkeKontakt ?? null,
        },
        behandler: {
            behandletDato: safeToDate(sykmelding?.behandletTidspunkt),
            hpr: sykmelding?.behandler?.hpr ?? null,
            tlf: sykmelding?.behandler?.tlf ?? null,
        },
    }
}

function periodeToMulighetForArbeid(periode: Periode): MulighetForArbeid {
    if (periode.aktivitetIkkeMulig != null) {
        return {
            type: 'aktivitetIkkeMulig',
            fom: toDate(periode.fom),
            tom: toDate(periode.tom),
            medisinskArsak: periode.aktivitetIkkeMulig.medisinskArsak != null,
            medisinskArsakType: periode.aktivitetIkkeMulig.medisinskArsak?.arsak ?? [],
            medisinskArsakBeskrivelse: periode.aktivitetIkkeMulig.medisinskArsak?.beskrivelse ?? null,
            arbeidsrelatertArsak: periode.aktivitetIkkeMulig.arbeidsrelatertArsak != null,
            arbeidsrelatertArsakType: periode.aktivitetIkkeMulig.arbeidsrelatertArsak?.arsak ?? [],
            arbeidsrelatertArsakBeskrivelse: periode.aktivitetIkkeMulig.arbeidsrelatertArsak?.beskrivelse ?? null,
        } satisfies AktivitetIkkeMuligPeriode
    } else if (periode.gradert != null) {
        return {
            type: 'gradert',
            fom: toDate(periode.fom),
            tom: toDate(periode.tom),
            grad: periode.gradert.grad ?? null,
            reisetilskudd: periode.gradert.reisetilskudd ?? false,
        } satisfies GradertPeriode
    } else if (periode.behandlingsdager != null) {
        return {
            type: 'behandlingsdager',
            fom: toDate(periode.fom),
            tom: toDate(periode.tom),
            antall: periode.behandlingsdager,
        } satisfies BehandlingsdagerPeriode
    } else if (periode.avventendeInnspillTilArbeidsgiver != null) {
        return {
            type: 'avventende',
            fom: toDate(periode.fom),
            tom: toDate(periode.tom),
            avventendeInnspillTilArbeidsgiver: periode.avventendeInnspillTilArbeidsgiver,
        } satisfies AvventendePeriode
    } else if (periode.reisetilskudd) {
        return {
            type: 'reisetilskudd',
            fom: toDate(periode.fom),
            tom: toDate(periode.tom),
        } satisfies ReisetilskuddPeriode
    } else {
        raise(new Error(`No valid periode type found, this should not happen, ${periode.fom}, ${periode.tom}`))
    }
}

export function createEmptyAktivitetMuligPeriode(): AktivitetIkkeMuligPeriode {
    return {
        type: 'aktivitetIkkeMulig',
        fom: null,
        tom: null,
        medisinskArsak: false,
        medisinskArsakType: [],
        medisinskArsakBeskrivelse: null,
        arbeidsrelatertArsak: false,
        arbeidsrelatertArsakType: [],
        arbeidsrelatertArsakBeskrivelse: null,
    }
}

function diagnoseCodeWeirdStringToSystem(diagnosekodeString: string | undefined | null): DiagnoseSystem | null {
    if (!diagnosekodeString) return null

    switch (diagnosekodeString) {
        case DiagnosekodeSystem.ICD10:
        case 'ICD-10':
            return 'ICD10'
        case DiagnosekodeSystem.ICPC2:
        case 'ICPC-2':
            return 'ICPC2'
        default:
            logger.warn(`Unknown diagnosekode-string: ${diagnosekodeString}, defaulting to ICD10`)
            return 'ICD10'
    }
}
