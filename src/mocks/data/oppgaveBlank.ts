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
        personNrPasient: null,
        hoveddiagnose: null,
        biDiagnoser: null,
        behandletTidspunkt: null,
        skrevetLand: null,
    },
};

export default oppgave;
