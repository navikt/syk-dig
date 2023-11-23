export interface DiagnoseSuggestion {
    code: string
    text: string
}

export interface DiagnoseSearchResult {
    suggestions: DiagnoseSuggestion[]
}
