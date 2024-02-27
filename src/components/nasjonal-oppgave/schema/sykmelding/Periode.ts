import { z } from 'zod'

export const MedisinskArsakTypeSchema = z.enum([
    'TILSTAND_HINDRER_AKTIVITET',
    'AKTIVITET_FORVERRER_TILSTAND',
    'AKTIVITET_FORHINDRER_BEDRING',
    'ANNET',
])
export type MedisinskArsakType = z.infer<typeof MedisinskArsakTypeSchema>

export const MedisinskArsakTypeValues: Record<MedisinskArsakType, string> = {
    TILSTAND_HINDRER_AKTIVITET: 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND: 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING: 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET: 'Annet',
}

export const MedisinskArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(MedisinskArsakTypeSchema),
})
export type MedisinskArsak = z.infer<typeof MedisinskArsakSchema>

export const ArbeidsrelatertArsakTypeSchema = z.enum(['MANGLENDE_TILRETTELEGGING', 'ANNET'])
export type ArbeidsrelatertArsakType = z.infer<typeof ArbeidsrelatertArsakTypeSchema>

export const ArbeidsrelatertArsakTypeValues: Record<ArbeidsrelatertArsakType, string> = {
    MANGLENDE_TILRETTELEGGING: 'Manglende tilrettelegging på arbeidsplassen',
    ANNET: 'Annet',
}

export const ArbeidsrelatertArsakSchema = z.object({
    beskrivelse: z.string().nullable(),
    arsak: z.array(ArbeidsrelatertArsakTypeSchema),
})
export type ArbeidsrelatertArsak = z.infer<typeof ArbeidsrelatertArsakSchema>

export const AktivitetIkkeMuligSchema = z.object({
    medisinskArsak: MedisinskArsakSchema.nullable(),
    arbeidsrelatertArsak: ArbeidsrelatertArsakSchema.nullable(),
})
export type AktivitetIkkeMulig = z.infer<typeof AktivitetIkkeMuligSchema>

export const GradertSchema = z.object({
    reisetilskudd: z.boolean(),
    grad: z.number().nullable(),
})
export type Gradert = z.infer<typeof GradertSchema>

export const PeriodeSchema = z.object({
    fom: z.string(),
    tom: z.string(),
    aktivitetIkkeMulig: AktivitetIkkeMuligSchema.nullable(),
    avventendeInnspillTilArbeidsgiver: z.string().nullable(),
    behandlingsdager: z.number().nullable(),
    gradert: GradertSchema.nullable(),
    reisetilskudd: z.boolean(),
})
export type Periode = z.infer<typeof PeriodeSchema>
