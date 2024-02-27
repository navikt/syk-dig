import { z } from 'zod'

import { PapirsykmeldingSchema } from '../sykmelding/Papirsykmelding'

export type Oppgave = z.infer<typeof OppgaveSchema>
export const OppgaveSchema = z.object({
    oppgaveid: z.number().transform((it) => `${it}`),
    papirSmRegistering: PapirsykmeldingSchema.nullable(),
    documents: z.array(
        z.object({
            dokumentInfoId: z.string(),
            tittel: z.string(),
        }),
    ),
})
