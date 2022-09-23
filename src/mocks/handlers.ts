import { graphql } from 'msw';

import { OppgaveByIdDocument } from '../graphql/queries/graphql.generated';

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
];
