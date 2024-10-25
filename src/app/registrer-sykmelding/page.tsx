import { ReactElement } from 'react'
import { Metadata } from 'next'

import RegistrerSykmeldingView from '../../components/registrer-sykmelding/RegistrerSykmeldingView'
import { getPersistentPaneLayout } from '../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Registrer sykmelding',
}

async function RegistrerSykmelding(): Promise<ReactElement> {
    return <RegistrerSykmeldingView layout={await getPersistentPaneLayout()} />
}

export default RegistrerSykmelding
