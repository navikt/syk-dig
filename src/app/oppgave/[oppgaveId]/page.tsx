import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import UtenlandskOppgaveView from '../../../components/utenlandsk-oppgave/UtenlandskOppgaveView'
import { getPersistentPaneLayout } from '../../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Registrer mangler i utenlandsk sykmelding',
}

async function Page({ params }: PageProps<'/oppgave/[oppgaveId]'>): Promise<ReactElement> {
    const { oppgaveId } = await params

    return <UtenlandskOppgaveView oppgaveId={oppgaveId} layout={await getPersistentPaneLayout()} />
}

export default Page
