import {
    DigitaliseringsoppgaveStatusEnum,
    DigitaliseringsoppgaveStatusFragment,
    DigitalisertSykmeldingResultFragment, NasjonalOppgaveFragment,
    OppgaveFragment,
    PeriodeType,
} from '../../graphql/queries/graphql.generated'

import { createOppgave } from './dataCreators'

/**
 * Fake data singleton used for local development and testing.
 *
 * Allows for mutation of data, even when nextjs hot-reloads.
 */
export class FakeMockDB {
    private _oppgaver: Record<string, OppgaveFragment> = {
        blank: createOppgave({ oppgaveId: 'blank-id' }),
        eksisterende: createOppgave({
            documents: [
                {
                    __typename: 'Document',
                    dokumentInfoId: 'primary',
                    tittel: 'Sykmelding',
                },
                {
                    __typename: 'Document',
                    dokumentInfoId: '12345',
                    tittel: 'Sykmelding-doc-2',
                },
            ],
            oppgaveId: 'eksisterende',
            values: {
                __typename: 'OppgaveValues',
                fnrPasient: '12345678910',
                perioder: [
                    {
                        __typename: 'PeriodeValue',
                        type: PeriodeType.AktivitetIkkeMulig,
                        fom: '2020-01-01',
                        tom: '2020-01-15',
                        grad: null,
                    },
                ],
                hoveddiagnose: {
                    __typename: 'DiagnoseValue',
                    kode: 'Z27',
                    system: 'ICD10',
                    tekst: 'Angst & depresjon, name a more icon duo',
                },
                biDiagnoser: [
                    {
                        __typename: 'DiagnoseValue',
                        kode: 'EL8PV',
                        system: 'ICD10',
                        tekst: 'Radioproblematikk',
                    },
                    {
                        __typename: 'DiagnoseValue',
                        kode: 'GZF4',
                        system: 'ICPC2',
                        tekst: 'Knekker i to',
                    },
                ],
                behandletTidspunkt: '2021-01-01T13:37:00.000Z',
                skrevetLand: 'NOR',
                erAdresseUtland: false,
                folkeRegistertAdresseErBrakkeEllerTilsvarende: false,
            },
        }),
    }
    private _status: Record<string, DigitaliseringsoppgaveStatusFragment> = {
        ferdigstilt: {
            __typename: 'DigitaliseringsoppgaveStatus',
            oppgaveId: 'ferdigstilt',
            status: DigitaliseringsoppgaveStatusEnum.Ferdigstilt,
        },
        finnesikke: {
            __typename: 'DigitaliseringsoppgaveStatus',
            oppgaveId: 'finnesikke',
            status: DigitaliseringsoppgaveStatusEnum.FinnesIkke,
        },
        avvist: {
            __typename: 'DigitaliseringsoppgaveStatus',
            oppgaveId: 'finnesikke',
            status: DigitaliseringsoppgaveStatusEnum.Avvist,
        },
        ikkeensykmelding: {
            __typename: 'DigitaliseringsoppgaveStatus',
            oppgaveId: 'ikkeensykmelding',
            status: DigitaliseringsoppgaveStatusEnum.IkkeEnSykmelding,
        },
    }

    public saveDocument(oppgaveId: string, dokumentId: string, tittel: string): void {
        const oppgave = this._oppgaver[oppgaveId.toLowerCase()]
        oppgave.documents = oppgave.documents.map((it) => {
            if (it.dokumentInfoId === dokumentId) {
                return { __typename: 'Document', tittel: tittel, dokumentInfoId: dokumentId }
            } else {
                return it
            }
        })
        this._oppgaver[oppgaveId.toLowerCase()] = oppgave
    }

    public getOppgaveOrStatus(oppgaveId: string): OppgaveFragment | DigitaliseringsoppgaveStatusFragment {
        const oppgave = this._oppgaver[oppgaveId.toLowerCase()]
        if (oppgave) {
            return oppgave
        }

        const status = this._status[oppgaveId.toLowerCase()]
        if (status) {
            return status
        }

        throw new Error(`No oppgave or status found with id ${oppgaveId}`)
    }

    public getOppgave(oppgaveId: string): OppgaveFragment {
        const oppgave = this._oppgaver[oppgaveId.toLowerCase()]
        if (!oppgave) {
            throw new Error(`No oppgave found with id ${oppgaveId}`)
        }
        return oppgave
    }


    public getNasjonalOppgave(oppgaveId: string): NasjonalOppgaveFragment {
        const oppgave = this._oppgaver[oppgaveId.toLowerCase()]
        if (!oppgave) {
            throw new Error(`No oppgave found with id ${oppgaveId}`)
        }
        return {
            nasjonalSykmelding: {__typename: "NasjonalSykmelding", journalpostId: "", perioder: []},
            __typename: 'NasjonalOppgave',
            documents: oppgave.documents,
            oppgaveId: oppgave.oppgaveId
        }
    }

    public getDigitalisertSykmelding(sykmeldingId: string): DigitalisertSykmeldingResultFragment {
        const oppgave = this._oppgaver[sykmeldingId.toLowerCase()]
        if (!oppgave) {
            throw new Error(`No sykmelding found with id ${sykmeldingId}`)
        }
        return {
            __typename: 'DigitalisertSykmelding',
            documents: oppgave.documents,
            values: oppgave.values,
            person: oppgave.person,
            sykmeldingId: sykmeldingId,
            oppgaveId: oppgave.oppgaveId,
        }
    }
}
