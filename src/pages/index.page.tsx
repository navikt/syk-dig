import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading, Loader, Alert } from '@navikt/ds-react';
import { useQuery } from '@apollo/client';

import { withAuthenticatedPage } from '../auth/withAuth';
import { ArbeidsgivereTestQueryDocument } from '../graphql/queries/graphql.generated';

const Home: NextPage = () => {
    const { loading, data, error } = useQuery(ArbeidsgivereTestQueryDocument);

    return (
        <div>
            <Head>
                <title>Digitalisering av Sykmeldinger</title>
            </Head>
            <main>
                <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
                {loading && <Loader />}
                {data &&
                    data.arbeidsgivere.map((it) => (
                        <div key={it.orgnummer}>
                            {it.navn}: {it.orgnummer}
                        </div>
                    ))}
                {error && <Alert variant="error">{error.message}</Alert>}
            </main>
        </div>
    );
};

export const getServerSideProps = withAuthenticatedPage();

export default Home;
