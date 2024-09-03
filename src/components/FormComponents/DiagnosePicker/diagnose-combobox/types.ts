export type DiagnoseSystem = 'ICD10' | 'ICPC2'

export type DiagnoseFormValue = { system: DiagnoseSystem; code: string | null; text: string | null }

export type DiagnoseSuggestion = { code: string; text: string }
