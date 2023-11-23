import { ReactElement } from 'react'
import { Metadata } from 'next'

import RegistrerSykmeldingView from '../../components/registrer-sykmelding/RegistrerSykmeldingView'

export const metadata: Metadata = {
    title: 'Registrer sykmelding',
}

function RegistrerSykmelding(): ReactElement {
    return <RegistrerSykmeldingView />
}

export default RegistrerSykmelding
