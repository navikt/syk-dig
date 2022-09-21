import { graphql } from 'msw';

import { ArbeidsgivereTestQueryDocument, OppgaveByIdDocument } from '../graphql/queries/graphql.generated';

export const handlers = [
    graphql.query(OppgaveByIdDocument, (req, res, ctx) => {
        return res(
            ctx.delay(),
            ctx.data({
                __typename: 'Query',
                oppgave: {
                    __typename: 'DigitaliseringsoppgaveRespons',
                    digitaliseringsoppgave: {
                        __typename: 'Digitaliseringsoppgave',
                        oppgaveId: '123',
                        sykmeldingId: '123',
                        person: {
                            __typename: 'Person',
                            navn: 'Ola Nordmann',
                            fnr: '12345678910',
                        },
                    },
                },
            }),
        );
    }),
    graphql.query(ArbeidsgivereTestQueryDocument, (req, res, ctx) => {
        return res(
            ctx.delay(),
            ctx.data({
                __typename: 'Query',
                arbeidsgivere: [
                    {
                        __typename: 'Arbeidsgiver',
                        navn: 'Testbedrift',
                        orgnummer: '123456789',
                    },
                    {
                        __typename: 'Arbeidsgiver',
                        navn: 'Testbedrift 2',
                        orgnummer: '123456710',
                    },
                ],
            }),
        );
    }),
];
