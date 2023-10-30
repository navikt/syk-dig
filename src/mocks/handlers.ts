/* eslint-disable @typescript-eslint/no-var-requires */

import { delay, graphql, HttpResponse, RequestHandler } from 'msw'
import {
    AvvisOppgaveDocument,
    AvvisOppgaveMutation,
    AvvisOppgaveMutationVariables,
    DiagnoseFragment,
    DiagnoseInput,
    DigitaliseringsoppgaveStatusEnum,
    InputMaybe,
    JournalpostByIdDocument, JournalpostByIdQuery, JournalpostByIdQueryVariables,
    NavngiDokumentDocument,
    NavngiDokumentMutation,
    NavngiDokumentMutationVariables,
    OppgaveByIdDocument,
    OppgaveByIdQuery,
    OppgaveByIdQueryVariables,
    PeriodeFragment,
    PeriodeInput,
    SaveOppgaveDocument,
    SaveOppgaveMutation,
    SaveOppgaveMutationVariables,
    SykmeldingUnderArbeidStatus,
    TilbakeTilGosysDocument,
    TilbakeTilGosysMutation,
    TilbakeTilGosysMutationVariables,
} from '../graphql/queries/graphql.generated'
import { notNull } from '../utils/tsUtils'

import { handlers as handler } from './handlers-test'
import getMockDb from './data'

let testHandlers: RequestHandler[] = []
if (process.env.NODE_ENV === 'test') {
    testHandlers = handler
}

export const handlers = [
    graphql.query<OppgaveByIdQuery, OppgaveByIdQueryVariables>(OppgaveByIdDocument, async ({ variables }) => {
        const oppgave = getMockDb().getOppgaveOrStatus(variables.oppgaveId)

        await delay()
        return HttpResponse.json({ data: { __typename: 'Query', oppgave } })
    }),
    graphql.mutation<SaveOppgaveMutation, SaveOppgaveMutationVariables>(SaveOppgaveDocument, async ({ variables }) => {
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
                },
            })
        }

        oppgave.values.fnrPasient = values.fnrPasient
        oppgave.values.skrevetLand = values.skrevetLand
        oppgave.values.behandletTidspunkt = values.behandletTidspunkt
        oppgave.values.hoveddiagnose = mapInputDiagnoseToOppgaveDiagnose(values.hovedDiagnose)
        oppgave.values.biDiagnoser = values.biDiagnoser?.map(mapInputDiagnoseToOppgaveDiagnose).filter(notNull)
        oppgave.values.perioder = values.perioder?.map(mapInputPeriodeToOppgavePeriode).filter(notNull)

        await delay()
        return HttpResponse.json({ data: { __typename: 'Mutation', lagre: oppgave } })
    }),
    graphql.query<JournalpostByIdQuery, JournalpostByIdQueryVariables>(JournalpostByIdDocument, async ({ variables }) =>  {
        await delay()
        if (variables.id === 'jørn') {
            return HttpResponse.json({
                data: {
                    __typename: 'Query',
                    journalpost: {
                        __typename: 'Journalpost',
                        journalpostId: 'hei-jørn',
                        journalstatus: 'JOURNALFØRT',
                    }
                }
            })
        }
        return HttpResponse.json({
            data: {
                __typename: 'Query',
                journalpost: {
                    __typename: 'Journalpost',
                    journalpostId: 'noko-anna',
                    journalstatus: 'NOE ANNET',
                },
            }
        })
    }),
    graphql.mutation<TilbakeTilGosysMutation, TilbakeTilGosysMutationVariables>(
        TilbakeTilGosysDocument,
        async ({ variables }) => {
            await delay()
            return HttpResponse.json({
                data: {
                    __typename: 'Mutation',
                    oppgaveTilbakeTilGosys: {
                        __typename: 'DigitaliseringsoppgaveStatus',
                        oppgaveId: variables.oppgaveId,
                        status: DigitaliseringsoppgaveStatusEnum.IkkeEnSykmelding,
                    },
                },
            })
        },
    ),
    graphql.mutation<AvvisOppgaveMutation, AvvisOppgaveMutationVariables>(
        AvvisOppgaveDocument,
        async ({ variables }) => {
            await delay()
            return HttpResponse.json({
                data: {
                    __typename: 'Mutation',
                    avvis: {
                        __typename: 'DigitaliseringsoppgaveStatus',
                        oppgaveId: variables.oppgaveId,
                        status: DigitaliseringsoppgaveStatusEnum.Avvist,
                    },
                },
            })
        },
    ),
    graphql.mutation<NavngiDokumentMutation, NavngiDokumentMutationVariables>(
        NavngiDokumentDocument,
        async ({ variables }) => {
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
                },
            })
        },
    ),
    ...(process.env.NODE_ENV === 'test' ? testHandlers : []),
]

function mapInputDiagnoseToOppgaveDiagnose(
    hovedDiagnose: InputMaybe<DiagnoseInput> | undefined,
): DiagnoseFragment | null {
    if (hovedDiagnose == null) return null

    return {
        __typename: 'DiagnoseValue',
        kode: hovedDiagnose.kode,
        system: hovedDiagnose.system,
        tekst: undefined,
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
