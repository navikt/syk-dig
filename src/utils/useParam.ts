import { useParams as useNextParams } from 'next/navigation'

export enum Location {
    Utenlansk,
}

interface OppgaveRoute {
    oppgaveId: string
}

export function useParam(location: Location): OppgaveRoute {
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
