import { useRouter } from 'next/router';

export enum Location {
    Utenlansk,
}

interface OppgaveRoute {
    oppgaveId: string;
}

export function useParam(location: Location): OppgaveRoute {
    const { query } = useRouter();

    switch (location) {
        case Location.Utenlansk:
            const oppgaveId = query.oppgaveId;
            if (oppgaveId == null || typeof oppgaveId !== 'string') {
                throw new Error(`Invalid param for route 'Utenlansk', was: ${typeof oppgaveId}`);
            }
            return { oppgaveId };
        default: {
            throw new Error(`Unknown location: ${location}`);
        }
    }
}
