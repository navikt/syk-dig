export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}
const result: PossibleTypesResultData = {
    possibleTypes: {
        Bostedsadresse: ['Matrikkeladresse', 'UkjentBosted', 'UtenlandskAdresse', 'Vegadresse'],
        DigitaliseringsoppgaveResult: ['Digitaliseringsoppgave', 'DigitaliseringsoppgaveStatus'],
        JournalpostResult: ['Journalpost', 'JournalpostStatus'],
        Oppholdsadresse: ['Matrikkeladresse', 'OppholdAnnetSted', 'UtenlandskAdresse', 'Vegadresse'],
    },
}
export default result
