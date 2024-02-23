import { OppgaveFragment } from '../../graphql/queries/graphql.generated'
import { ModiaContext } from '../../modia/ModiaService'

export function createOppgave(overrides?: Partial<OppgaveFragment>): OppgaveFragment {
    return {
        __typename: 'Digitaliseringsoppgave',
        oppgaveId: '987654321',
        documents: [
            {
                __typename: 'Document',
                tittel: 'annet_dokument.pdf',
                dokumentInfoId: `some-doc`,
            },
            {
                __typename: 'Document',
                tittel: 'more-doc.pdf',
                dokumentInfoId: 'more-doc.pdf',
            },
        ],
        person: {
            __typename: 'Person',
            navn: 'Ola Nordmann',
            bostedsadresse: {
                __typename: 'Vegadresse',
                adressenavn: 'Kirkegata',
                husbokstav: 'B',
                husnummer: '12',
                postnummer: '1234',
                poststed: 'Oslo',
            },
            oppholdsadresse: {
                __typename: 'UtenlandskAdresse',
                adressenavnNummer: null,
                bySted: 'Haworth',
                landkode: 'SWE',
                postboksNummerNavn: 'P.O.Box 1234 Place',
                postkode: 'SE-12345',
            },
        },
        values: {
            __typename: 'OppgaveValues',
            fnrPasient: 'fnr-pasient',
            hoveddiagnose: null,
            biDiagnoser: null,
            behandletTidspunkt: null,
            skrevetLand: null,
            perioder: null,
            folkeRegistertAdresseErBrakkeEllerTilsvarende: null,
            erAdresseUtland: null,
        },
        ...overrides,
    }
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
    }
}
