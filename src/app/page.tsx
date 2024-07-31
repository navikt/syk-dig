import Link from 'next/link'
import { ReactElement } from 'react'
import { GuidePanel } from '@navikt/ds-react'

import { isLocalOrDemo } from '../utils/env'

import DevScenarios from './_dev-scenarios'

function Home(): ReactElement {
    return (
        <div className="container p-4 mx-auto p-8">
            <GuidePanel className="max-w-prose">
                Dette er en registreringsløsning for sykmeldinger. Her kan du registrere sykmeldinger som er sendt inn
                med mangler.
            </GuidePanel>
            <div className="mt-8">
                <Link href="/registrer-sykmelding">Registrer Sykmelding fra JournalpostID</Link>
            </div>
            {isLocalOrDemo && <DevScenarios />}
        </div>
    )
}

export default Home
