import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import NasjonalOppgaveView from '../../../components/nasjonal-oppgave/NasjonalOppgaveView'
import { getPersistentPaneLayout } from '../../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Registrer mangler i nasjonal sykmelding',
}

async function Page({ params }: { params: Promise<{ oppgaveId: string }> }): Promise<ReactElement> {
    const { oppgaveId } = await params

    return <NasjonalOppgaveView oppgaveId={oppgaveId} layout={await getPersistentPaneLayout()} />
}

export default Page
