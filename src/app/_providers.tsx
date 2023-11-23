'use client'

import { PropsWithChildren, ReactElement, useState } from 'react'
import { IToggle } from '@unleash/nextjs'
import { ApolloProvider } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { ModiaContext, ModiaContextError } from '../modia/ModiaService'
import { createApolloClient } from '../graphql/apollo'
import { FlagProvider } from '../toggles/context'
import { useModiaContextUpdated } from '../graphql/localState/modia'
import { bundledEnv } from '../utils/env'

if (bundledEnv.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    logger.info('Setting up MSW for local or demo')
    require('../mocks')
}

type Props = {
    modiaContext?: ModiaContext | ModiaContextError
    toggles: IToggle[]
}

function Providers({ children, modiaContext, toggles }: PropsWithChildren<Props>): ReactElement {
    const [apolloClient] = useState(() => createApolloClient(modiaContext))

    useModiaContextUpdated(apolloClient, modiaContext)

    return (
        <ApolloProvider client={apolloClient}>
            <FlagProvider toggles={toggles}>{children}</FlagProvider>
        </ApolloProvider>
    )
}

export default Providers
