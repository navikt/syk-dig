import { OppgaveByIdQuery } from '../../graphql/queries/graphql.generated';

const oppgave: OppgaveByIdQuery['oppgave'] = {
    __typename: 'Digitaliseringsoppgave',
    oppgaveId: '123',
    person: {
        __typename: 'Person',
        navn: 'Ola Nordmann',
        fnr: '12345678910',
    },
    values: {
        __typename: 'OppgaveValues',
        personNrPasient: '12345678910',
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
        skrevetLand: 'NO',
    },
};

export default oppgave;
