import { z } from 'zod'

export const KontaktMedPasientSchema = z.object({
    kontaktDato: z.string().nullable(),
    begrunnelseIkkeKontakt: z.string().nullable(),
})
export type KontaktMedPasient = z.infer<typeof KontaktMedPasientSchema>
