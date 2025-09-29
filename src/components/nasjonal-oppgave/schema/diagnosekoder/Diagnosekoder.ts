import * as z from 'zod'

export enum DiagnosekodeSystem {
    ICD10 = '2.16.578.1.12.4.1.1.7110',
    ICPC2 = '2.16.578.1.12.4.1.1.7170',
}

export const DiagnosekodeSchema = z.object({
    code: z.string(),
    text: z.string(),
})
export type Diagnosekode = z.infer<typeof DiagnosekodeSchema>
