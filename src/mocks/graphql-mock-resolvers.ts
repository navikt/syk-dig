import { headers } from 'next/headers'
import { GraphQLError } from 'graphql'

import { notNull } from '../utils/tsUtils'

import {
    DiagnoseInput,
    DiagnoseValue,
    InputMaybe,
    LagreNasjonalOppgaveStatus,
    NasjonalOppgave,
    NasjonalOppgaveStatus,
    NasjonalSykmeldingStatus,
    Navn,
    PeriodeInput,
    PeriodeValue,
    Resolvers,
    Sykmelder,
    ValidationResult,
} from './mock-resolvers.generated'

import { mockEngineForSession } from './'

export const mockResolvers: Resolvers = {
    Query: {
        oppgave: async (_, args) => {
            const mock = await mockEngineForSession()
            const oppgave = mock.utenlandsk.getOppgaveOrStatus(args.oppgaveId)

            return oppgave
        },
        digitalisertSykmelding: async (_, args) => {
            const mock = await mockEngineForSession()
            const digitalisertSykmelding = mock.utenlandsk.getDigitalisertSykmelding(args.sykmeldingId)

            return digitalisertSykmelding
        },
        journalpost: (_, args) => {
            switch (args.id) {
                case 'opprettet': {
                    return {
                        __typename: 'JournalpostStatus',
                        journalpostId: 'opprettet',
                        status: 'OPPRETTET',
                        oppgaveId: null,
                    }
                }
                case 'mangler-fnr': {
                    return {
                        __typename: 'JournalpostStatus',
                        journalpostId: 'mangler-fnr',
                        status: 'MANGLER_FNR',
                        oppgaveId: null,
                    }
                }
                case 'feil-tema': {
                    return {
                        __typename: 'JournalpostStatus',
                        journalpostId: 'feil-tema',
                        status: 'FEIL_TEMA',
                        oppgaveId: '12345678910',
                    }
                }
                case 'uten-document': {
                    return {
                        __typename: 'Journalpost',
                        journalpostId: 'uten-dokumnet',
                        journalstatus: 'JOURNALFØRT',
                        dokumenter: [],
                        fnr: '12345678910',
                    }
                }
                default: {
                    return {
                        __typename: 'Journalpost',
                        journalpostId: 'noko-anna',
                        journalstatus: 'NOE ANNET',
                        dokumenter: [
                            {
                                __typename: 'Document',
                                tittel: 'korkje',
                                dokumentInfoId: 'korkje-id',
                            },
                            {
                                __typename: 'Document',
                                tittel: 'kyrkje',
                                dokumentInfoId: 'kyrkje-id',
                            },
                        ],
                        fnr: '12345678910',
                    }
                }
            }
        },
        nasjonalOppgave: async (_, args) => {
            const mock = await mockEngineForSession()
            const nasjonalOppgave: NasjonalOppgave | NasjonalOppgaveStatus =
                mock.nasjonal.getNasjonalOppgaveOrStatusByOppgaveId(args.oppgaveId)

            return nasjonalOppgave
        },
        nasjonalFerdigstiltOppgave: async (_, args) => {
            const mock = await mockEngineForSession()
            const nasjonalFerdigstiltOppgave: NasjonalOppgave | NasjonalSykmeldingStatus =
                mock.nasjonal.getNasjonalOppgaveOrStatusBySykmeldingId(args.sykmeldingId)

            return nasjonalFerdigstiltOppgave
        },
        pasientNavn: async () => {
            const mock = await mockEngineForSession()
            const headersStore = await headers()
            const fnr = headersStore.get('X-Pasient-Fnr')
            if (fnr === 'should-fail') {
                throw new GraphQLError(`Intentional fail, fnr is: ${fnr}`)
            }

            const pasientNavn: Navn = mock.nasjonal.getPasientNavn()
            if (fnr && fnr.length > 11) {
                throw new GraphQLError('En feil oppsto ved henting av pasient info.')
            }

            return pasientNavn
        },
        sykmelder: async (_, args) => {
            const mock = await mockEngineForSession()
            const hprNummer = args.hprNummer
            if (hprNummer === '1234567') {
                return null
            }
            const sykmelder: Sykmelder = mock.nasjonal.getSykmelder()
            if (!hprNummer) {
                throw new GraphQLError('Hprnummer mangler for å kunne hente sykmelder.')
            }

            return sykmelder
        },
    },
    Mutation: {
        lagre: async (_, args) => {
            const mock = await mockEngineForSession()
            const oppgave = mock.utenlandsk.getOppgave(args.oppgaveId)
            const values = args.values
            if (args.status === 'FERDIGSTILT') {
                return {
                    __typename: 'DigitaliseringsoppgaveStatus',
                    oppgaveId: args.oppgaveId,
                    status: 'FERDIGSTILT',
                }
            }

            oppgave.values.fnrPasient = values.fnrPasient
            oppgave.values.skrevetLand = values.skrevetLand
            oppgave.values.behandletTidspunkt = values.behandletTidspunkt
            oppgave.values.hoveddiagnose = mapInputDiagnoseToOppgaveDiagnose(values.hovedDiagnose)
            oppgave.values.biDiagnoser =
                values.biDiagnoser?.map(mapInputDiagnoseToOppgaveDiagnose).filter(notNull) ?? []
            oppgave.values.perioder = values.perioder?.map(mapInputPeriodeToOppgavePeriode).filter(notNull) ?? []

            return oppgave
        },
        oppdaterDigitalisertSykmelding: (_, args) => {
            return {
                __typename: 'OppdatertSykmeldingStatus',
                sykmeldingId: args.sykmeldingId,
                status: 'OPPDATERT',
            }
        },
        oppgaveTilbakeTilGosys: (_, args) => {
            return {
                __typename: 'DigitaliseringsoppgaveStatus',
                oppgaveId: args.oppgaveId,
                status: 'IKKE_EN_SYKMELDING',
            }
        },
        avvis: (_, args) => {
            return {
                __typename: 'DigitaliseringsoppgaveStatus',
                oppgaveId: args.oppgaveId,
                status: 'AVVIST',
            }
        },
        dokument: async (_, args) => {
            const mock = await mockEngineForSession()
            mock.utenlandsk.saveDocument(args.oppgaveId, args.dokumentInfoId, args.tittel)

            return {
                __typename: 'Document',
                dokumentInfoId: args.dokumentInfoId,
                tittel: args.tittel,
            }
        },
        sykmeldingFraJournalpost: (_, args) => {
            if (!args.norsk) {
                return {
                    __typename: 'JournalpostStatus',
                    journalpostId: args.journalpostId,
                    status: 'OPPRETTET',
                    oppgaveId: 'blank',
                }
            }

            return {
                __typename: 'JournalpostStatus',
                journalpostId: args.journalpostId,
                status: 'OPPRETTET',
                oppgaveId: '123456789',
            }
        },
        lagreNasjonalOppgave: (_, args) => {
            if (args.oppgaveId === 'should-fail-submit') {
                throw new GraphQLError('Intentionally failed submit')
            }

            if (args.oppgaveId === 'should-rule-hit-submit') {
                return {
                    __typename: 'ValidationResult',
                    status: 'INVALID',
                    ruleHits: [
                        {
                            __typename: 'RuleInfo',
                            ruleName: 'RULE_NUMBER_ONE',
                            ruleStatus: 'INVALID',
                            messageForSender: 'Dont break the rules, please',
                            messageForUser: 'message for user',
                        },
                    ],
                } satisfies ValidationResult
            }

            const status = args.status === 'UNDER_ARBEID' ? 'FERDIGSTILT' : 'OPPDATERT'

            return {
                __typename: 'LagreNasjonalOppgaveStatus',
                oppgaveId: args.oppgaveId,
                status: status,
            } satisfies LagreNasjonalOppgaveStatus
        },
        oppgaveTilbakeTilGosysNasjonal: (_, args) => {
            return {
                __typename: 'LagreNasjonalOppgaveStatus',
                oppgaveId: args.oppgaveId,
                status: 'IKKE_EN_SYKMELDING',
            }
        },
        avvisNasjonalOppgave: (_, args) => {
            const isOppgaveMissing = false
            if (isOppgaveMissing) {
                throw new GraphQLError('Kunne ikke finne oppgave')
            }

            return {
                __typename: 'LagreNasjonalOppgaveStatus',
                oppgaveId: args.oppgaveId,
                status: 'AVVIST',
            }
        },
    },
}

function mapInputDiagnoseToOppgaveDiagnose(hovedDiagnose: InputMaybe<DiagnoseInput> | undefined): DiagnoseValue | null {
    if (hovedDiagnose == null) return null

    return {
        __typename: 'DiagnoseValue',
        kode: hovedDiagnose.kode,
        system: hovedDiagnose.system,
        tekst: 'Mock tekst (er ikke tilgjengelig i mock)',
    }
}

function mapInputPeriodeToOppgavePeriode(periode: InputMaybe<PeriodeInput> | undefined): PeriodeValue | null {
    if (periode == null) return null

    return {
        __typename: 'PeriodeValue',
        type: periode.type,
        fom: periode.fom,
        tom: periode.tom,
        grad: periode.grad,
    }
}
