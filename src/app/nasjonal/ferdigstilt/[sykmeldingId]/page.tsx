import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import NasjonalOppgaveFerdigstiltView from '../../../../components/nasjonal-oppgave/NasjonalOppgaveFerdigstiltView'
import { getPersistentPaneLayout } from '../../../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Rediger mangler i nasjonal sykmelding',
}

async function Page({ params }: { params: Promise<{ sykmeldingId: string }> }): Promise<ReactElement> {
    const { sykmeldingId } = await params

    return <NasjonalOppgaveFerdigstiltView sykmeldingId={sykmeldingId} layout={await getPersistentPaneLayout()} />
}

export default Page
