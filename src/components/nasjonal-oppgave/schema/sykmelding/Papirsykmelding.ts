import { z } from 'zod'

import { ArbeidsgiverSchema } from './Arbeidsgiver'
import { BehandlerSchema } from './Behandler'
import { KontaktMedPasientSchema } from './KontaktMedPasient'
import { MedisinskVurderingSchema } from './MedisinskVurdering'
import { MeldingTilNAVSchema } from './MeldingTilNav'
import { PeriodeSchema } from './Periode'

export const PapirsykmeldingSchema = z.object({
    fnr: z.string().nullable(),
    datoOpprettet: z.string().nullable(),
    syketilfelleStartDato: z.string().nullable(),
    arbeidsgiver: ArbeidsgiverSchema.nullable(),
    medisinskVurdering: MedisinskVurderingSchema.nullable(),
    skjermesForPasient: z.boolean().nullable(),
    perioder: z.array(PeriodeSchema).nullable(),
    meldingTilNAV: MeldingTilNAVSchema.nullable(),
    meldingTilArbeidsgiver: z.string().nullable(),
    kontaktMedPasient: KontaktMedPasientSchema.nullable(),
    behandletTidspunkt: z.string().nullable(),
    behandler: BehandlerSchema.nullable(),
})
export type Papirsykmelding = z.infer<typeof PapirsykmeldingSchema>
