import { z } from 'zod'

export const PasientNavnSchema = z.object({
    fornavn: z.string(),
    etternavn: z.string(),
    mellomnavn: z.string().nullable(),
})
export type PasientNavn = z.infer<typeof PasientNavnSchema>
