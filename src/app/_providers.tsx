'use client'

import { PropsWithChildren, ReactElement, useState } from 'react'
import { IToggle } from '@unleash/nextjs'
import { ApolloProvider } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { ModiaData, ModiaDataError } from '../modia/ModiaService'
import { createApolloClient } from '../graphql/apollo'
import { FlagProvider } from '../toggles/context'
import { ModiaProvider } from '../modia/modia-context'
import { isLocalOrDemo } from '../utils/env'

if (isLocalOrDemo) {
    logger.info('Setting up MSW for local or demo')
    require('../mocks')
}

type Props = {
    modiaContext: ModiaData | ModiaDataError
    toggles: IToggle[]
}

function Providers({ children, modiaContext, toggles }: PropsWithChildren<Props>): ReactElement {
    const [apolloClient] = useState(() => createApolloClient())

    return (
        <ModiaProvider modiaContext={modiaContext}>
            <ApolloProvider client={apolloClient}>
                <FlagProvider toggles={toggles}>{children}</FlagProvider>
            </ApolloProvider>
        </ModiaProvider>
    )
}

export default Providers
