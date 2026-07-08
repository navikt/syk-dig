'use client'

import { ApolloProvider } from '@apollo/client/react'
import { IToggle } from '@unleash/nextjs'
import { PropsWithChildren, ReactElement, useState } from 'react'

import { createApolloClient } from '../graphql/apollo'
import { ModiaProvider } from '../modia/modia-context'
import { ModiaData, ModiaDataError } from '../modia/ModiaService'
import { FlagProvider } from '../toggles/context'

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
