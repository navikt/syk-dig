import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import UtenlandskOppgaveView from '../../../components/utenlandsk-oppgave/UtenlandskOppgaveView'
import { getPersistentPaneLayout } from '../../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Registrer mangler i utenlandsk sykmelding',
}

function Page({ params }: { params: { oppgaveId: string } }): ReactElement {
    return <UtenlandskOppgaveView oppgaveId={params.oppgaveId} layout={getPersistentPaneLayout()} />
}

export default Page
