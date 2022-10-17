import { OppgaveFragment } from '../../graphql/queries/graphql.generated';
import { ModiaContext } from '../../modia/ModiaService';

export function createOppgave(overrides?: Partial<OppgaveFragment>): OppgaveFragment {
    return {
        __typename: 'Digitaliseringsoppgave',
        oppgaveId: '987654321',
        person: {
            __typename: 'Person',
            navn: 'Ola Nordmann',
            fnr: '12345678910',
            bostedsadresse: {
                __typename: 'Bostedsadresse',
                coAdressenavn: null,
                vegadresse: {
                    __typename: 'Vegadresse',
                    adressenavn: 'Kirkegata',
                    bruksenhetsnummer: 'H0101',
                    bydelsnummer: '030110',
                    husbokstav: 'B',
                    husnummer: '12',
                    kommunenummer: '4321',
                    postnummer: '1234',
                    poststed: 'Oslo',
                    tilleggsnavn: 'Storgården',
                },
                matrikkeladresse: {
                    __typename: 'Matrikkeladresse',
                    bruksenhetsnummer: 'H0101',
                    kommunenummer: '4321',
                    postnummer: '1234',
                    poststed: 'Oslo',
                    tilleggsnavn: 'Storgården',
                },
                utenlandskAdresse: null,
                ukjentBosted: {
                    __typename: 'UkjentBosted',
                    bostedskommune: '4321',
                },
            },
            oppholdsadresse: {
                __typename: 'Oppholdsadresse',
                coAdressenavn: null,
                vegadresse: null,
                matrikkeladresse: null,
                utenlandskAdresse: {
                    __typename: 'UtenlandskAdresse',
                    adressenavnNummer: null,
                    bySted: 'Haworth',
                    bygningEtasjeLeilighet: null,
                    landkode: 'SWE',
                    postboksNummerNavn: 'P.O.Box 1234 Place',
                    postkode: 'SE-12345',
                    regionDistriktOmraade: 'Yorkshire',
                },
                oppholdAnnetSted: 'UTENRIKS',
            },
        },
        values: {
            __typename: 'OppgaveValues',
            fnrPasient: null,
            hoveddiagnose: null,
            biDiagnoser: null,
            behandletTidspunkt: null,
            skrevetLand: null,
            perioder: null,
        },
        ...overrides,
    };
}

export function createModiaContext(overrides?: Partial<ModiaContext>): ModiaContext {
    return {
        navn: 'Testsaksbehandler',
        ident: 'A1337',
        aktivEnhet: 'B17',
        enheter: [
            { navn: 'Tromsø Kontaktsenter', enhetId: 'B17' },
            { navn: 'NAV Tøyen', enhetId: 'L99' },
        ],
        ...overrides,
    };
}
