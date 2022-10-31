import { z } from 'zod'

export type Veileder = z.infer<typeof VeilederSchema>
export const VeilederSchema = z.object({
    ident: z.string(),
    navn: z.string(),
    enheter: z.array(
        z.object({
            enhetId: z.string(),
            navn: z.string(),
        }),
    ),
})

export type AktivEnhet = z.infer<typeof AktivEnhetSchema>
export const AktivEnhetSchema = z.object({
    aktivEnhet: z.string().nullable(),
})
