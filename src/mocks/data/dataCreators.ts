import { Digitaliseringsoppgave } from '../mock-resolvers.generated'

export function createDigitaliseringsoppgave(overrides?: Partial<Digitaliseringsoppgave>): Digitaliseringsoppgave {
    return {
        __typename: 'Digitaliseringsoppgave',
        oppgaveId: '987654321',
        type: 'INNENLANDS',
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
