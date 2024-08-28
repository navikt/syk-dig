import { ReactElement } from 'react'
import { Metadata } from 'next'

import RegistrerSykmeldingView from '../../components/registrer-sykmelding/RegistrerSykmeldingView'
import { getPersistentPaneLayout } from '../../components/split-view-layout/persistent-layout'

export const metadata: Metadata = {
    title: 'Registrer sykmelding',
}

function RegistrerSykmelding(): ReactElement {
    return <RegistrerSykmeldingView layout={getPersistentPaneLayout()} />
}

export default RegistrerSykmelding
