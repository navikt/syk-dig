/* eslint-disable @typescript-eslint/no-var-requires */

import { graphql, RequestHandler } from 'msw';

import { OppgaveByIdDocument, SaveOppgaveDocument } from '../graphql/queries/graphql.generated';

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

        oppgave.values.fnrPasient = req.variables.values.fnrPasient;
        oppgave.values.skrevetLand = req.variables.values.skrevetLand;

        return res(ctx.delay(), ctx.data({ __typename: 'Mutation', lagre: oppgave }));
    }),
    ...(process.env.NODE_ENV === 'test' ? testHandlers : []),
];
