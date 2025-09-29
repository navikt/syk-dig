'use client'

import { PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react'
import { IToggle } from '@unleash/nextjs'
import { ApolloProvider } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { ModiaData, ModiaDataError } from '../modia/ModiaService'
import { createApolloClient } from '../graphql/apollo'
import { FlagProvider } from '../toggles/context'
import { ModiaProvider } from '../modia/modia-context'

type Props = {
    modiaContext: ModiaData | ModiaDataError
    toggles: IToggle[]
}

function Providers({ children, modiaContext, toggles }: PropsWithChildren<Props>): ReactElement {
    const [apolloClient] = useState(() => createApolloClient())

    return (
        <ModiaProvider modiaContext={modiaContext}>
            <LogColorScheme modiaContext={modiaContext} />
            <ApolloProvider client={apolloClient}>
                <FlagProvider toggles={toggles}>{children}</FlagProvider>
            </ApolloProvider>
        </ModiaProvider>
    )
}

function LogColorScheme({ modiaContext }: Pick<Props, 'modiaContext'>): null {
    const stableContext = useRef(modiaContext)
    useEffect(() => {
        const context = stableContext.current
        const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        logger.info(`User ${'ident' in context ? context.ident : 'unknown'} prefers color scheme ${colorScheme}`)
    }, [])

    return null
}

export default Providers
