import { gql, QueryResult, useQuery } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { Oppgave } from './schema/oppgave/Oppgave'

type OppgaveResult = {
    oppgave: Oppgave
}

type FerdigstiltOppgaveVariables = { sykmeldingId: string }
export function useFerdigstiltNasjonalOppgave(
    sykmeldingId: string,
): QueryResult<OppgaveResult, FerdigstiltOppgaveVariables> {
    return useQuery<OppgaveResult, FerdigstiltOppgaveVariables>(
        gql`
            query SmregOppgave($sykmeldingId: String!) {
                oppgave(id: $sykmeldingId) @rest(type: "Oppgave", path: "sykmelding/{args.id}/ferdigstilt") {
                    oppgaveid
                    papirSmRegistering
                }
            }
        `,
        { variables: { sykmeldingId }, onError: logger.error },
    )
}

type OppgaveVariables = { oppgaveId: string }
export function useNasjonalOppgave(oppgaveId: string): QueryResult<OppgaveResult, OppgaveVariables> {
    return useQuery<OppgaveResult, OppgaveVariables>(
        gql`
            query SmregOppgave($oppgaveId: String!) {
                oppgave(id: $oppgaveId) @rest(type: "Oppgave", path: "oppgave/{args.id}") {
                    oppgaveid
                    papirSmRegistering
                }
            }
        `,
        { variables: { oppgaveId: oppgaveId }, onError: logger.error },
    )
}
