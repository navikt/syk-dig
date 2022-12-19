export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}
const result: PossibleTypesResultData = {
    possibleTypes: {
        Bostedsadresse: ['Matrikkeladresse', 'UkjentBosted', 'UtenlandskAdresse', 'Vegadresse'],
        DigitaliseringsoppgaveResult: ['Digitaliseringsoppgave', 'DigitaliseringsoppgaveStatus'],
        Oppholdsadresse: ['Matrikkeladresse', 'OppholdAnnetSted', 'UtenlandskAdresse', 'Vegadresse'],
    },
}
export default result
