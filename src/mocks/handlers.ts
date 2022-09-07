import { graphql } from 'msw';

import { ArbeidsgivereTestQueryDocument } from '../graphql/queries/graphql.generated';

export const handlers = [
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
