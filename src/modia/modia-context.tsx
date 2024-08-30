'use client'

import { createContext, PropsWithChildren, ReactElement, useContext, useState } from 'react'

import { ModiaData, ModiaDataError } from './ModiaService'

type ModiaProviderProps = {
    modiaContext: ModiaData | ModiaDataError
}

export function ModiaProvider({ children, modiaContext }: PropsWithChildren<ModiaProviderProps>): ReactElement {
    const [selectedEnhetId, setSelectedEnhetId] = useState<string | null>(getDefaultSelectedEnhet(modiaContext))

    return (
        <InternalModiaContext.Provider
            value={{
                modia: modiaContext,
                selectedEnhetId,
                setSelectedEnhetId,
            }}
        >
            {children}
        </InternalModiaContext.Provider>
    )
}

type ModiaContext = {
    modia: ModiaData | ModiaDataError
    selectedEnhetId: string | null
    setSelectedEnhetId: (enhetId: string) => void
}

const InternalModiaContext = createContext<ModiaContext | null>(null)

export function useModiaContext(): ModiaContext {
    const context = useContext(InternalModiaContext)

    if (context == null) {
        throw new Error('Illegal state: Modia context used without ModiaProvider in tree')
    }

    return context
}

function getDefaultSelectedEnhet(modiaContext: ModiaData | ModiaDataError): string | null {
    if ('errorType' in modiaContext) return null

    if (modiaContext.aktivEnhet != null) {
        return modiaContext.aktivEnhet
    }

    return modiaContext.enheter?.[0].enhetId ?? null
}
