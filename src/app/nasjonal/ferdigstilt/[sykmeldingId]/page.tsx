import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import NasjonalOppgaveFerdigstiltView from '../../../../components/nasjonal-oppgave/NasjonalOppgaveFerdigstiltView'

export const metadata: Metadata = {
    title: 'Rediger mangler i nasjonal sykmelding',
}

function Page({ params }: { params: { sykmeldingId: string } }): ReactElement {
    return <NasjonalOppgaveFerdigstiltView sykmeldingId={params.sykmeldingId} />
}

export default Page
