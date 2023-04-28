import { OppgaveFragment, PeriodeType } from '../../graphql/queries/graphql.generated'

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
                    dokumentInfoId: '1234',
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
                harAndreRelevanteOpplysninger: false,
            },
        }),
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

    public getOppgave(oppgaveId: string): OppgaveFragment {
        const oppgave = this._oppgaver[oppgaveId.toLowerCase()]
        if (!oppgave) {
            throw new Error(`No oppgave found with id ${oppgaveId}`)
        }
        return oppgave
    }
}
