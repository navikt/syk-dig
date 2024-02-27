import { z } from 'zod'

import { PapirsykmeldingSchema } from '../sykmelding/Papirsykmelding'

export type Oppgave = z.infer<typeof OppgaveSchema>
export const OppgaveSchema = z.object({
    oppgaveid: z.number(),
    // TODO: add documents
    papirSmRegistering: PapirsykmeldingSchema.nullable(),
})
