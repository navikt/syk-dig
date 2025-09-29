import * as z from 'zod'

export const HarArbeidsgiverSchema = z.enum(['EN_ARBEIDSGIVER', 'FLERE_ARBEIDSGIVERE', 'INGEN_ARBEIDSGIVER'])
export type HarArbeidsgiver = z.infer<typeof HarArbeidsgiverSchema>

export const HarArbeidsgiverValues: Record<HarArbeidsgiver, string> = {
    EN_ARBEIDSGIVER: 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE: 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER: 'Ingen arbeidsgiver',
}

export const ArbeidsgiverSchema = z.object({
    harArbeidsgiver: HarArbeidsgiverSchema,
    navn: z.string().nullable(),
    yrkesbetegnelse: z.string().nullable(),
    stillingsprosent: z.number().nullable(),
})
export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>
