import '../style/global.css'

import { PropsWithChildren, ReactElement, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import type { AppProps as NextAppProps } from 'next/app'
import { logger } from '@navikt/next-logger'
import { IToggle } from '@unleash/nextjs'

import { createApolloClient } from '../graphql/apollo'
import { ModiaContext, ModiaContextError } from '../modia/ModiaService'
import { useModiaContextUpdated } from '../graphql/localState/modia'
import { browserEnv } from '../utils/env'
import { FlagProvider } from '../toggles/context'

if (browserEnv.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    logger.info('Setting up MSW for local or demo')
    require('../mocks')
}

export interface RequiredPageProps {
    modiaContext?: ModiaContext | ModiaContextError
    toggles: IToggle[]
}

export interface AppProps<T> extends Omit<NextAppProps<T>, 'pageProps'> {
    pageProps: PropsWithChildren & RequiredPageProps
}

function MyApp({ Component, pageProps }: AppProps<RequiredPageProps>): ReactElement {
    const [apolloClient] = useState(() => createApolloClient(pageProps.modiaContext))

    useModiaContextUpdated(apolloClient, pageProps.modiaContext)

    return (
        <ApolloProvider client={apolloClient}>
            <FlagProvider toggles={pageProps.toggles}>
                <Component {...pageProps} />
            </FlagProvider>
        </ApolloProvider>
    )
}

export default MyApp
