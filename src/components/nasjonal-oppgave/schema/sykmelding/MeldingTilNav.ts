import { z } from 'zod'

export const MeldingTilNAVSchema = z.object({
    bistandUmiddelbart: z.boolean(),
    beskrivBistand: z.string().nullable(),
})
export type MeldingTilNAV = z.infer<typeof MeldingTilNAVSchema>
