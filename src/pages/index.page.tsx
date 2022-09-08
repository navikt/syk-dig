import type { NextPage } from 'next';
import { Heading, Loader, Alert } from '@navikt/ds-react';
import { useQuery } from '@apollo/client';

import { withAuthenticatedPage } from '../auth/withAuth';
import { ArbeidsgivereTestQueryDocument } from '../graphql/queries/graphql.generated';
import { getModiaContext } from '../modia/ModiaService';
import PageWrapper from '../components/PageWrapper/PageWrapper';

const Home: NextPage = () => {
    const { loading, data, error } = useQuery(ArbeidsgivereTestQueryDocument);

    return (
        <PageWrapper title="Digitalisering av Sykmeldinger">
            <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
            {loading && <Loader />}
            {data &&
                data.arbeidsgivere.map((it) => (
                    <div key={it.orgnummer}>
                        {it.navn}: {it.orgnummer}
                    </div>
                ))}
            {error && <Alert variant="error">{error.message}</Alert>}
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
