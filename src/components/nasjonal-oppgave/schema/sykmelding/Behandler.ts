import { z } from 'zod'

const AdresseSchema = z.object({
    gate: z.string().nullable(),
    postnummer: z.number().nullable(),
    kommune: z.string().nullable(),
    postboks: z.string().nullable(),
    land: z.string().nullable(),
})

export const BehandlerSchema = z.object({
    fornavn: z.string(),
    mellomnavn: z.string().nullable(),
    etternavn: z.string(),
    aktoerId: z.string(),
    fnr: z.string(),
    hpr: z.string().nullable(),
    her: z.string().nullable(),
    adresse: AdresseSchema,
    tlf: z.string().nullable(),
})
export type Behandler = z.infer<typeof BehandlerSchema>
