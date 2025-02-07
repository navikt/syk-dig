import {
    NasjonalOppgaveFragment,
    NasjonalOppgaveStatusEnum,
    NasjonalOppgaveStatusFragment,
} from '../../../../graphql/queries/graphql.generated'

import { createNasjonalOppgave, emptyNasjonalOppgave } from './dataCreators'

/**
 * Fake data singleton used for local development and testing.
 *
 * Allows for mutation of data, even when nextjs hot-reloads.
 */
export class FakeNasjonalMockDB {
    private _nasjonal_oppgaver: Record<string, NasjonalOppgaveFragment> = {
        tomOppgave: emptyNasjonalOppgave({
            oppgaveId: '000000000',
        }),
        fullOppgave: createNasjonalOppgave({
            oppgaveId: '123456789',
        }),
        oppgaveMedEnPeriode: createNasjonalOppgave({
            oppgaveId: '111111111',
            ...createNasjonalOppgave,
            nasjonalSykmelding: {
                ...createNasjonalOppgave().nasjonalSykmelding,
                perioder: [
                    {
                        __typename: 'Periode',
                        fom: '2025-01-01',
                        tom: '2025-01-15',
                        aktivitetIkkeMulig: null,
                        avventendeInnspillTilArbeidsgiver: 'Må avvente',
                        behandlingsdager: null,
                        gradert: null,
                        reisetilskudd: false,
                    },
                ],
            },
        }),
    }
    private _status: Record<string, NasjonalOppgaveStatusFragment> = {
        ferdigstilt: {
            __typename: 'NasjonalOppgaveStatus',
            oppgaveId: 'ferdigstilt',
            status: NasjonalOppgaveStatusEnum.Ferdigstilt,
        },
        finnesikke: {
            __typename: 'NasjonalOppgaveStatus',
            oppgaveId: 'finnesikke',
            status: NasjonalOppgaveStatusEnum.FinnesIkke,
        },
        avvist: {
            __typename: 'NasjonalOppgaveStatus',
            oppgaveId: 'avvist',
            status: NasjonalOppgaveStatusEnum.Avvist,
        },
        ikkeensykmelding: {
            __typename: 'NasjonalOppgaveStatus',
            oppgaveId: 'ikkeensykmelding',
            status: NasjonalOppgaveStatusEnum.IkkeEnSykmelding,
        },
    }

    public getNasjonalOppgaveOrStatus(oppgaveId: string): NasjonalOppgaveFragment | NasjonalOppgaveStatusFragment {
        const nasjonalOppgave: NasjonalOppgaveFragment | null = this.findOppgaveById(oppgaveId)
        if (nasjonalOppgave) {
            return nasjonalOppgave
        }

        const status: NasjonalOppgaveStatusFragment = this._status[oppgaveId.toLowerCase()]
        if (status) {
            return status
        }

        throw new Error(`No oppgave or status found with id ${oppgaveId}`)
    }

    private findOppgaveById(oppgaveId: string): NasjonalOppgaveFragment | null {
        const nasjonalOppgave = Object.values(this._nasjonal_oppgaver).find(
            (oppgave: NasjonalOppgaveFragment) => oppgave.oppgaveId === oppgaveId,
        )
        if (nasjonalOppgave) {
            return nasjonalOppgave
        }
        return null
    }
}
