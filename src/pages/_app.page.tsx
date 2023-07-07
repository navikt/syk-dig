import '../style/global.css'

import { PropsWithChildren, ReactElement, useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import type { AppProps as NextAppProps } from 'next/app'
import { logger } from '@navikt/next-logger'
import { Modal } from '@navikt/ds-react'

import { createApolloClient } from '../graphql/apollo'
import { ModiaContext, ModiaContextError } from '../modia/ModiaService'
import { useModiaContextUpdated } from '../graphql/localState/modia'
import { browserEnv } from '../utils/env'

if (browserEnv.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    logger.info('Setting up MSW for local or demo')
    require('../mocks')
}

export interface RequiredPageProps {
    modiaContext: ModiaContext | ModiaContextError
}

export interface AppProps<T> extends Omit<NextAppProps<T>, 'pageProps'> {
    pageProps: PropsWithChildren & Partial<RequiredPageProps>
}

function MyApp({ Component, pageProps }: AppProps<RequiredPageProps>): ReactElement {
    const [apolloClient] = useState(() => createApolloClient(pageProps.modiaContext))

    useModiaContextUpdated(apolloClient, pageProps.modiaContext)

    useEffect(() => {
        Modal.setAppElement?.('#__next')
    }, [])

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
