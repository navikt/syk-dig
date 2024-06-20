import { z } from 'zod'

import { PapirsykmeldingSchema } from '../sykmelding/Papirsykmelding'

export type Oppgave = z.infer<typeof OppgaveSchema>
export const OppgaveSchema = z.object({
    // Ferdigstilt oppgave does not have oppgaveId
    oppgaveid: z.preprocess((value) => {
        if (value === 0) return null
        return `${value}`
    }, z.string().nullable()),
    papirSmRegistering: PapirsykmeldingSchema.nullable(),
    documents: z.array(
        z.object({
            dokumentInfoId: z.string(),
            tittel: z.string(),
        }),
    ),
})
