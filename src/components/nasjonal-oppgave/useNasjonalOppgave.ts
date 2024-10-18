import { gql, QueryResult, useQuery } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { Oppgave } from './schema/oppgave/Oppgave'

export type OppgaveResult = {
    oppgave: Oppgave
}

export type FerdigstiltOppgaveVariables = {
    sykmeldingId: string
}

export function useFerdigstiltNasjonalOppgave(
    sykmeldingId: string,
): QueryResult<OppgaveResult, FerdigstiltOppgaveVariables> {
    return useQuery<OppgaveResult, FerdigstiltOppgaveVariables>(
        gql`
            query SmregOppgave($sykmeldingId: String!) {
                oppgave(id: $sykmeldingId) @rest(type: "Oppgave", path: "proxy/sykmelding/{args.id}/ferdigstilt") {
                    oppgaveid
                    papirSmRegistering
                    documents
                }
            }
        `,
        { variables: { sykmeldingId }, onError: logger.error },
    )
}

export type OppgaveVariables = {
    oppgaveId: string
}

export function useNasjonalOppgave(oppgaveId: string): QueryResult<OppgaveResult, OppgaveVariables> {
    return useQuery<OppgaveResult, OppgaveVariables>(
        gql`
            query SmregOppgave($oppgaveId: String!) {
                oppgave(id: $oppgaveId) @rest(type: "Oppgave", path: "proxy/oppgave/{args.id}") {
                    oppgaveid
                    papirSmRegistering
                    documents
                }
            }
        `,
        { variables: { oppgaveId: oppgaveId }, onError: logger.error },
    )
}
