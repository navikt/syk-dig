/* oxlint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

import type * as Types from './types.generated'
export * from './types.generated'
export type JournalpostFragment = {
    __typename: 'Journalpost'
    journalpostId: string
    journalstatus: string
    fnr: string
    dokumenter: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
}

export type JournalpostStatusFragment = {
    __typename: 'JournalpostStatus'
    journalpostId: string
    status: Types.JournalpostStatusEnum
    oppgaveId: string | null
}

export type JournalpostByIdQueryVariables = Exact<{
    id: string
}>

export type JournalpostByIdQuery = {
    __typename: 'Query'
    journalpost:
        | {
              __typename: 'Journalpost'
              journalpostId: string
              journalstatus: string
              fnr: string
              dokumenter: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
          }
        | {
              __typename: 'JournalpostStatus'
              journalpostId: string
              status: Types.JournalpostStatusEnum
              oppgaveId: string | null
          }
}

export type SykmeldingFraJournalpostMutationVariables = Exact<{
    id: string
    norsk: boolean
    navEnhet?: string | null | undefined
}>

export type SykmeldingFraJournalpostMutation = {
    __typename: 'Mutation'
    sykmeldingFraJournalpost: {
        __typename: 'JournalpostStatus'
        journalpostId: string
        status: Types.JournalpostStatusEnum
        oppgaveId: string | null
    }
}

export type NasjonalOppgaveFragment = {
    __typename: 'NasjonalOppgave'
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; dokumentInfoId: string; tittel: string }>
    nasjonalSykmelding: {
        __typename: 'NasjonalSykmelding'
        sykmeldingId: string | null
        fnr: string | null
        journalpostId: string
        datoOpprettet: string | null
        syketilfelleStartDato: string | null
        behandletTidspunkt: string | null
        skjermesForPasient: boolean | null
        meldingTilArbeidsgiver: string | null
        harUtdypendeOpplysninger: boolean | null
        arbeidsgiver: {
            __typename: 'Arbeidsgiver'
            navn: string | null
            stillingsprosent: number | null
            yrkesbetegnelse: string | null
            harArbeidsgiver: Types.HarArbeidsgiver | null
        } | null
        behandler: {
            __typename: 'Behandler'
            fornavn: string
            mellomnavn: string | null
            etternavn: string
            fnr: string
            hpr: string | null
            tlf: string | null
        } | null
        perioder: Array<{
            __typename: 'Periode'
            fom: string
            tom: string
            reisetilskudd: boolean | null
            behandlingsdager: number | null
            avventendeInnspillTilArbeidsgiver: string | null
            gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
            aktivitetIkkeMulig: {
                __typename: 'AktivitetIkkeMulig'
                medisinskArsak: {
                    __typename: 'MedisinskArsak'
                    beskrivelse: string | null
                    arsak: Array<Types.MedisinskArsakType>
                } | null
                arbeidsrelatertArsak: {
                    __typename: 'ArbeidsrelatertArsak'
                    beskrivelse: string | null
                    arsak: Array<Types.ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        meldingTilNAV: {
            __typename: 'MeldingTilNAV'
            bistandUmiddelbart: boolean
            beskrivBistand: string | null
        } | null
        medisinskVurdering: {
            __typename: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato: string | null
            hovedDiagnose: {
                __typename: 'DiagnoseSchema'
                kode: string | null
                tekst: string | null
                system: string | null
            } | null
            biDiagnoser: Array<{
                __typename: 'DiagnoseSchema'
                kode: string | null
                tekst: string | null
                system: string | null
            }>
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak'
                beskrivelse: string | null
                grunn: Array<Types.AnnenFraversArsakGrunn> | null
            } | null
        } | null
        kontaktMedPasient: {
            __typename: 'KontaktMedPasient'
            kontaktDato: string | null
            begrunnelseIkkeKontakt: string | null
        } | null
    }
}

export type NasjonalOppgaveResult_NasjonalOppgave_Fragment = {
    __typename: 'NasjonalOppgave'
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; dokumentInfoId: string; tittel: string }>
    nasjonalSykmelding: {
        __typename: 'NasjonalSykmelding'
        sykmeldingId: string | null
        fnr: string | null
        journalpostId: string
        datoOpprettet: string | null
        syketilfelleStartDato: string | null
        behandletTidspunkt: string | null
        skjermesForPasient: boolean | null
        meldingTilArbeidsgiver: string | null
        harUtdypendeOpplysninger: boolean | null
        arbeidsgiver: {
            __typename: 'Arbeidsgiver'
            navn: string | null
            stillingsprosent: number | null
            yrkesbetegnelse: string | null
            harArbeidsgiver: Types.HarArbeidsgiver | null
        } | null
        behandler: {
            __typename: 'Behandler'
            fornavn: string
            mellomnavn: string | null
            etternavn: string
            fnr: string
            hpr: string | null
            tlf: string | null
        } | null
        perioder: Array<{
            __typename: 'Periode'
            fom: string
            tom: string
            reisetilskudd: boolean | null
            behandlingsdager: number | null
            avventendeInnspillTilArbeidsgiver: string | null
            gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
            aktivitetIkkeMulig: {
                __typename: 'AktivitetIkkeMulig'
                medisinskArsak: {
                    __typename: 'MedisinskArsak'
                    beskrivelse: string | null
                    arsak: Array<Types.MedisinskArsakType>
                } | null
                arbeidsrelatertArsak: {
                    __typename: 'ArbeidsrelatertArsak'
                    beskrivelse: string | null
                    arsak: Array<Types.ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        meldingTilNAV: {
            __typename: 'MeldingTilNAV'
            bistandUmiddelbart: boolean
            beskrivBistand: string | null
        } | null
        medisinskVurdering: {
            __typename: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato: string | null
            hovedDiagnose: {
                __typename: 'DiagnoseSchema'
                kode: string | null
                tekst: string | null
                system: string | null
            } | null
            biDiagnoser: Array<{
                __typename: 'DiagnoseSchema'
                kode: string | null
                tekst: string | null
                system: string | null
            }>
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak'
                beskrivelse: string | null
                grunn: Array<Types.AnnenFraversArsakGrunn> | null
            } | null
        } | null
        kontaktMedPasient: {
            __typename: 'KontaktMedPasient'
            kontaktDato: string | null
            begrunnelseIkkeKontakt: string | null
        } | null
    }
}

export type NasjonalOppgaveResult_NasjonalOppgaveStatus_Fragment = {
    __typename: 'NasjonalOppgaveStatus'
    oppgaveId: string
    status: Types.NasjonalOppgaveStatusEnum
}

export type NasjonalOppgaveResultFragment =
    | NasjonalOppgaveResult_NasjonalOppgave_Fragment
    | NasjonalOppgaveResult_NasjonalOppgaveStatus_Fragment

export type NasjonalOppgaveStatusFragment = {
    __typename: 'NasjonalOppgaveStatus'
    oppgaveId: string
    status: Types.NasjonalOppgaveStatusEnum
}

export type NasjonalSykmeldingResult_NasjonalOppgave_Fragment = {
    __typename: 'NasjonalOppgave'
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; dokumentInfoId: string; tittel: string }>
    nasjonalSykmelding: {
        __typename: 'NasjonalSykmelding'
        sykmeldingId: string | null
        fnr: string | null
        journalpostId: string
        datoOpprettet: string | null
        syketilfelleStartDato: string | null
        behandletTidspunkt: string | null
        skjermesForPasient: boolean | null
        meldingTilArbeidsgiver: string | null
        harUtdypendeOpplysninger: boolean | null
        arbeidsgiver: {
            __typename: 'Arbeidsgiver'
            navn: string | null
            stillingsprosent: number | null
            yrkesbetegnelse: string | null
            harArbeidsgiver: Types.HarArbeidsgiver | null
        } | null
        behandler: {
            __typename: 'Behandler'
            fornavn: string
            mellomnavn: string | null
            etternavn: string
            fnr: string
            hpr: string | null
            tlf: string | null
        } | null
        perioder: Array<{
            __typename: 'Periode'
            fom: string
            tom: string
            reisetilskudd: boolean | null
            behandlingsdager: number | null
            avventendeInnspillTilArbeidsgiver: string | null
            gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
            aktivitetIkkeMulig: {
                __typename: 'AktivitetIkkeMulig'
                medisinskArsak: {
                    __typename: 'MedisinskArsak'
                    beskrivelse: string | null
                    arsak: Array<Types.MedisinskArsakType>
                } | null
                arbeidsrelatertArsak: {
                    __typename: 'ArbeidsrelatertArsak'
                    beskrivelse: string | null
                    arsak: Array<Types.ArbeidsrelatertArsakType>
                } | null
            } | null
        }>
        meldingTilNAV: {
            __typename: 'MeldingTilNAV'
            bistandUmiddelbart: boolean
            beskrivBistand: string | null
        } | null
        medisinskVurdering: {
            __typename: 'MedisinskVurdering'
            svangerskap: boolean
            yrkesskade: boolean
            yrkesskadeDato: string | null
            hovedDiagnose: {
                __typename: 'DiagnoseSchema'
                kode: string | null
                tekst: string | null
                system: string | null
            } | null
            biDiagnoser: Array<{
                __typename: 'DiagnoseSchema'
                kode: string | null
                tekst: string | null
                system: string | null
            }>
            annenFraversArsak: {
                __typename: 'AnnenFraversArsak'
                beskrivelse: string | null
                grunn: Array<Types.AnnenFraversArsakGrunn> | null
            } | null
        } | null
        kontaktMedPasient: {
            __typename: 'KontaktMedPasient'
            kontaktDato: string | null
            begrunnelseIkkeKontakt: string | null
        } | null
    }
}

export type NasjonalSykmeldingResult_NasjonalSykmeldingStatus_Fragment = {
    __typename: 'NasjonalSykmeldingStatus'
    sykmeldingId: string
    status: Types.NasjonalOppdatertSykmeldingStatusEnum
}

export type NasjonalSykmeldingResultFragment =
    | NasjonalSykmeldingResult_NasjonalOppgave_Fragment
    | NasjonalSykmeldingResult_NasjonalSykmeldingStatus_Fragment

export type NasjonalSykmeldingStatusFragment = {
    __typename: 'NasjonalSykmeldingStatus'
    sykmeldingId: string
    status: Types.NasjonalOppdatertSykmeldingStatusEnum
}

export type NasjonalSykmeldingFragment = {
    __typename: 'NasjonalSykmelding'
    sykmeldingId: string | null
    fnr: string | null
    journalpostId: string
    datoOpprettet: string | null
    syketilfelleStartDato: string | null
    behandletTidspunkt: string | null
    skjermesForPasient: boolean | null
    meldingTilArbeidsgiver: string | null
    harUtdypendeOpplysninger: boolean | null
    arbeidsgiver: {
        __typename: 'Arbeidsgiver'
        navn: string | null
        stillingsprosent: number | null
        yrkesbetegnelse: string | null
        harArbeidsgiver: Types.HarArbeidsgiver | null
    } | null
    behandler: {
        __typename: 'Behandler'
        fornavn: string
        mellomnavn: string | null
        etternavn: string
        fnr: string
        hpr: string | null
        tlf: string | null
    } | null
    perioder: Array<{
        __typename: 'Periode'
        fom: string
        tom: string
        reisetilskudd: boolean | null
        behandlingsdager: number | null
        avventendeInnspillTilArbeidsgiver: string | null
        gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
        aktivitetIkkeMulig: {
            __typename: 'AktivitetIkkeMulig'
            medisinskArsak: {
                __typename: 'MedisinskArsak'
                beskrivelse: string | null
                arsak: Array<Types.MedisinskArsakType>
            } | null
            arbeidsrelatertArsak: {
                __typename: 'ArbeidsrelatertArsak'
                beskrivelse: string | null
                arsak: Array<Types.ArbeidsrelatertArsakType>
            } | null
        } | null
    }>
    meldingTilNAV: { __typename: 'MeldingTilNAV'; bistandUmiddelbart: boolean; beskrivBistand: string | null } | null
    medisinskVurdering: {
        __typename: 'MedisinskVurdering'
        svangerskap: boolean
        yrkesskade: boolean
        yrkesskadeDato: string | null
        hovedDiagnose: {
            __typename: 'DiagnoseSchema'
            kode: string | null
            tekst: string | null
            system: string | null
        } | null
        biDiagnoser: Array<{
            __typename: 'DiagnoseSchema'
            kode: string | null
            tekst: string | null
            system: string | null
        }>
        annenFraversArsak: {
            __typename: 'AnnenFraversArsak'
            beskrivelse: string | null
            grunn: Array<Types.AnnenFraversArsakGrunn> | null
        } | null
    } | null
    kontaktMedPasient: {
        __typename: 'KontaktMedPasient'
        kontaktDato: string | null
        begrunnelseIkkeKontakt: string | null
    } | null
}

export type NasjonalDocumentFragment = { __typename: 'Document'; dokumentInfoId: string; tittel: string }

export type KontaktMedPasientFragment = {
    __typename: 'KontaktMedPasient'
    kontaktDato: string | null
    begrunnelseIkkeKontakt: string | null
}

export type NasjonalDiagnoseFragment = {
    __typename: 'DiagnoseSchema'
    kode: string | null
    tekst: string | null
    system: string | null
}

export type MeldingTilNavFragment = {
    __typename: 'MeldingTilNAV'
    bistandUmiddelbart: boolean
    beskrivBistand: string | null
}

export type MedisinskVurderingFragment = {
    __typename: 'MedisinskVurdering'
    svangerskap: boolean
    yrkesskade: boolean
    yrkesskadeDato: string | null
    hovedDiagnose: {
        __typename: 'DiagnoseSchema'
        kode: string | null
        tekst: string | null
        system: string | null
    } | null
    biDiagnoser: Array<{
        __typename: 'DiagnoseSchema'
        kode: string | null
        tekst: string | null
        system: string | null
    }>
    annenFraversArsak: {
        __typename: 'AnnenFraversArsak'
        beskrivelse: string | null
        grunn: Array<Types.AnnenFraversArsakGrunn> | null
    } | null
}

export type AnnenFraversArsakFragment = {
    __typename: 'AnnenFraversArsak'
    beskrivelse: string | null
    grunn: Array<Types.AnnenFraversArsakGrunn> | null
}

export type NasjonalPeriodeFragment = {
    __typename: 'Periode'
    fom: string
    tom: string
    reisetilskudd: boolean | null
    behandlingsdager: number | null
    avventendeInnspillTilArbeidsgiver: string | null
    gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
    aktivitetIkkeMulig: {
        __typename: 'AktivitetIkkeMulig'
        medisinskArsak: {
            __typename: 'MedisinskArsak'
            beskrivelse: string | null
            arsak: Array<Types.MedisinskArsakType>
        } | null
        arbeidsrelatertArsak: {
            __typename: 'ArbeidsrelatertArsak'
            beskrivelse: string | null
            arsak: Array<Types.ArbeidsrelatertArsakType>
        } | null
    } | null
}

export type GradertFragment = { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean }

export type AktivitetIkkeMuligFragment = {
    __typename: 'AktivitetIkkeMulig'
    medisinskArsak: {
        __typename: 'MedisinskArsak'
        beskrivelse: string | null
        arsak: Array<Types.MedisinskArsakType>
    } | null
    arbeidsrelatertArsak: {
        __typename: 'ArbeidsrelatertArsak'
        beskrivelse: string | null
        arsak: Array<Types.ArbeidsrelatertArsakType>
    } | null
}

export type MedisinskArsakFragment = {
    __typename: 'MedisinskArsak'
    beskrivelse: string | null
    arsak: Array<Types.MedisinskArsakType>
}

export type ArbeidsrelatertArsakFragment = {
    __typename: 'ArbeidsrelatertArsak'
    beskrivelse: string | null
    arsak: Array<Types.ArbeidsrelatertArsakType>
}

export type ArbeidsgiverFragment = {
    __typename: 'Arbeidsgiver'
    navn: string | null
    stillingsprosent: number | null
    yrkesbetegnelse: string | null
    harArbeidsgiver: Types.HarArbeidsgiver | null
}

export type BehandlerFragment = {
    __typename: 'Behandler'
    fornavn: string
    mellomnavn: string | null
    etternavn: string
    fnr: string
    hpr: string | null
    tlf: string | null
}

export type NasjonalOppgaveByIdQueryVariables = Exact<{
    oppgaveId: string
}>

export type NasjonalOppgaveByIdQuery = {
    __typename: 'Query'
    nasjonalOppgave:
        | {
              __typename: 'NasjonalOppgave'
              oppgaveId: string
              documents: Array<{ __typename: 'Document'; dokumentInfoId: string; tittel: string }>
              nasjonalSykmelding: {
                  __typename: 'NasjonalSykmelding'
                  sykmeldingId: string | null
                  fnr: string | null
                  journalpostId: string
                  datoOpprettet: string | null
                  syketilfelleStartDato: string | null
                  behandletTidspunkt: string | null
                  skjermesForPasient: boolean | null
                  meldingTilArbeidsgiver: string | null
                  harUtdypendeOpplysninger: boolean | null
                  arbeidsgiver: {
                      __typename: 'Arbeidsgiver'
                      navn: string | null
                      stillingsprosent: number | null
                      yrkesbetegnelse: string | null
                      harArbeidsgiver: Types.HarArbeidsgiver | null
                  } | null
                  behandler: {
                      __typename: 'Behandler'
                      fornavn: string
                      mellomnavn: string | null
                      etternavn: string
                      fnr: string
                      hpr: string | null
                      tlf: string | null
                  } | null
                  perioder: Array<{
                      __typename: 'Periode'
                      fom: string
                      tom: string
                      reisetilskudd: boolean | null
                      behandlingsdager: number | null
                      avventendeInnspillTilArbeidsgiver: string | null
                      gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
                      aktivitetIkkeMulig: {
                          __typename: 'AktivitetIkkeMulig'
                          medisinskArsak: {
                              __typename: 'MedisinskArsak'
                              beskrivelse: string | null
                              arsak: Array<Types.MedisinskArsakType>
                          } | null
                          arbeidsrelatertArsak: {
                              __typename: 'ArbeidsrelatertArsak'
                              beskrivelse: string | null
                              arsak: Array<Types.ArbeidsrelatertArsakType>
                          } | null
                      } | null
                  }>
                  meldingTilNAV: {
                      __typename: 'MeldingTilNAV'
                      bistandUmiddelbart: boolean
                      beskrivBistand: string | null
                  } | null
                  medisinskVurdering: {
                      __typename: 'MedisinskVurdering'
                      svangerskap: boolean
                      yrkesskade: boolean
                      yrkesskadeDato: string | null
                      hovedDiagnose: {
                          __typename: 'DiagnoseSchema'
                          kode: string | null
                          tekst: string | null
                          system: string | null
                      } | null
                      biDiagnoser: Array<{
                          __typename: 'DiagnoseSchema'
                          kode: string | null
                          tekst: string | null
                          system: string | null
                      }>
                      annenFraversArsak: {
                          __typename: 'AnnenFraversArsak'
                          beskrivelse: string | null
                          grunn: Array<Types.AnnenFraversArsakGrunn> | null
                      } | null
                  } | null
                  kontaktMedPasient: {
                      __typename: 'KontaktMedPasient'
                      kontaktDato: string | null
                      begrunnelseIkkeKontakt: string | null
                  } | null
              }
          }
        | { __typename: 'NasjonalOppgaveStatus'; oppgaveId: string; status: Types.NasjonalOppgaveStatusEnum }
        | null
}

export type NasjonalFerdigstiltOppgaveBySykmeldingIdQueryVariables = Exact<{
    sykmeldingId: string
}>

export type NasjonalFerdigstiltOppgaveBySykmeldingIdQuery = {
    __typename: 'Query'
    nasjonalFerdigstiltOppgave:
        | {
              __typename: 'NasjonalOppgave'
              oppgaveId: string
              documents: Array<{ __typename: 'Document'; dokumentInfoId: string; tittel: string }>
              nasjonalSykmelding: {
                  __typename: 'NasjonalSykmelding'
                  sykmeldingId: string | null
                  fnr: string | null
                  journalpostId: string
                  datoOpprettet: string | null
                  syketilfelleStartDato: string | null
                  behandletTidspunkt: string | null
                  skjermesForPasient: boolean | null
                  meldingTilArbeidsgiver: string | null
                  harUtdypendeOpplysninger: boolean | null
                  arbeidsgiver: {
                      __typename: 'Arbeidsgiver'
                      navn: string | null
                      stillingsprosent: number | null
                      yrkesbetegnelse: string | null
                      harArbeidsgiver: Types.HarArbeidsgiver | null
                  } | null
                  behandler: {
                      __typename: 'Behandler'
                      fornavn: string
                      mellomnavn: string | null
                      etternavn: string
                      fnr: string
                      hpr: string | null
                      tlf: string | null
                  } | null
                  perioder: Array<{
                      __typename: 'Periode'
                      fom: string
                      tom: string
                      reisetilskudd: boolean | null
                      behandlingsdager: number | null
                      avventendeInnspillTilArbeidsgiver: string | null
                      gradert: { __typename: 'Gradert'; grad: number | null; reisetilskudd: boolean } | null
                      aktivitetIkkeMulig: {
                          __typename: 'AktivitetIkkeMulig'
                          medisinskArsak: {
                              __typename: 'MedisinskArsak'
                              beskrivelse: string | null
                              arsak: Array<Types.MedisinskArsakType>
                          } | null
                          arbeidsrelatertArsak: {
                              __typename: 'ArbeidsrelatertArsak'
                              beskrivelse: string | null
                              arsak: Array<Types.ArbeidsrelatertArsakType>
                          } | null
                      } | null
                  }>
                  meldingTilNAV: {
                      __typename: 'MeldingTilNAV'
                      bistandUmiddelbart: boolean
                      beskrivBistand: string | null
                  } | null
                  medisinskVurdering: {
                      __typename: 'MedisinskVurdering'
                      svangerskap: boolean
                      yrkesskade: boolean
                      yrkesskadeDato: string | null
                      hovedDiagnose: {
                          __typename: 'DiagnoseSchema'
                          kode: string | null
                          tekst: string | null
                          system: string | null
                      } | null
                      biDiagnoser: Array<{
                          __typename: 'DiagnoseSchema'
                          kode: string | null
                          tekst: string | null
                          system: string | null
                      }>
                      annenFraversArsak: {
                          __typename: 'AnnenFraversArsak'
                          beskrivelse: string | null
                          grunn: Array<Types.AnnenFraversArsakGrunn> | null
                      } | null
                  } | null
                  kontaktMedPasient: {
                      __typename: 'KontaktMedPasient'
                      kontaktDato: string | null
                      begrunnelseIkkeKontakt: string | null
                  } | null
              }
          }
        | {
              __typename: 'NasjonalSykmeldingStatus'
              sykmeldingId: string
              status: Types.NasjonalOppdatertSykmeldingStatusEnum
          }
        | null
}

export type PasientQueryVariables = Exact<{ [key: string]: never }>

export type PasientQuery = {
    __typename: 'Query'
    pasientNavn: { __typename: 'Navn'; fornavn: string; mellomnavn: string | null; etternavn: string } | null
}

export type NavnFragment = { __typename: 'Navn'; fornavn: string; mellomnavn: string | null; etternavn: string }

export type SykmelderQueryVariables = Exact<{
    hprNummer: string
}>

export type SykmelderQuery = {
    __typename: 'Query'
    sykmelder: {
        __typename: 'Sykmelder'
        hprNummer: string | null
        aktorId: string | null
        fnr: string | null
        fornavn: string | null
        mellomnavn: string | null
        etternavn: string | null
        godkjenninger: Array<{
            __typename: 'Godkjenning'
            autorisasjon: { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null } | null
            helsepersonellkategori: { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null } | null
        }> | null
    } | null
}

export type SykmelderFragment = {
    __typename: 'Sykmelder'
    hprNummer: string | null
    aktorId: string | null
    fnr: string | null
    fornavn: string | null
    mellomnavn: string | null
    etternavn: string | null
    godkjenninger: Array<{
        __typename: 'Godkjenning'
        autorisasjon: { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null } | null
        helsepersonellkategori: { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null } | null
    }> | null
}

export type GodkjenningFragment = {
    __typename: 'Godkjenning'
    autorisasjon: { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null } | null
    helsepersonellkategori: { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null } | null
}

export type KodeFragment = { __typename: 'Kode'; aktiv: boolean; oid: number; verdi: string | null }

export type PeriodeFragment = {
    __typename: 'PeriodeValue'
    fom: string
    tom: string
    type: Types.PeriodeType
    grad: number | null
}

export type DiagnoseFragment = { __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string }

export type OppgaveValuesFragment = {
    __typename: 'OppgaveValues'
    fnrPasient: string
    behandletTidspunkt: string | null
    skrevetLand: string | null
    folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
    erAdresseUtland: boolean | null
    perioder: Array<{
        __typename: 'PeriodeValue'
        fom: string
        tom: string
        type: Types.PeriodeType
        grad: number | null
    }> | null
    hoveddiagnose: { __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string } | null
    biDiagnoser: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string }> | null
}

export type SykmeldingFragment = {
    __typename: 'DigitalisertSykmelding'
    sykmeldingId: string
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
    person: {
        __typename: 'Person'
        navn: string | null
        bostedsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'UkjentBosted'; bostedskommune: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
        oppholdsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'OppholdAnnetSted'; type: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
    }
    values: {
        __typename: 'OppgaveValues'
        fnrPasient: string
        behandletTidspunkt: string | null
        skrevetLand: string | null
        folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
        erAdresseUtland: boolean | null
        perioder: Array<{
            __typename: 'PeriodeValue'
            fom: string
            tom: string
            type: Types.PeriodeType
            grad: number | null
        }> | null
        hoveddiagnose: { __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string } | null
        biDiagnoser: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string }> | null
    }
}

export type OppgaveFragment = {
    __typename: 'Digitaliseringsoppgave'
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
    person: {
        __typename: 'Person'
        navn: string | null
        bostedsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'UkjentBosted'; bostedskommune: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
        oppholdsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'OppholdAnnetSted'; type: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
    }
    values: {
        __typename: 'OppgaveValues'
        fnrPasient: string
        behandletTidspunkt: string | null
        skrevetLand: string | null
        folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
        erAdresseUtland: boolean | null
        perioder: Array<{
            __typename: 'PeriodeValue'
            fom: string
            tom: string
            type: Types.PeriodeType
            grad: number | null
        }> | null
        hoveddiagnose: { __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string } | null
        biDiagnoser: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string }> | null
    }
}

export type Bostedsadresse_Matrikkeladresse_Fragment = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer: string | null
    postnummer: string | null
    poststed: string | null
    tilleggsnavn: string | null
}

export type Bostedsadresse_UkjentBosted_Fragment = { __typename: 'UkjentBosted'; bostedskommune: string | null }

export type Bostedsadresse_UtenlandskAdresse_Fragment = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer: string | null
    bySted: string | null
    landkode: string
    postboksNummerNavn: string | null
    postkode: string | null
}

export type Bostedsadresse_Vegadresse_Fragment = {
    __typename: 'Vegadresse'
    adressenavn: string | null
    husbokstav: string | null
    husnummer: string | null
    postnummer: string | null
    poststed: string | null
}

export type BostedsadresseFragment =
    | Bostedsadresse_Matrikkeladresse_Fragment
    | Bostedsadresse_UkjentBosted_Fragment
    | Bostedsadresse_UtenlandskAdresse_Fragment
    | Bostedsadresse_Vegadresse_Fragment

export type Oppholdsadresse_Matrikkeladresse_Fragment = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer: string | null
    postnummer: string | null
    poststed: string | null
    tilleggsnavn: string | null
}

export type Oppholdsadresse_OppholdAnnetSted_Fragment = { __typename: 'OppholdAnnetSted'; type: string | null }

export type Oppholdsadresse_UtenlandskAdresse_Fragment = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer: string | null
    bySted: string | null
    landkode: string
    postboksNummerNavn: string | null
    postkode: string | null
}

export type Oppholdsadresse_Vegadresse_Fragment = {
    __typename: 'Vegadresse'
    adressenavn: string | null
    husbokstav: string | null
    husnummer: string | null
    postnummer: string | null
    poststed: string | null
}

export type OppholdsadresseFragment =
    | Oppholdsadresse_Matrikkeladresse_Fragment
    | Oppholdsadresse_OppholdAnnetSted_Fragment
    | Oppholdsadresse_UtenlandskAdresse_Fragment
    | Oppholdsadresse_Vegadresse_Fragment

export type MatrikkeladresseFragment = {
    __typename: 'Matrikkeladresse'
    bruksenhetsnummer: string | null
    postnummer: string | null
    poststed: string | null
    tilleggsnavn: string | null
}

export type UkjentBostedFragment = { __typename: 'UkjentBosted'; bostedskommune: string | null }

export type UtenlandskAdresseFragment = {
    __typename: 'UtenlandskAdresse'
    adressenavnNummer: string | null
    bySted: string | null
    landkode: string
    postboksNummerNavn: string | null
    postkode: string | null
}

export type VegadresseFragment = {
    __typename: 'Vegadresse'
    adressenavn: string | null
    husbokstav: string | null
    husnummer: string | null
    postnummer: string | null
    poststed: string | null
}

export type OppholdAnnetFragment = { __typename: 'OppholdAnnetSted'; type: string | null }

export type DigitaliseringsoppgaveStatusFragment = {
    __typename: 'DigitaliseringsoppgaveStatus'
    oppgaveId: string
    status: Types.DigitaliseringsoppgaveStatusEnum
}

export type OppdatertSykmeldingStatusFragment = {
    __typename: 'OppdatertSykmeldingStatus'
    sykmeldingId: string
    status: Types.OppdatertSykmeldingStatusEnum | null
}

export type DigitaliseringOppgaveResult_Digitaliseringsoppgave_Fragment = {
    __typename: 'Digitaliseringsoppgave'
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
    person: {
        __typename: 'Person'
        navn: string | null
        bostedsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'UkjentBosted'; bostedskommune: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
        oppholdsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'OppholdAnnetSted'; type: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
    }
    values: {
        __typename: 'OppgaveValues'
        fnrPasient: string
        behandletTidspunkt: string | null
        skrevetLand: string | null
        folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
        erAdresseUtland: boolean | null
        perioder: Array<{
            __typename: 'PeriodeValue'
            fom: string
            tom: string
            type: Types.PeriodeType
            grad: number | null
        }> | null
        hoveddiagnose: { __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string } | null
        biDiagnoser: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string }> | null
    }
}

export type DigitaliseringOppgaveResult_DigitaliseringsoppgaveStatus_Fragment = {
    __typename: 'DigitaliseringsoppgaveStatus'
    oppgaveId: string
    status: Types.DigitaliseringsoppgaveStatusEnum
}

export type DigitaliseringOppgaveResultFragment =
    | DigitaliseringOppgaveResult_Digitaliseringsoppgave_Fragment
    | DigitaliseringOppgaveResult_DigitaliseringsoppgaveStatus_Fragment

export type DigitalisertSykmeldingResult_DigitalisertSykmelding_Fragment = {
    __typename: 'DigitalisertSykmelding'
    sykmeldingId: string
    oppgaveId: string
    documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
    person: {
        __typename: 'Person'
        navn: string | null
        bostedsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'UkjentBosted'; bostedskommune: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
        oppholdsadresse:
            | {
                  __typename: 'Matrikkeladresse'
                  bruksenhetsnummer: string | null
                  postnummer: string | null
                  poststed: string | null
                  tilleggsnavn: string | null
              }
            | { __typename: 'OppholdAnnetSted'; type: string | null }
            | {
                  __typename: 'UtenlandskAdresse'
                  adressenavnNummer: string | null
                  bySted: string | null
                  landkode: string
                  postboksNummerNavn: string | null
                  postkode: string | null
              }
            | {
                  __typename: 'Vegadresse'
                  adressenavn: string | null
                  husbokstav: string | null
                  husnummer: string | null
                  postnummer: string | null
                  poststed: string | null
              }
            | null
    }
    values: {
        __typename: 'OppgaveValues'
        fnrPasient: string
        behandletTidspunkt: string | null
        skrevetLand: string | null
        folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
        erAdresseUtland: boolean | null
        perioder: Array<{
            __typename: 'PeriodeValue'
            fom: string
            tom: string
            type: Types.PeriodeType
            grad: number | null
        }> | null
        hoveddiagnose: { __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string } | null
        biDiagnoser: Array<{ __typename: 'DiagnoseValue'; kode: string; tekst: string | null; system: string }> | null
    }
}

export type DigitalisertSykmeldingResult_OppdatertSykmeldingStatus_Fragment = {
    __typename: 'OppdatertSykmeldingStatus'
    sykmeldingId: string
    status: Types.OppdatertSykmeldingStatusEnum | null
}

export type DigitalisertSykmeldingResultFragment =
    | DigitalisertSykmeldingResult_DigitalisertSykmelding_Fragment
    | DigitalisertSykmeldingResult_OppdatertSykmeldingStatus_Fragment

export type DocumentFragment = { __typename: 'Document'; tittel: string; dokumentInfoId: string }

export type OppgaveByIdQueryVariables = Exact<{
    oppgaveId: string
}>

export type OppgaveByIdQuery = {
    __typename: 'Query'
    oppgave:
        | {
              __typename: 'Digitaliseringsoppgave'
              oppgaveId: string
              documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
              person: {
                  __typename: 'Person'
                  navn: string | null
                  bostedsadresse:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                            tilleggsnavn: string | null
                        }
                      | { __typename: 'UkjentBosted'; bostedskommune: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer: string | null
                            bySted: string | null
                            landkode: string
                            postboksNummerNavn: string | null
                            postkode: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn: string | null
                            husbokstav: string | null
                            husnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                        }
                      | null
                  oppholdsadresse:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                            tilleggsnavn: string | null
                        }
                      | { __typename: 'OppholdAnnetSted'; type: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer: string | null
                            bySted: string | null
                            landkode: string
                            postboksNummerNavn: string | null
                            postkode: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn: string | null
                            husbokstav: string | null
                            husnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                        }
                      | null
              }
              values: {
                  __typename: 'OppgaveValues'
                  fnrPasient: string
                  behandletTidspunkt: string | null
                  skrevetLand: string | null
                  folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
                  erAdresseUtland: boolean | null
                  perioder: Array<{
                      __typename: 'PeriodeValue'
                      fom: string
                      tom: string
                      type: Types.PeriodeType
                      grad: number | null
                  }> | null
                  hoveddiagnose: {
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst: string | null
                      system: string
                  } | null
                  biDiagnoser: Array<{
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst: string | null
                      system: string
                  }> | null
              }
          }
        | {
              __typename: 'DigitaliseringsoppgaveStatus'
              oppgaveId: string
              status: Types.DigitaliseringsoppgaveStatusEnum
          }
        | null
}

export type SykmeldingByIdQueryVariables = Exact<{
    sykmeldingId: string
}>

export type SykmeldingByIdQuery = {
    __typename: 'Query'
    digitalisertSykmelding:
        | {
              __typename: 'DigitalisertSykmelding'
              sykmeldingId: string
              oppgaveId: string
              documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
              person: {
                  __typename: 'Person'
                  navn: string | null
                  bostedsadresse:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                            tilleggsnavn: string | null
                        }
                      | { __typename: 'UkjentBosted'; bostedskommune: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer: string | null
                            bySted: string | null
                            landkode: string
                            postboksNummerNavn: string | null
                            postkode: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn: string | null
                            husbokstav: string | null
                            husnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                        }
                      | null
                  oppholdsadresse:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                            tilleggsnavn: string | null
                        }
                      | { __typename: 'OppholdAnnetSted'; type: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer: string | null
                            bySted: string | null
                            landkode: string
                            postboksNummerNavn: string | null
                            postkode: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn: string | null
                            husbokstav: string | null
                            husnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                        }
                      | null
              }
              values: {
                  __typename: 'OppgaveValues'
                  fnrPasient: string
                  behandletTidspunkt: string | null
                  skrevetLand: string | null
                  folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
                  erAdresseUtland: boolean | null
                  perioder: Array<{
                      __typename: 'PeriodeValue'
                      fom: string
                      tom: string
                      type: Types.PeriodeType
                      grad: number | null
                  }> | null
                  hoveddiagnose: {
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst: string | null
                      system: string
                  } | null
                  biDiagnoser: Array<{
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst: string | null
                      system: string
                  }> | null
              }
          }
        | {
              __typename: 'OppdatertSykmeldingStatus'
              sykmeldingId: string
              status: Types.OppdatertSykmeldingStatusEnum | null
          }
        | null
}

export type SaveOppgaveNasjonalMutationVariables = Exact<{
    oppgaveId: string
    sykmeldingValues: Types.NasjonalSykmeldingValues
    sykmeldingStatus: Types.SykmeldingUnderArbeidStatus
    navEnhet: string
}>

export type SaveOppgaveNasjonalMutation = {
    __typename: 'Mutation'
    lagreNasjonalOppgave:
        | { __typename: 'LagreNasjonalOppgaveStatus'; oppgaveId: string; status: Types.LagreNasjonalOppgaveStatusEnum }
        | {
              __typename: 'ValidationResult'
              validationStatus: Types.Status
              ruleHits: Array<{
                  __typename: 'RuleInfo'
                  messageForSender: string
                  messageForUser: string
                  ruleName: string
                  ruleStatus: Types.Status
              }>
          }
        | null
}

export type LagreNasjonalOppgaveStatusFragment = {
    __typename: 'LagreNasjonalOppgaveStatus'
    oppgaveId: string
    status: Types.LagreNasjonalOppgaveStatusEnum
}

export type LagreOppgaveResult_LagreNasjonalOppgaveStatus_Fragment = {
    __typename: 'LagreNasjonalOppgaveStatus'
    oppgaveId: string
    status: Types.LagreNasjonalOppgaveStatusEnum
}

export type LagreOppgaveResult_ValidationResult_Fragment = {
    __typename: 'ValidationResult'
    validationStatus: Types.Status
    ruleHits: Array<{
        __typename: 'RuleInfo'
        messageForSender: string
        messageForUser: string
        ruleName: string
        ruleStatus: Types.Status
    }>
}

export type LagreOppgaveResultFragment =
    | LagreOppgaveResult_LagreNasjonalOppgaveStatus_Fragment
    | LagreOppgaveResult_ValidationResult_Fragment

export type TilbakeTilGosysNasjonalMutationVariables = Exact<{
    oppgaveId: string
    navEnhet?: string | null | undefined
}>

export type TilbakeTilGosysNasjonalMutation = {
    __typename: 'Mutation'
    oppgaveTilbakeTilGosysNasjonal: {
        __typename: 'LagreNasjonalOppgaveStatus'
        oppgaveId: string
        status: Types.LagreNasjonalOppgaveStatusEnum
    } | null
}

export type AvvisNasjonalOppgaveMutationVariables = Exact<{
    oppgaveId: string
    avvisningsgrunn?: string | null | undefined
    navEnhet: string
}>

export type AvvisNasjonalOppgaveMutation = {
    __typename: 'Mutation'
    avvisNasjonalOppgave: {
        __typename: 'LagreNasjonalOppgaveStatus'
        oppgaveId: string
        status: Types.LagreNasjonalOppgaveStatusEnum
    } | null
}

export type SaveOppgaveMutationVariables = Exact<{
    id: string
    values: Types.SykmeldingUnderArbeidValues
    status: Types.SykmeldingUnderArbeidStatus
    enhetId: string
}>

export type SaveOppgaveMutation = {
    __typename: 'Mutation'
    lagre:
        | {
              __typename: 'Digitaliseringsoppgave'
              oppgaveId: string
              documents: Array<{ __typename: 'Document'; tittel: string; dokumentInfoId: string }>
              person: {
                  __typename: 'Person'
                  navn: string | null
                  bostedsadresse:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                            tilleggsnavn: string | null
                        }
                      | { __typename: 'UkjentBosted'; bostedskommune: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer: string | null
                            bySted: string | null
                            landkode: string
                            postboksNummerNavn: string | null
                            postkode: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn: string | null
                            husbokstav: string | null
                            husnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                        }
                      | null
                  oppholdsadresse:
                      | {
                            __typename: 'Matrikkeladresse'
                            bruksenhetsnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                            tilleggsnavn: string | null
                        }
                      | { __typename: 'OppholdAnnetSted'; type: string | null }
                      | {
                            __typename: 'UtenlandskAdresse'
                            adressenavnNummer: string | null
                            bySted: string | null
                            landkode: string
                            postboksNummerNavn: string | null
                            postkode: string | null
                        }
                      | {
                            __typename: 'Vegadresse'
                            adressenavn: string | null
                            husbokstav: string | null
                            husnummer: string | null
                            postnummer: string | null
                            poststed: string | null
                        }
                      | null
              }
              values: {
                  __typename: 'OppgaveValues'
                  fnrPasient: string
                  behandletTidspunkt: string | null
                  skrevetLand: string | null
                  folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean | null
                  erAdresseUtland: boolean | null
                  perioder: Array<{
                      __typename: 'PeriodeValue'
                      fom: string
                      tom: string
                      type: Types.PeriodeType
                      grad: number | null
                  }> | null
                  hoveddiagnose: {
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst: string | null
                      system: string
                  } | null
                  biDiagnoser: Array<{
                      __typename: 'DiagnoseValue'
                      kode: string
                      tekst: string | null
                      system: string
                  }> | null
              }
          }
        | {
              __typename: 'DigitaliseringsoppgaveStatus'
              oppgaveId: string
              status: Types.DigitaliseringsoppgaveStatusEnum
          }
        | null
}

export type TilbakeTilGosysMutationVariables = Exact<{
    oppgaveId: string
    navEnhet?: string | null | undefined
}>

export type TilbakeTilGosysMutation = {
    __typename: 'Mutation'
    oppgaveTilbakeTilGosys: {
        __typename: 'DigitaliseringsoppgaveStatus'
        oppgaveId: string
        status: Types.DigitaliseringsoppgaveStatusEnum
    } | null
}

export type AvvisOppgaveMutationVariables = Exact<{
    oppgaveId: string
    enhetId: string
    avvisningsgrunn: Types.Avvisingsgrunn
    avvisningsgrunnAnnet?: string | null | undefined
}>

export type AvvisOppgaveMutation = {
    __typename: 'Mutation'
    avvis: {
        __typename: 'DigitaliseringsoppgaveStatus'
        oppgaveId: string
        status: Types.DigitaliseringsoppgaveStatusEnum
    } | null
}

export type NavngiDokumentMutationVariables = Exact<{
    oppgaveId: string
    dokumentInfoId: string
    tittel: string
}>

export type NavngiDokumentMutation = {
    __typename: 'Mutation'
    dokument: { __typename: 'Document'; tittel: string; dokumentInfoId: string } | null
}

export type UpdateDigitalisertSykmeldingMutationVariables = Exact<{
    sykmeldingId: string
    enhetId: string
    values: Types.SykmeldingUnderArbeidValues
}>

export type UpdateDigitalisertSykmeldingMutation = {
    __typename: 'Mutation'
    oppdaterDigitalisertSykmelding: {
        __typename: 'OppdatertSykmeldingStatus'
        sykmeldingId: string
        status: Types.OppdatertSykmeldingStatusEnum | null
    } | null
}

export type ValidationResultFragment = {
    __typename: 'ValidationResult'
    validationStatus: Types.Status
    ruleHits: Array<{
        __typename: 'RuleInfo'
        messageForSender: string
        messageForUser: string
        ruleName: string
        ruleStatus: Types.Status
    }>
}

export type RuleInfoFragment = {
    __typename: 'RuleInfo'
    messageForSender: string
    messageForUser: string
    ruleName: string
    ruleStatus: Types.Status
}

export const JournalpostFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Journalpost' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Journalpost' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalstatus' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dokumenter' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<JournalpostFragment, unknown>
export const JournalpostStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'JournalpostStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JournalpostStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<JournalpostStatusFragment, unknown>
export const NasjonalDocumentFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDocument' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalDocumentFragment, unknown>
export const ArbeidsgiverFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ArbeidsgiverFragment, unknown>
export const BehandlerFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<BehandlerFragment, unknown>
export const GradertFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GradertFragment, unknown>
export const MedisinskArsakFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MedisinskArsakFragment, unknown>
export const ArbeidsrelatertArsakFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ArbeidsrelatertArsakFragment, unknown>
export const AktivitetIkkeMuligFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AktivitetIkkeMuligFragment, unknown>
export const NasjonalPeriodeFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalPeriodeFragment, unknown>
export const MeldingTilNavFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MeldingTilNavFragment, unknown>
export const NasjonalDiagnoseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalDiagnoseFragment, unknown>
export const AnnenFraversArsakFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AnnenFraversArsakFragment, unknown>
export const MedisinskVurderingFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MedisinskVurderingFragment, unknown>
export const KontaktMedPasientFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<KontaktMedPasientFragment, unknown>
export const NasjonalSykmeldingFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'datoOpprettet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'syketilfelleStartDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Arbeidsgiver' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Behandler' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'skjermesForPasient' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalPeriode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MeldingTilNAV' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'KontaktMedPasient' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'harUtdypendeOpplysninger' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalSykmeldingFragment, unknown>
export const NasjonalOppgaveFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDocument' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDocument' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'datoOpprettet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'syketilfelleStartDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Arbeidsgiver' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Behandler' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'skjermesForPasient' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalPeriode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MeldingTilNAV' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'KontaktMedPasient' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'harUtdypendeOpplysninger' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalOppgaveFragment, unknown>
export const NasjonalOppgaveStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalOppgaveStatusFragment, unknown>
export const NasjonalOppgaveResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgaveStatus' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDocument' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'datoOpprettet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'syketilfelleStartDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Arbeidsgiver' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Behandler' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'skjermesForPasient' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalPeriode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MeldingTilNAV' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'KontaktMedPasient' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'harUtdypendeOpplysninger' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDocument' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalOppgaveResultFragment, unknown>
export const NasjonalSykmeldingStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalSykmeldingStatusFragment, unknown>
export const NasjonalSykmeldingResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmeldingResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmeldingResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDocument' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'datoOpprettet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'syketilfelleStartDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Arbeidsgiver' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Behandler' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'skjermesForPasient' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalPeriode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MeldingTilNAV' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'KontaktMedPasient' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'harUtdypendeOpplysninger' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDocument' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalSykmeldingResultFragment, unknown>
export const NavnFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Navn' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Navn' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NavnFragment, unknown>
export const KodeFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Kode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Kode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'aktiv' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'verdi' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<KodeFragment, unknown>
export const GodkjenningFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Godkjenning' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Godkjenning' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'autorisasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Kode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'helsepersonellkategori' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Kode' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Kode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Kode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'aktiv' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'verdi' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GodkjenningFragment, unknown>
export const SykmelderFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelder' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelder' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'hprNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'aktorId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'godkjenninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Godkjenning' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Kode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Kode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'aktiv' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'verdi' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Godkjenning' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Godkjenning' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'autorisasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Kode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'helsepersonellkategori' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Kode' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmelderFragment, unknown>
export const DocumentFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DocumentFragment, unknown>
export const VegadresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<VegadresseFragment, unknown>
export const MatrikkeladresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<MatrikkeladresseFragment, unknown>
export const UtenlandskAdresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UtenlandskAdresseFragment, unknown>
export const UkjentBostedFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
    ],
} as unknown as DocumentNode<UkjentBostedFragment, unknown>
export const BostedsadresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
    ],
} as unknown as DocumentNode<BostedsadresseFragment, unknown>
export const OppholdAnnetFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
    ],
} as unknown as DocumentNode<OppholdAnnetFragment, unknown>
export const OppholdsadresseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
    ],
} as unknown as DocumentNode<OppholdsadresseFragment, unknown>
export const PeriodeFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<PeriodeFragment, unknown>
export const DiagnoseFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DiagnoseFragment, unknown>
export const OppgaveValuesFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveValuesFragment, unknown>
export const OppgaveFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Digitaliseringsoppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveFragment, unknown>
export const DigitaliseringsoppgaveStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DigitaliseringsoppgaveStatusFragment, unknown>
export const DigitaliseringOppgaveResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Oppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Digitaliseringsoppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DigitaliseringOppgaveResultFragment, unknown>
export const SykmeldingFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitalisertSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingFragment, unknown>
export const OppdatertSykmeldingStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppdatertSykmeldingStatusFragment, unknown>
export const DigitalisertSykmeldingResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitalisertSykmeldingResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitalisertSykmeldingResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitalisertSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<DigitalisertSykmeldingResultFragment, unknown>
export const LagreNasjonalOppgaveStatusFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<LagreNasjonalOppgaveStatusFragment, unknown>
export const RuleInfoFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'RuleInfo' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RuleInfo' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<RuleInfoFragment, unknown>
export const ValidationResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ValidationResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ValidationResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'validationStatus' },
                        name: { kind: 'Name', value: 'status' },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ruleHits' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'RuleInfo' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'RuleInfo' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RuleInfo' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<ValidationResultFragment, unknown>
export const LagreOppgaveResultFragmentDoc = {
    kind: 'Document',
    definitions: [
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreOppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ValidationResult' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'RuleInfo' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RuleInfo' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ValidationResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ValidationResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'validationStatus' },
                        name: { kind: 'Name', value: 'status' },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ruleHits' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'RuleInfo' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<LagreOppgaveResultFragment, unknown>
export const JournalpostByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'JournalpostById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'journalpost' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Journalpost' } },
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'JournalpostStatus' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Journalpost' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Journalpost' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalstatus' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dokumenter' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'JournalpostStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JournalpostStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<JournalpostByIdQuery, JournalpostByIdQueryVariables>
export const SykmeldingFraJournalpostDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SykmeldingFraJournalpost' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'norsk' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmeldingFraJournalpost' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'journalpostId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'norsk' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'norsk' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'navEnhet' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'JournalpostStatus' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'JournalpostStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'JournalpostStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingFraJournalpostMutation, SykmeldingFraJournalpostMutationVariables>
export const NasjonalOppgaveByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'NasjonalOppgaveById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalOppgave' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgaveResult' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDocument' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'datoOpprettet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'syketilfelleStartDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Arbeidsgiver' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Behandler' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'skjermesForPasient' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalPeriode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MeldingTilNAV' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'KontaktMedPasient' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'harUtdypendeOpplysninger' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDocument' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgaveStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NasjonalOppgaveByIdQuery, NasjonalOppgaveByIdQueryVariables>
export const NasjonalFerdigstiltOppgaveBySykmeldingIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'NasjonalFerdigstiltOppgaveBySykmeldingId' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalFerdigstiltOppgave' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmeldingResult' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDocument' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Arbeidsgiver' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Arbeidsgiver' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'stillingsprosent' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesbetegnelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'harArbeidsgiver' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Behandler' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Behandler' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'hpr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tlf' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Gradert' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Gradert' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ArbeidsrelatertArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'arsak' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AktivitetIkkeMulig' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskArsak' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsrelatertArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ArbeidsrelatertArsak' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalPeriode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Periode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'reisetilskudd' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gradert' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Gradert' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandlingsdager' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'avventendeInnspillTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'aktivitetIkkeMulig' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AktivitetIkkeMulig' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MeldingTilNAV' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MeldingTilNAV' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bistandUmiddelbart' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivBistand' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalDiagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseSchema' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'AnnenFraversArsak' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'beskrivelse' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grunn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'MedisinskVurdering' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'MedisinskVurdering' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hovedDiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDiagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'annenFraversArsak' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AnnenFraversArsak' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'svangerskap' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskade' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'yrkesskadeDato' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'KontaktMedPasient' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'KontaktMedPasient' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kontaktDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'begrunnelseIkkeKontakt' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'journalpostId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'datoOpprettet' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'syketilfelleStartDato' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'arbeidsgiver' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Arbeidsgiver' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'behandler' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Behandler' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'skjermesForPasient' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalPeriode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'meldingTilNAV' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'MeldingTilNAV' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'meldingTilArbeidsgiver' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'medisinskVurdering' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MedisinskVurdering' } },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'kontaktMedPasient' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'KontaktMedPasient' } },
                            ],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'harUtdypendeOpplysninger' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalOppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalOppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalDocument' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'nasjonalSykmelding' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmelding' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'NasjonalSykmeldingResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmeldingResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalOppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'NasjonalSykmeldingStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<
    NasjonalFerdigstiltOppgaveBySykmeldingIdQuery,
    NasjonalFerdigstiltOppgaveBySykmeldingIdQueryVariables
>
export const PasientDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Pasient' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pasientNavn' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Navn' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Navn' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Navn' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<PasientQuery, PasientQueryVariables>
export const SykmelderDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'Sykmelder' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'hprNummer' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'sykmelder' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'hprNummer' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'hprNummer' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelder' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Kode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Kode' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'aktiv' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oid' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'verdi' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Godkjenning' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Godkjenning' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'autorisasjon' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Kode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'helsepersonellkategori' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Kode' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelder' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Sykmelder' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'hprNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'aktorId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fnr' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'mellomnavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'etternavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'fornavn' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'godkjenninger' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Godkjenning' } }],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmelderQuery, SykmelderQueryVariables>
export const OppgaveByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'OppgaveById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'oppgave' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Digitaliseringsoppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Oppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<OppgaveByIdQuery, OppgaveByIdQueryVariables>
export const SykmeldingByIdDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'SykmeldingById' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'digitalisertSykmelding' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitalisertSykmeldingResult' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Sykmelding' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitalisertSykmelding' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitalisertSykmeldingResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitalisertSykmeldingResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Sykmelding' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SykmeldingByIdQuery, SykmeldingByIdQueryVariables>
export const SaveOppgaveNasjonalDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SaveOppgaveNasjonal' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingValues' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NasjonalSykmeldingValues' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingStatus' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingUnderArbeidStatus' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lagreNasjonalOppgave' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingValues' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingValues' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingStatus' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'navEnhet' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LagreOppgaveResult' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'RuleInfo' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'RuleInfo' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForSender' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'messageForUser' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleName' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'ruleStatus' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'ValidationResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'ValidationResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'validationStatus' },
                        name: { kind: 'Name', value: 'status' },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ruleHits' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'RuleInfo' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreOppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'ValidationResult' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SaveOppgaveNasjonalMutation, SaveOppgaveNasjonalMutationVariables>
export const TilbakeTilGosysNasjonalDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'TilbakeTilGosysNasjonal' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'oppgaveTilbakeTilGosysNasjonal' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'navEnhet' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TilbakeTilGosysNasjonalMutation, TilbakeTilGosysNasjonalMutationVariables>
export const AvvisNasjonalOppgaveDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AvvisNasjonalOppgave' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'avvisningsgrunn' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avvisNasjonalOppgave' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'avvisningsgrunn' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'avvisningsgrunn' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'navEnhet' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'LagreNasjonalOppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AvvisNasjonalOppgaveMutation, AvvisNasjonalOppgaveMutationVariables>
export const SaveOppgaveDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'SaveOppgave' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingUnderArbeidValues' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingUnderArbeidStatus' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lagre' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'values' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'enhetId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Vegadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husbokstav' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'husnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Matrikkeladresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'bruksenhetsnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postnummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'poststed' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tilleggsnavn' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UtenlandskAdresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'adressenavnNummer' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'bySted' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'landkode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postboksNummerNavn' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'postkode' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'UkjentBosted' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'bostedskommune' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Bostedsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Bostedsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UkjentBosted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'UkjentBosted' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppholdAnnet' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'type' } }],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppholdsadresse' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Oppholdsadresse' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Vegadresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Vegadresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Matrikkeladresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Matrikkeladresse' } }],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'UtenlandskAdresse' } },
                            ],
                        },
                    },
                    {
                        kind: 'InlineFragment',
                        typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppholdAnnetSted' } },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppholdAnnet' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Periode' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'PeriodeValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tom' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'grad' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Diagnose' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DiagnoseValue' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'kode' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'tekst' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'system' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppgaveValues' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppgaveValues' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'fnrPasient' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'behandletTidspunkt' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'skrevetLand' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'perioder' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Periode' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hoveddiagnose' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'biDiagnoser' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Diagnose' } }],
                        },
                    },
                    { kind: 'Field', name: { kind: 'Name', value: 'folkeRegistertAdresseErBrakkeEllerTilsvarende' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'erAdresseUtland' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Oppgave' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Digitaliseringsoppgave' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'documents' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'person' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'navn' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bostedsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Bostedsadresse' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'oppholdsadresse' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            {
                                                kind: 'FragmentSpread',
                                                name: { kind: 'Name', value: 'Oppholdsadresse' },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'values' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppgaveValues' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringOppgaveResult' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveResult' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'Oppgave' } },
                    { kind: 'FragmentSpread', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<SaveOppgaveMutation, SaveOppgaveMutationVariables>
export const TilbakeTilGosysDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'TilbakeTilGosys' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'oppgaveTilbakeTilGosys' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'navEnhet' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'navEnhet' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<TilbakeTilGosysMutation, TilbakeTilGosysMutationVariables>
export const AvvisOppgaveDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AvvisOppgave' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'avvisningsgrunn' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'Avvisingsgrunn' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'avvisningsgrunnAnnet' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avvis' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'enhetId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'avvisningsgrunn' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'avvisningsgrunn' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'avvisningsgrunnAnnet' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'avvisningsgrunnAnnet' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'FragmentSpread',
                                    name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
                                },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'DigitaliseringsoppgaveStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'oppgaveId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AvvisOppgaveMutation, AvvisOppgaveMutationVariables>
export const NavngiDokumentDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NavngiDokument' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'dokumentInfoId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'tittel' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dokument' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'oppgaveId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'oppgaveId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'dokumentInfoId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'dokumentInfoId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'tittel' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'tittel' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Document' } }],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'Document' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Document' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'tittel' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'dokumentInfoId' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NavngiDokumentMutation, NavngiDokumentMutationVariables>
export const UpdateDigitalisertSykmeldingDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateDigitalisertSykmelding' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'SykmeldingUnderArbeidValues' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'oppdaterDigitalisertSykmelding' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'sykmeldingId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'sykmeldingId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'enhetId' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'enhetId' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'values' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'values' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'FragmentSpread', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
                            ],
                        },
                    },
                ],
            },
        },
        {
            kind: 'FragmentDefinition',
            name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' },
            typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'OppdatertSykmeldingStatus' } },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    { kind: 'Field', name: { kind: 'Name', value: 'sykmeldingId' } },
                    { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateDigitalisertSykmeldingMutation, UpdateDigitalisertSykmeldingMutationVariables>
