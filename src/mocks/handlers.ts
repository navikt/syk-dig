/* eslint-disable @typescript-eslint/no-var-requires */

import { graphql, RequestHandler } from 'msw'

import {
    AvvisOppgaveDocument,
    DiagnoseFragment,
    DiagnoseInput,
    DigitaliseringsoppgaveStatusEnum,
    InputMaybe,
    NavngiDokumentDocument,
    OppgaveByIdDocument,
    PeriodeFragment,
    PeriodeInput,
    SaveOppgaveDocument,
    SykmeldingUnderArbeidStatus,
    TilbakeTilGosysDocument,
} from '../graphql/queries/graphql.generated'
import { notNull } from '../utils/tsUtils'

import { handlers as handler } from './handlers-test'
import getMockDb from './data'

let testHandlers: RequestHandler[] = []
if (process.env.NODE_ENV === 'test') {
    testHandlers = handler
}

export const handlers = [
    graphql.query(OppgaveByIdDocument, (req, res, ctx) => {
        const oppgave = getMockDb().getOppgaveOrStatus(req.variables.oppgaveId)

        return res(ctx.delay(), ctx.data({ __typename: 'Query', oppgave }))
    }),
    graphql.mutation(SaveOppgaveDocument, (req, res, ctx) => {
        const oppgave = getMockDb().getOppgave(req.variables.id)
        const values = req.variables.values

        if (req.variables.status === SykmeldingUnderArbeidStatus.Ferdigstilt) {
            return res(
                ctx.delay(),
                ctx.data({
                    __typename: 'Mutation',
                    lagre: {
                        __typename: 'DigitaliseringsoppgaveStatus',
                        oppgaveId: req.variables.id,
                        status: DigitaliseringsoppgaveStatusEnum.Ferdigstilt,
                    },
                }),
            )
        }

        oppgave.values.fnrPasient = values.fnrPasient
        oppgave.values.skrevetLand = values.skrevetLand
        oppgave.values.behandletTidspunkt = values.behandletTidspunkt
        oppgave.values.hoveddiagnose = mapInputDiagnoseToOppgaveDiagnose(values.hovedDiagnose)
        oppgave.values.biDiagnoser = values.biDiagnoser?.map(mapInputDiagnoseToOppgaveDiagnose).filter(notNull)
        oppgave.values.perioder = values.perioder?.map(mapInputPeriodeToOppgavePeriode).filter(notNull)

        return res(ctx.delay(), ctx.data({ __typename: 'Mutation', lagre: oppgave }))
    }),
    graphql.mutation(TilbakeTilGosysDocument, (req, res, ctx) => {
        return res(
            ctx.delay(),
            ctx.data({
                __typename: 'Mutation',
                oppgaveTilbakeTilGosys: {
                    __typename: 'DigitaliseringsoppgaveStatus',
                    oppgaveId: req.variables.oppgaveId,
                    status: DigitaliseringsoppgaveStatusEnum.IkkeEnSykmelding,
                },
            }),
        )
    }),
    graphql.mutation(AvvisOppgaveDocument, (req, res, ctx) => {
        return res(
            ctx.delay(),
            ctx.data({
                __typename: 'Mutation',
                avvis: {
                    __typename: 'DigitaliseringsoppgaveStatus',
                    oppgaveId: req.variables.oppgaveId,
                    status: DigitaliseringsoppgaveStatusEnum.Avvist,
                },
            }),
        )
    }),
    graphql.mutation(NavngiDokumentDocument, (req, res, ctx) => {
        getMockDb().saveDocument(req.variables.oppgaveId, req.variables.dokumentInfoId, req.variables.tittel)
        return res(
            ctx.delay(),
            ctx.data({
                __typename: 'Mutation',
                dokument: {
                    __typename: 'Document',
                    dokumentInfoId: req.variables.dokumentInfoId,
                    tittel: req.variables.tittel,
                },
            }),
        )
    }),
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
