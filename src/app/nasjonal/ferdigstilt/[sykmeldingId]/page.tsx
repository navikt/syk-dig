import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import NasjonalOppgaveFerdigstiltView from '../../../../components/nasjonal-oppgave/NasjonalOppgaveFerdigstiltView'
import { getPersistentPaneLayout } from '../../../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Rediger mangler i nasjonal sykmelding',
}

function Page({ params }: { params: { sykmeldingId: string } }): ReactElement {
    return <NasjonalOppgaveFerdigstiltView sykmeldingId={params.sykmeldingId} layout={getPersistentPaneLayout()} />
}

export default Page
