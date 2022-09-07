import type { NextPage } from 'next';
import Head from 'next/head';
import { Heading } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../auth/withAuth';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Digitalisering av Sykmeldinger</title>
            </Head>
            <main>
                <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
            </main>
        </div>
    );
};

export const getServerSideProps = withAuthenticatedPage();

export default Home;
