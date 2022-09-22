import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Heading, Loader } from '@navikt/ds-react';

import PageWrapper from '../../components/PageWrapper/PageWrapper';
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated';
import Pdf from '../../components/Pdf/Pdf';

import styles from './[oppgaveid].module.css';

function Oppgave(): JSX.Element {
    const { query } = useRouter();
    const oppgaveId = query.oppgaveid as string;

    const { loading, data, error } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId: oppgaveId ?? '' },
    });

    return (
        <PageWrapper title="Hemmelige oppgavehenter">
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <Heading level="1" size="large">
                        Hemmelig henting av {oppgaveId}
                    </Heading>
                    {loading && <Loader />}
                    {data?.oppgave && JSON.stringify(data.oppgave)}
                    {error && <div>GQL is mad: {error.message}</div>}
                </div>
                {oppgaveId && <Pdf className={styles.pdf} href={`/api/pdf?oppgaveId=${oppgaveId}`} />}
            </div>
        </PageWrapper>
    );
}

export default Oppgave;
