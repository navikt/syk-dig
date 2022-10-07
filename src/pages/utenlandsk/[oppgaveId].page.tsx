import { useQuery } from '@apollo/client';
import { Alert, Loader } from '@navikt/ds-react';
import React from 'react';

import { withAuthenticatedPage } from '../../auth/withAuth';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import SykmeldingForm from '../../components/Sykmelding/SykmeldingForm';
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated';
import { Location, useParam } from '../../utils/useParam';
import Pdf from '../../components/Pdf/Pdf';

import styles from './[oppgaveId].module.css';

function Utenlandsk(): JSX.Element {
    const { oppgaveId } = useParam(Location.Utenlansk);
    const { data, error, loading } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId },
    });

    return (
        <PageWrapper title="Digitalisering av Sykmeldinger" className={styles.contentWrapper}>
            <div className={styles.content}>
                {loading && <Loader size="3xlarge" />}
                {data && <SykmeldingForm oppgave={data.oppgave} />}
                {error && <Alert variant="error">Klarte ikke å laste oppgave med oppgave-id {oppgaveId}</Alert>}
            </div>
            {oppgaveId && <Pdf className={styles.pdf} href={`/api/pdf?oppgaveId=${oppgaveId}`} />}
        </PageWrapper>
    );
}

export const getServerSideProps = withAuthenticatedPage();

export default Utenlandsk;
