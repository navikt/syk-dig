import { HarArbeidsgiver } from './schema/sykmelding/Arbeidsgiver'
import { AnnenFraverGrunn, Diagnose } from './schema/sykmelding/MedisinskVurdering'
import { ArbeidsrelatertArsakType, MedisinskArsakType } from './schema/sykmelding/Periode'

export type Pasientopplysninger = {
    pasientFnr: string | null
}

export type Arbeidsgiver = {
    harArbeidsgiver: HarArbeidsgiver | null
    arbeidsgiverNavn: string | null
    yrkesbetegnelse: string | null
    stillingsprosent: number | null
}

export type MedisinskVurdering = {
    hovedDiagnose: Partial<Diagnose> | null
    biDiagnoser: Partial<Diagnose>[]
    yrkesskade: boolean
    yrkesskadeDato: string | null
    svangerskap: boolean
    annenFraversArsak: boolean
    annenFraversArsakGrunn: AnnenFraverGrunn[] | null
    annenFraversArsakBeskrivelse: string | null
    skjermesForPasient: boolean | null // TODO: burde kanskje flyttes
}

export type AvventendePeriodeMFA = {
    type: 'avventende'
    // Perioder for avventende sykmelding
    avventendePeriode: string[] | null
    avventendeInnspillTilArbeidsgiver: string | null
}

export type GradertPeriodeMFA = {
    type: 'gradert'
    // Perioder for gradert sykmelding
    gradertPeriode: string[] | null
    gradertGrad: number | null
    gradertReisetilskudd: boolean
}

export type BehandlingsdagerPeriodeMFA = {
    type: 'behandlingsdager'
    // Perioder for sykmelding for behandlignsdager
    behandlingsdagerPeriode: string[] | null
    behandlingsdagerAntall: number | null
}

export type ReisetilskuddPeriodeMFA = {
    type: 'reisetilskudd'
    // Perioder for sykmelding med reisetilskudd
    reisetilskuddPeriode: string[] | null
}

export type AktivitetIkkeMuligPeriodeMFA = {
    type: 'fullsykmelding'
    // Perioder for full sykmelding
    periode: string[] | null
    medisinskArsak: boolean
    medisinskArsakType: MedisinskArsakType[]
    medisinskArsakBeskrivelse: string | null
    arbeidsrelatertArsak: boolean
    arbeidsrelatertArsakType: ArbeidsrelatertArsakType[]
    arbeidsrelatertArsakBeskrivelse: string | null
}

export type MulighetForArbeidTypes =
    | AvventendePeriodeMFA
    | GradertPeriodeMFA
    | AktivitetIkkeMuligPeriodeMFA
    | BehandlingsdagerPeriodeMFA
    | ReisetilskuddPeriodeMFA

export type MulighetForArbeid = {
    mulighetForArbeid: MulighetForArbeidTypes[]
}

export interface UtdypendeOpplysninger {
    harUtdypendeOpplysninger: boolean
}

export type MeldingTilNav = {
    meldingTilNavBistand: boolean
    meldingTilNavBegrunn: string | null
}

export type MeldingTilArbeidsgiver = {
    meldingTilArbeidsgiverBeskriv: string | null
}

export type Tilbakedatering = {
    erTilbakedatert: boolean
    kontaktDato: string | null
    kunneIkkeIvaretaEgneInteresser: boolean
    begrunnelseIkkeKontakt: string | null
}

export type Behandler = {
    behandletDato: string | null
    sykmeldersFornavn: string | null
    sykmeldersEtternavn: string | null
    sykmelderFnr: string | null
    aktoerId: string | null
    hpr: string | null
    sykmelderTelefon: string | null
    sykmelderGate: string | null
    sykmelderPostnummer: number | null
    sykmelderKommune: string | null
    sykmelderPostboks: string | null
    sykmelderLand: string | null
}

export interface FormType
    extends Pasientopplysninger,
        Arbeidsgiver,
        MedisinskVurdering,
        MulighetForArbeid,
        UtdypendeOpplysninger,
        MeldingTilNav,
        MeldingTilArbeidsgiver,
        Tilbakedatering,
        Behandler {
    syketilfelleStartDato: string | null
}
