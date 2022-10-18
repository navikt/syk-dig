/* eslint-disable @typescript-eslint/no-var-requires */

import { graphql, RequestHandler } from 'msw';

import {
    DiagnoseFragment,
    DiagnoseInput,
    InputMaybe,
    OppgaveByIdDocument,
    PeriodeFragment,
    PeriodeInput,
    SaveOppgaveDocument,
} from '../graphql/queries/graphql.generated';
import { notNull } from '../utils/tsUtils';

import getMockDb from './data';

let testHandlers: RequestHandler[] = [];
if (process.env.NODE_ENV === 'test') {
    testHandlers = require('./handlers-test').handlers;
}

export const handlers = [
    graphql.query(OppgaveByIdDocument, (req, res, ctx) => {
        const oppgave = getMockDb().getOppgave(req.variables.oppgaveId);

        return res(ctx.delay(), ctx.data({ __typename: 'Query', oppgave }));
    }),
    graphql.mutation(SaveOppgaveDocument, (req, res, ctx) => {
        const oppgave = getMockDb().getOppgave(req.variables.id);
        const values = req.variables.values;

        oppgave.values.fnrPasient = values.fnrPasient;
        oppgave.values.skrevetLand = values.skrevetLand;
        oppgave.values.behandletTidspunkt = values.behandletTidspunkt;
        oppgave.values.hoveddiagnose = mapInputDiagnoseToOppgaveDiagnose(values.hovedDiagnose);
        oppgave.values.biDiagnoser = values.biDiagnoser?.map(mapInputDiagnoseToOppgaveDiagnose).filter(notNull);
        oppgave.values.perioder = values.perioder?.map(mapInputPeriodeToOppgavePeriode).filter(notNull);

        return res(ctx.delay(), ctx.data({ __typename: 'Mutation', lagre: oppgave }));
    }),
    ...(process.env.NODE_ENV === 'test' ? testHandlers : []),
];

function mapInputDiagnoseToOppgaveDiagnose(
    hovedDiagnose: InputMaybe<DiagnoseInput> | undefined,
): DiagnoseFragment | null {
    if (hovedDiagnose == null) return null;

    return {
        __typename: 'DiagnoseValue',
        kode: hovedDiagnose.kode,
        system: hovedDiagnose.system,
        tekst: undefined,
    };
}

function mapInputPeriodeToOppgavePeriode(periode: InputMaybe<PeriodeInput> | undefined): PeriodeFragment | null {
    if (periode == null) return null;

    return {
        __typename: 'PeriodeValue',
        type: periode.type,
        fom: periode.fom,
        tom: periode.tom,
        grad: periode.grad,
    };
}
