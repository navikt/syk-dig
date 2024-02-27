import { DefaultValues } from 'react-hook-form'
import { logger } from '@navikt/next-logger'

import { Oppgave } from '../schema/oppgave/Oppgave'
import { DiagnosekodeSystem } from '../schema/diagnosekoder/Diagnosekoder'
import { DiagnoseSystem } from '../../FormComponents/DiagnosePicker/DiagnosePicker'
import { notNull, raise } from '../../../utils/tsUtils'
import { Periode } from '../schema/sykmelding/Periode'
import { safeToDate, toDate } from '../../../utils/dateUtils'

import {
    AktivitetIkkeMuligPeriode,
    AvventendePeriode,
    BehandlingsdagerPeriode,
    GradertPeriode,
    MulighetForArbeid,
    NasjonalFormValues,
    ReisetilskuddPeriode,
} from './NasjonalSykmeldingFormTypes'

export function createDefaultValues(oppgave: Oppgave): DefaultValues<NasjonalFormValues> {
    return {
        pasientopplysninger: {
            fnr: oppgave.papirSmRegistering?.fnr ?? null,
        },
        arbeidsgiver: {
            harArbeidsgiver: oppgave.papirSmRegistering?.arbeidsgiver?.harArbeidsgiver ?? null,
            arbeidsgiverNavn: oppgave.papirSmRegistering?.arbeidsgiver?.navn ?? null,
            yrkesbetegnelse: oppgave.papirSmRegistering?.arbeidsgiver?.yrkesbetegnelse ?? null,
            stillingsprosent: oppgave.papirSmRegistering?.arbeidsgiver?.stillingsprosent ?? null,
        },
        medisinskVurdering: {
            hoveddiagnose: {
                system:
                    diagnoseCodeWeirdStringToSystem(
                        oppgave.papirSmRegistering?.medisinskVurdering?.hovedDiagnose?.system,
                    ) ?? 'ICD10',
                code: oppgave.papirSmRegistering?.medisinskVurdering?.hovedDiagnose?.kode ?? null,
                text: oppgave.papirSmRegistering?.medisinskVurdering?.hovedDiagnose?.tekst ?? null,
            },
            bidiagnoser:
                oppgave.papirSmRegistering?.medisinskVurdering?.biDiagnoser.filter(notNull).map((it) => ({
                    system: diagnoseCodeWeirdStringToSystem(it?.system) ?? 'ICD10',
                    code: it?.kode ?? null,
                    text: it?.tekst ?? null,
                })) ?? [],
            annenFraversArsak: oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak != null,
            annenFraversArsakGrunn: oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak?.grunn ?? null,
            annenFraversArsakBeskrivelse:
                oppgave.papirSmRegistering?.medisinskVurdering?.annenFraversArsak?.beskrivelse ?? null,
            svangerskap: oppgave.papirSmRegistering?.medisinskVurdering?.svangerskap ?? false,
            yrkesskade: oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskade ?? false,
            yrkesskadeDato: safeToDate(oppgave.papirSmRegistering?.medisinskVurdering?.yrkesskadeDato),
        },
        harUtdypendeOpplysninger: false,
        skjermesForPasient: oppgave.papirSmRegistering?.skjermesForPasient ?? false,
        mulighetForArbeid:
            (oppgave.papirSmRegistering?.perioder?.length ?? 0) === 0
                ? [createEmptyAktivitetMuligPeriode()]
                : oppgave.papirSmRegistering?.perioder?.map(periodeToMulighetForArbeid) ?? [],
        bistandFraNAV: {
            bistandFraNAV: oppgave.papirSmRegistering?.meldingTilNAV?.bistandUmiddelbart ?? false,
            beskrivelse: oppgave.papirSmRegistering?.meldingTilNAV?.beskrivBistand ?? null,
        },
        andreInnspillTilArbeidsgiver: oppgave.papirSmRegistering?.meldingTilArbeidsgiver ?? null,
        tilbakedatering: {
            tilbakedatert: oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato != null ?? false,
            tilbakedatertDato: safeToDate(oppgave.papirSmRegistering?.kontaktMedPasient?.kontaktDato),
            kunneIkkeIvaretaEgneInteresser: !!oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt,
            kunneIkkeIvaretaEgneInteresserBegrunnelse:
                oppgave.papirSmRegistering?.kontaktMedPasient?.begrunnelseIkkeKontakt ?? null,
        },
        behandler: {
            behandletDato: safeToDate(oppgave.papirSmRegistering?.behandletTidspunkt),
            hpr: oppgave.papirSmRegistering?.behandler?.hpr ?? null,
            tlf: oppgave.papirSmRegistering?.behandler?.tlf ?? null,
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
            return 'ICD10'
        case DiagnosekodeSystem.ICPC2:
            return 'ICPC2'
        default:
            logger.warn(`Unknown diagnosekode-string: ${diagnosekodeString}, defaulting to ICD10`)
            return 'ICD10'
    }
}
