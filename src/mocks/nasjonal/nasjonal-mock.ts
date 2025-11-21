import {
    NasjonalOppdatertSykmeldingStatusEnum,
    NasjonalOppgaveFragment,
    NasjonalOppgaveStatusEnum,
    NasjonalOppgaveStatusFragment,
    NasjonalSykmeldingStatusFragment,
    Navn,
    Sykmelder,
} from '../../graphql/queries/graphql.generated'

import {
    createNasjonalOppgave,
    emptyNasjonalOppgave,
    createPasientNavn,
    createSykmelder,
} from './nasjonal-data-creators'

/**
 * Fake data singleton used for local development and testing.
 *
 * Allows for mutation of data, even when nextjs hot-reloads.
 */
export class NasjonalMock {
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
        'should-fail-submit': createNasjonalOppgave({
            oppgaveId: 'should-fail-submit',
        }),
        'should-rule-hit-submit': createNasjonalOppgave({
            oppgaveId: 'should-rule-hit-submit',
        }),
    }
    private _status_oppgave: Record<string, NasjonalOppgaveStatusFragment> = {
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
    private _status_ferdigstilt: Record<string, NasjonalSykmeldingStatusFragment> = {
        finnesikke: {
            __typename: 'NasjonalSykmeldingStatus',
            sykmeldingId: 'finnesikke',
            status: NasjonalOppdatertSykmeldingStatusEnum.FinnesIkke,
        },
        avvist: {
            __typename: 'NasjonalSykmeldingStatus',
            sykmeldingId: 'avvist',
            status: NasjonalOppdatertSykmeldingStatusEnum.Avvist,
        },
        ikkeensykmelding: {
            __typename: 'NasjonalSykmeldingStatus',
            sykmeldingId: 'ikkeensykmelding',
            status: NasjonalOppdatertSykmeldingStatusEnum.IkkeEnSykmelding,
        },
        ikkeferdigstilt: {
            __typename: 'NasjonalSykmeldingStatus',
            sykmeldingId: 'ikkeferdigstilt',
            status: NasjonalOppdatertSykmeldingStatusEnum.IkkeEnSykmelding,
        },
    }

    public getNasjonalOppgaveOrStatusByOppgaveId(
        oppgaveId: string,
    ): NasjonalOppgaveFragment | NasjonalOppgaveStatusFragment {
        const nasjonalOppgave: NasjonalOppgaveFragment | null = this.findOppgaveByOppgaveId(oppgaveId)
        if (nasjonalOppgave) {
            return nasjonalOppgave
        }

        const status: NasjonalOppgaveStatusFragment = this._status_oppgave[oppgaveId.toLowerCase()]
        if (status) {
            return status
        }

        throw new Error(`No oppgave or status found with id ${oppgaveId}`)
    }

    public getNasjonalOppgaveOrStatusBySykmeldingId(
        sykmeldingId: string,
    ): NasjonalOppgaveFragment | NasjonalSykmeldingStatusFragment {
        const nasjonalOppgave: NasjonalOppgaveFragment | null = this.findOppgaveBySykmeldingId(
            sykmeldingId.toLowerCase(),
        )
        if (nasjonalOppgave) {
            return nasjonalOppgave
        }

        const status: NasjonalSykmeldingStatusFragment = this._status_ferdigstilt[sykmeldingId.toLowerCase()]
        if (status) {
            return status
        }

        throw new Error(`No oppgave or status found with id ${sykmeldingId}`)
    }

    private findOppgaveByOppgaveId(oppgaveId: string): NasjonalOppgaveFragment | null {
        const nasjonalOppgave = Object.values(this._nasjonal_oppgaver).find(
            (oppgave: NasjonalOppgaveFragment) => oppgave.oppgaveId === oppgaveId,
        )
        if (nasjonalOppgave) {
            return nasjonalOppgave
        }
        return null
    }

    private findOppgaveBySykmeldingId(sykmeldingId: string): NasjonalOppgaveFragment | null {
        const nasjonalOppgave = Object.values(this._nasjonal_oppgaver).find(
            (oppgave: NasjonalOppgaveFragment) => oppgave.nasjonalSykmelding.sykmeldingId === sykmeldingId,
        )
        if (nasjonalOppgave) {
            return nasjonalOppgave
        }
        return null
    }

    public getPasientNavn(): Navn {
        return createPasientNavn()
    }

    public getSykmelder(): Sykmelder {
        return createSykmelder()
    }
}
