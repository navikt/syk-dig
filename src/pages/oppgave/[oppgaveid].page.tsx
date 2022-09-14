import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Loader } from '@navikt/ds-react';

import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated';

function Oppgave(): JSX.Element {
    const { query } = useRouter();
    const oppgaveId = query.oppgaveid as string;

    const { loading, data, error } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId: oppgaveId ?? '' },
    });

    return (
        <PageWrapper title="Hemmelige oppgavehenter">
            <div>Hemmelig henting av {oppgaveId}</div>
            {loading && <Loader />}
            {data?.oppgave && JSON.stringify(data.oppgave)}
            {error && <div>GQL is mad: {error.message}</div>}
        </PageWrapper>
    );
}

export default Oppgave;
