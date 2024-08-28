import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import NasjonalOppgaveView from '../../../components/nasjonal-oppgave/NasjonalOppgaveView'
import { getPersistentPaneLayout } from '../../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Registrer mangler i nasjonal sykmelding',
}

function Page({ params }: { params: { oppgaveId: string } }): ReactElement {
    return <NasjonalOppgaveView oppgaveId={params.oppgaveId} layout={getPersistentPaneLayout()} />
}

export default Page
