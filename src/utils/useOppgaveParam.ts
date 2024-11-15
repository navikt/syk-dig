import { useParams as useNextParams } from 'next/navigation'

export enum Location {
    Utenlansk,
}

interface OppgaveRoute {
    oppgaveId: string
}

interface SykmeldingRoute {
    sykmeldingId: string
}

export function useSykmeldingParam(): SykmeldingRoute {
    const params = useNextParams()
    const sykmeldingId = params.sykmeldingId as string | undefined
    if (sykmeldingId == null) {
        throw new Error(`Invalid param for route 'Sykmelding', was ${typeof sykmeldingId}`)
    }
    return { sykmeldingId }
}

export function useOppgaveParam(location: Location): OppgaveRoute {
    const params = useNextParams()

    if (params == null) {
        throw new Error(`Missing params for route ${location}: ${JSON.stringify(params)}`)
    }

    switch (location) {
        case Location.Utenlansk:
            const oppgaveId = params.oppgaveId as string | undefined
            if (oppgaveId == null) {
                throw new Error(`Invalid param for route 'Utenlansk', was: ${typeof oppgaveId}`)
            }
            return { oppgaveId }
        default: {
            throw new Error(`Unknown location: ${location}`)
        }
    }
}
