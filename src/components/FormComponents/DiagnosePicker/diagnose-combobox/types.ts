export type DiagnoseSystem = 'ICD10' | 'ICPC2'

export type Diagnose = { system: DiagnoseSystem; code: string; text: string }
