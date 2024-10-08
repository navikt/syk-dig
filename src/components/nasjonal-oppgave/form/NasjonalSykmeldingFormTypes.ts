import { HarArbeidsgiver } from '../schema/sykmelding/Arbeidsgiver'
import { AnnenFraverGrunn } from '../schema/sykmelding/MedisinskVurdering'
import { ArbeidsrelatertArsakType, MedisinskArsakType } from '../schema/sykmelding/Periode'
import { DiagnoseFormValue } from '../../FormComponents/DiagnosePicker/diagnose-combobox/types'

export type NasjonalFormValues = {
    pasientopplysninger: {
        fnr: string | null
    }
    arbeidsgiver: {
        harArbeidsgiver: HarArbeidsgiver | null
        arbeidsgiverNavn: string | null
        yrkesbetegnelse: string | null
        stillingsprosent: number | null
    }
    medisinskVurdering: {
        hoveddiagnose: DiagnoseFormValue
        bidiagnoser: DiagnoseFormValue[]
        annenFraversArsak: boolean
        annenFraversArsakGrunn: AnnenFraverGrunn[] | null
        annenFraversArsakBeskrivelse: string | null

        svangerskap: boolean
        yrkesskade: boolean
        yrkesskadeDato: Date | null
    }
    skjermesForPasient: boolean
    mulighetForArbeid: MulighetForArbeid[]
    harUtdypendeOpplysninger: boolean
    bistandFraNAV: {
        bistandFraNAV: boolean
        beskrivelse: string | null
    }
    andreInnspillTilArbeidsgiver: string | null
    tilbakedatering: {
        tilbakedatert: boolean
        tilbakedatertDato: Date | null
        kunneIkkeIvaretaEgneInteresser: boolean
        kunneIkkeIvaretaEgneInteresserBegrunnelse: string | null
    }
    behandler: {
        behandletDato: Date | null
        hpr: string | null
        tlf: string | null
    }
}

export type MulighetForArbeid =
    | AktivitetIkkeMuligPeriode
    | AvventendePeriode
    | GradertPeriode
    | BehandlingsdagerPeriode
    | ReisetilskuddPeriode

export type FomTom = {
    fom: Date | null
    tom: Date | null
}

export type AvventendePeriode = FomTom & {
    type: 'avventende'
    avventendeInnspillTilArbeidsgiver: string | null
}

export type GradertPeriode = FomTom & {
    type: 'gradert'
    grad: number | null
    reisetilskudd: boolean
}

export type BehandlingsdagerPeriode = FomTom & {
    type: 'behandlingsdager'
    antall: number | null
}

export type ReisetilskuddPeriode = FomTom & {
    type: 'reisetilskudd'
}

export type AktivitetIkkeMuligPeriode = FomTom & {
    type: 'aktivitetIkkeMulig'
    medisinskArsak: boolean
    medisinskArsakType: MedisinskArsakType[]
    medisinskArsakBeskrivelse: string | null
    arbeidsrelatertArsak: boolean
    arbeidsrelatertArsakType: ArbeidsrelatertArsakType[]
    arbeidsrelatertArsakBeskrivelse: string | null
}
