import { Metadata } from 'next'
import React, { ReactElement } from 'react'

import { getPersistentPaneLayout } from '../../../components/split-view-layout/persistent-layout'
import UtenlandskOppgaveView from '../../../components/utenlandsk-oppgave/UtenlandskOppgaveView'

export const metadata: Metadata = {
    title: 'Registrer mangler i utenlandsk sykmelding',
}

async function Page({ params }: PageProps<'/utenlandsk/[oppgaveId]'>): Promise<ReactElement> {
    const { oppgaveId } = await params

    return <UtenlandskOppgaveView oppgaveId={oppgaveId} layout={await getPersistentPaneLayout()} />
}

export default Page
