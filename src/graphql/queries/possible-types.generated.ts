export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}
const result: PossibleTypesResultData = {
    possibleTypes: {
        Bostedsadresse: ['Matrikkeladresse', 'UkjentBosted', 'UtenlandskAdresse', 'Vegadresse'],
        DigitaliseringsoppgaveResult: ['Digitaliseringsoppgave', 'DigitaliseringsoppgaveStatus'],
        DigitalisertSykmeldingResult: ['DigitalisertSykmelding', 'OppdatertSykmeldingStatus'],
        JournalpostResult: ['Journalpost', 'JournalpostStatus'],
        NasjonalOppgaveResult: ['NasjonalOppgave', 'NasjonalOppgaveStatus'],
        NasjonalSykmeldingResult: ['NasjonalOppgave', 'NasjonalSykmeldingStatus'],
        Oppholdsadresse: ['Matrikkeladresse', 'OppholdAnnetSted', 'UtenlandskAdresse', 'Vegadresse'],
    },
}
export default result
