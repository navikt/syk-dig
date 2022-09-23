import type { NextPage } from 'next';
import { Heading } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../auth/withAuth';
import { getModiaContext } from '../modia/ModiaService';
import PageWrapper from '../components/PageWrapper/PageWrapper';

const Home: NextPage = () => {
    return (
        <PageWrapper title="Digitalisering av Sykmeldinger">
            <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
            <div>This is not the app you are looking for.</div>
        </PageWrapper>
    );
};

export const getServerSideProps = withAuthenticatedPage(async (context, accessToken) => {
    const modiaContext = await getModiaContext(accessToken);

    return {
        props: {
            modiaContext,
        },
    };
});

export default Home;
