/* eslint-disable @typescript-eslint/no-var-requires */

import { graphql, RequestHandler } from 'msw';

import { OppgaveByIdDocument, OppgaveByIdQuery } from '../graphql/queries/graphql.generated';

import oppgaveWithValues from './data/oppgaveWithValues';
import oppgaveBlank from './data/oppgaveBlank';

let testHandlers: RequestHandler[] = [];
if (process.env.NODE_ENV === 'test') {
    testHandlers = require('./handlers-test').handlers;
}

export const handlers = [
    graphql.query(OppgaveByIdDocument, (req, res, ctx) => {
        return res(ctx.delay(), ctx.data(getOppgave(req.variables.oppgaveId)));
    }),
    ...(process.env.NODE_ENV === 'test' ? testHandlers : []),
];

function getOppgave(oppgaveId: string): OppgaveByIdQuery {
    switch (oppgaveId.toLowerCase()) {
        case 'blank':
            return oppgaveBlank;
        default:
            return oppgaveWithValues;
    }
}
