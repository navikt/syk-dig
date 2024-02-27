import { z } from 'zod'

import { ArbeidsgiverSchema } from './Arbeidsgiver'
import { BehandlerSchema } from './Behandler'
import { KontaktMedPasientSchema } from './KontaktMedPasient'
import { MedisinskVurderingSchema } from './MedisinskVurdering'
import { MeldingTilNAVSchema } from './MeldingTilNav'
import { PeriodeSchema } from './Periode'

export type RegistrertSykmelding = z.infer<typeof RegistrertSykmeldingSchema>
export const RegistrertSykmeldingSchema = z.object({
    pasientFnr: z.string(),
    sykmelderFnr: z.string(),
    perioder: z.array(PeriodeSchema),
    medisinskVurdering: MedisinskVurderingSchema,
    arbeidsgiver: ArbeidsgiverSchema,
    behandletDato: z.string(),
    skjermesForPasient: z.boolean(),
    behandler: BehandlerSchema,
    kontaktMedPasient: KontaktMedPasientSchema,
    syketilfelleStartDato: z.string().nullable(),
    meldingTilNAV: MeldingTilNAVSchema.nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    harUtdypendeOpplysninger: z.boolean().nullable(),
    navnFastlege: z.string().nullable(),
})
