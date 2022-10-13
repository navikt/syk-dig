import { OppgaveFragment } from '../../graphql/queries/graphql.generated';

export function createOppgave(overrides?: Partial<OppgaveFragment>): OppgaveFragment {
    return {
        __typename: 'Digitaliseringsoppgave',
        oppgaveId: '987654321',
        person: {
            __typename: 'Person',
            navn: 'Ola Nordmann',
            fnr: '12345678910',
        },
        values: {
            __typename: 'OppgaveValues',
            fnrPasient: null,
            hoveddiagnose: null,
            biDiagnoser: null,
            behandletTidspunkt: null,
            skrevetLand: null,
        },
        ...overrides,
    };
}
