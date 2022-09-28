/* eslint-disable @typescript-eslint/no-var-requires */

import { graphql, RequestHandler } from 'msw';

import { OppgaveByIdDocument } from '../graphql/queries/graphql.generated';

let testHandlers: RequestHandler[] = [];
if (process.env.NODE_ENV === 'test') {
    testHandlers = require('./handlers-test').handlers;
}

export const handlers = [
    graphql.query(OppgaveByIdDocument, (req, res, ctx) => {
        return res(
            ctx.delay(),
            ctx.data({
                __typename: 'Query',
                oppgave: {
                    __typename: 'Digitaliseringsoppgave',
                    oppgaveId: '123',
                    person: {
                        __typename: 'Person',
                        navn: 'Ola Nordmann',
                        fnr: '12345678910',
                    },
                    values: {
                        __typename: 'SykmeldingUnderArbeid',
                        personNrPasient: '12345678910',
                    },
                },
            }),
        );
    }),
    ...(process.env.NODE_ENV === 'test' ? testHandlers : []),
];
