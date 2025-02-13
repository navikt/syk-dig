import { delay, graphql, HttpResponse, RequestHandler } from 'msw'

import {
    AvvisOppgaveDocument,
    AvvisOppgaveMutation,
    DiagnoseFragment,
    DiagnoseInput,
    DigitaliseringsoppgaveStatusEnum,
    InputMaybe,
    JournalpostByIdDocument,
    JournalpostByIdQuery,
    JournalpostStatusEnum,
    NasjonalFerdigstiltOppgaveByIdDocument,
    NasjonalOppgaveByIdDocument,
    NasjonalOppgaveFragment,
    NasjonalOppgaveStatusFragment,
    NavngiDokumentDocument,
    NavngiDokumentMutation,
    OppdatertSykmeldingStatusEnum,
    OppgaveByIdDocument,
    PeriodeFragment,
    PeriodeInput,
    SaveOppgaveDocument,
    SaveOppgaveMutation,
    SykmeldingByIdDocument,
    SykmeldingFraJournalpostDocument,
    SykmeldingFraJournalpostMutation,
    SykmeldingUnderArbeidStatus,
    TilbakeTilGosysDocument,
    TilbakeTilGosysMutation,
    UpdateDigitalisertSykmeldingDocument,
    UpdateDigitalisertSykmeldingMutation,
} from '../graphql/queries/graphql.generated'
import { notNull } from '../utils/tsUtils'
import getNasjonalMockDb from '../components/nasjonal-oppgave/__tests__/testData'

import { handlers as handler } from './handlers-test'
import getMockDb from './data'

let testHandlers: RequestHandler[] = []
if (process.env.NODE_ENV === 'test') {
    testHandlers = handler
}

export const handlers = [
    graphql.query(OppgaveByIdDocument, async ({ variables }) => {
        const oppgave = getMockDb().getOppgaveOrStatus(variables.oppgaveId)

        await delay()
        return HttpResponse.json({ data: { __typename: 'Query', oppgave } })
    }),
    graphql.query(SykmeldingByIdDocument, async ({ variables }) => {
        const digitalisertSykmelding = getMockDb().getDigitalisertSykmelding(variables.sykmeldingId)

        await delay()
        return HttpResponse.json({ data: { __typename: 'Query', digitalisertSykmelding } })
    }),
    graphql.mutation(SaveOppgaveDocument, async ({ variables }) => {
        const oppgave = getMockDb().getOppgave(variables.id)
        const values = variables.values
        if (variables.status === SykmeldingUnderArbeidStatus.Ferdigstilt) {
            await delay()

            return HttpResponse.json({
                data: {
                    __typename: 'Mutation',
                    lagre: {
                        __typename: 'DigitaliseringsoppgaveStatus',
                        oppgaveId: variables.id,
                        status: DigitaliseringsoppgaveStatusEnum.Ferdigstilt,
                    },
                } satisfies SaveOppgaveMutation,
            })
        }

        oppgave.values.fnrPasient = values.fnrPasient
        oppgave.values.skrevetLand = values.skrevetLand
        oppgave.values.behandletTidspunkt = values.behandletTidspunkt
        oppgave.values.hoveddiagnose = mapInputDiagnoseToOppgaveDiagnose(values.hovedDiagnose)
        oppgave.values.biDiagnoser = values.biDiagnoser?.map(mapInputDiagnoseToOppgaveDiagnose).filter(notNull) ?? []
        oppgave.values.perioder = values.perioder?.map(mapInputPeriodeToOppgavePeriode).filter(notNull) ?? []

        await delay()
        return HttpResponse.json({ data: { __typename: 'Mutation', lagre: oppgave } })
    }),
    graphql.mutation(UpdateDigitalisertSykmeldingDocument, async ({ variables }) => {
        return HttpResponse.json({
            data: {
                __typename: 'Mutation',
                oppdaterDigitalisertSykmelding: {
                    __typename: 'OppdatertSykmeldingStatus',
                    sykmeldingId: variables.sykmeldingId,
                    status: OppdatertSykmeldingStatusEnum.Oppdatert,
                },
            } satisfies UpdateDigitalisertSykmeldingMutation,
        })
    }),
    graphql.query(JournalpostByIdDocument, async ({ variables }) => {
        await delay()

        if (variables.id === 'opprettet') {
            return HttpResponse.json({
                data: {
                    __typename: 'Query',
                    journalpost: {
                        __typename: 'JournalpostStatus',
                        journalpostId: 'opprettet',
                        status: JournalpostStatusEnum.Opprettet,
                        oppgaveId: null,
                    },
                } satisfies JournalpostByIdQuery,
            })
        }

        if (variables.id === 'mangler-fnr') {
            return HttpResponse.json({
                data: {
                    __typename: 'Query',
                    journalpost: {
                        __typename: 'JournalpostStatus',
                        journalpostId: 'mangler-fnr',
                        status: JournalpostStatusEnum.ManglerFnr,
                        oppgaveId: null,
                    },
                } satisfies JournalpostByIdQuery,
            })
        }

        if (variables.id === 'feil-tema') {
            return HttpResponse.json({
                data: {
                    __typename: 'Query',
                    journalpost: {
                        __typename: 'JournalpostStatus',
                        journalpostId: 'feil-tema',
                        status: JournalpostStatusEnum.FeilTema,
                        oppgaveId: '12345678910',
                    },
                } satisfies JournalpostByIdQuery,
            })
        }

        if (variables.id === 'uten-dokument') {
            return HttpResponse.json({
                data: {
                    __typename: 'Query',
                    journalpost: {
                        __typename: 'Journalpost',
                        journalpostId: 'uten-dokumnet',
                        journalstatus: 'JOURNALFØRT',
                        dokumenter: [],
                        fnr: '12345678910',
                    },
                } satisfies JournalpostByIdQuery,
            })
        }
        return HttpResponse.json({
            data: {
                __typename: 'Query',
                journalpost: {
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
                },
            } satisfies JournalpostByIdQuery,
        })
    }),
    graphql.mutation(TilbakeTilGosysDocument, async ({ variables }) => {
        await delay()
        return HttpResponse.json({
            data: {
                __typename: 'Mutation',
                oppgaveTilbakeTilGosys: {
                    __typename: 'DigitaliseringsoppgaveStatus',
                    oppgaveId: variables.oppgaveId,
                    status: DigitaliseringsoppgaveStatusEnum.IkkeEnSykmelding,
                },
            } satisfies TilbakeTilGosysMutation,
        })
    }),
    graphql.mutation(AvvisOppgaveDocument, async ({ variables }) => {
        await delay()
        return HttpResponse.json({
            data: {
                __typename: 'Mutation',
                avvis: {
                    __typename: 'DigitaliseringsoppgaveStatus',
                    oppgaveId: variables.oppgaveId,
                    status: DigitaliseringsoppgaveStatusEnum.Avvist,
                },
            } satisfies AvvisOppgaveMutation,
        })
    }),
    graphql.mutation(NavngiDokumentDocument, async ({ variables }) => {
        getMockDb().saveDocument(variables.oppgaveId, variables.dokumentInfoId, variables.tittel)

        await delay()
        return HttpResponse.json({
            data: {
                __typename: 'Mutation',
                dokument: {
                    __typename: 'Document',
                    dokumentInfoId: variables.dokumentInfoId,
                    tittel: variables.tittel,
                },
            } satisfies NavngiDokumentMutation,
        })
    }),
    graphql.mutation(SykmeldingFraJournalpostDocument, async ({ variables }) => {
        await delay()

        if (!variables.norsk) {
            return HttpResponse.json({
                data: {
                    __typename: 'Mutation',
                    sykmeldingFraJournalpost: {
                        __typename: 'JournalpostStatus',
                        journalpostId: variables.id,
                        status: JournalpostStatusEnum.Opprettet,
                        oppgaveId: 'blank',
                    },
                } satisfies SykmeldingFraJournalpostMutation,
            })
        }

        return HttpResponse.json({
            data: {
                __typename: 'Mutation',
                sykmeldingFraJournalpost: {
                    __typename: 'JournalpostStatus',
                    journalpostId: variables.id,
                    status: JournalpostStatusEnum.Opprettet,
                    oppgaveId: '123456789',
                },
            },
        })
    }),
    ...(process.env.NODE_ENV === 'test' ? testHandlers : []),

    // NASJONAL
    graphql.query(NasjonalOppgaveByIdDocument, async ({ variables }) => {
        const nasjonalOppgave: NasjonalOppgaveFragment | NasjonalOppgaveStatusFragment =
            getNasjonalMockDb().getNasjonalOppgaveOrStatusByOppgaveId(variables.oppgaveId)

        await delay()
        return HttpResponse.json({ data: { __typename: 'Query', nasjonalOppgave } })
    }),
    graphql.query(NasjonalFerdigstiltOppgaveByIdDocument, async ({ variables }) => {
        const nasjonalFerdigstiltOppgave: NasjonalOppgaveFragment | NasjonalOppgaveStatusFragment =
            getNasjonalMockDb().getNasjonalOppgaveOrStatusBySykmeldingId(variables.sykmeldingId)

        await delay()
        return HttpResponse.json({ data: { __typename: 'Query', nasjonalFerdigstiltOppgave } })
    }),
]

function mapInputDiagnoseToOppgaveDiagnose(
    hovedDiagnose: InputMaybe<DiagnoseInput> | undefined,
): DiagnoseFragment | null {
    if (hovedDiagnose == null) return null

    return {
        __typename: 'DiagnoseValue',
        kode: hovedDiagnose.kode,
        system: hovedDiagnose.system,
        tekst: 'Mock tekst (er ikke tilgjengelig i mock)',
    }
}

function mapInputPeriodeToOppgavePeriode(periode: InputMaybe<PeriodeInput> | undefined): PeriodeFragment | null {
    if (periode == null) return null

    return {
        __typename: 'PeriodeValue',
        type: periode.type,
        fom: periode.fom,
        tom: periode.tom,
        grad: periode.grad,
    }
}
