import '../style/global.css';

import { PropsWithChildren, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import type { AppProps as NextAppProps } from 'next/app';

import { createApolloClient } from '../graphql/apollo';
import logger from '../utils/logger';
import { ModiaContext, ModiaContextError } from '../modia/ModiaService';
import { useModiaContextUpdated } from '../graphql/localState/modia';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    logger.info('Setting up MSW for local or demo');
    require('../mocks');
}

export interface RequiredPageProps {
    modiaContext?: ModiaContext | ModiaContextError;
}

export interface AppProps<T> extends Omit<NextAppProps<T>, 'pageProps'> {
    pageProps: PropsWithChildren & Partial<RequiredPageProps>;
}

function MyApp({ Component, pageProps }: AppProps<RequiredPageProps>): JSX.Element {
    const [apolloClient] = useState(() => createApolloClient(pageProps.modiaContext));

    useModiaContextUpdated(apolloClient, pageProps.modiaContext);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
