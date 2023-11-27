import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import UtenlandskOppgaveView from '../../../components/utenlandsk-oppgave/UtenlandskOppgaveView'

export const metadata: Metadata = {
    title: 'Registrer mangler i utenlandsk sykmelding',
}

function Page({ params }: { params: { oppgaveId: string } }): ReactElement {
    return <UtenlandskOppgaveView oppgaveId={params.oppgaveId} />
}

export default Page
