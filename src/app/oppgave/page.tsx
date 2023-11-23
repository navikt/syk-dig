import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import UtenlandskOppgaveView from '../../components/utenlandsk-oppgave/UtenlandskOppgaveView'

export const metadata: Metadata = {
    title: 'Registrer mangler i utenlandsk sykmelding',
}

function Page(): ReactElement {
    return <UtenlandskOppgaveView />
}

export default Page
