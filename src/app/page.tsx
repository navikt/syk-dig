import { GuidePanel } from '@navikt/ds-react'
import { Metadata } from 'next'
import { ReactElement } from 'react'

import { AkselNextLink } from '../components/link/AkselNextLink'
import { isLocalOrDemo } from '../utils/env'

import DevScenarios from './_dev-scenarios'

export const metadata: Metadata = {
    title: 'Registreringsløsning for Sykmeldinger',
    description: 'Intern applikasjon registrering av sykmelding med JournalpostID',
}

function Home(): ReactElement {
    return (
        <div className="container mx-auto p-8">
            <GuidePanel className="max-w-prose">
                Dette er en registreringsløsning for sykmeldinger. Her kan du registrere sykmeldinger som er sendt inn
                med mangler.
            </GuidePanel>
            <div className="mt-8">
                <AkselNextLink href="/registrer-sykmelding">Registrer Sykmelding fra JournalpostID</AkselNextLink>
            </div>
            {isLocalOrDemo && <DevScenarios />}
        </div>
    )
}

export default Home
