import '../style/global.css';

import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import { createApolloClient } from '../graphql/apollo';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const [apolloClient] = useState(() => createApolloClient());

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
