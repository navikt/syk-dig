import { Heading, Alert } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import { AkselNextLink as Link } from '../components/link/AkselNextLink'

function DevScenarios(): ReactElement {
    return (
        <div className="border rounded-sm max-w-prose mt-16 mb-8">
            <Alert variant="info" className="m-4 max-w-prose">
                <Heading size="medium">Demo-scenarioer (vises ikke i prod)</Heading>
            </Alert>

            <div className="m-4">
                <h2 className="mt-8 text-xl font-ax-bold">Eksempler på utenlandske oppgaver</h2>
                <ul className="list-disc pl-8">
                    <li>
                        <Link href="/oppgave/eksisterende">Oppgave med eksisterende data</Link>
                    </li>
                    <li>
                        <Link href="/oppgave/blank">Oppgave uten eksisterende data</Link>
                    </li>
                    <li>
                        <Link href="/oppgave/ferdigstilt">Oppgave med status Ferdigstilt</Link>
                    </li>
                    <li>
                        <Link href="/oppgave/finnesikke">Oppgave med status FinnesIkke</Link>
                    </li>
                    <li>
                        <Link href="/oppgave/avvist">Oppgave med status Avvist</Link>
                    </li>
                    <li>
                        <Link href="/oppgave/ikkeensykmelding">Oppgave med status IkkeEnSykmelding</Link>
                    </li>
                    <li>
                        <Link href="/oppgave/bare-tull">Oppgave som ikke vil laste og vise en ukjent feil</Link>
                    </li>
                </ul>
            </div>

            <div className="m-4">
                <h2 className="mt-8 text-xl font-ax-bold">Eksempler på nasjonale oppgaver (smregistrering)</h2>
                <ul className="list-disc pl-8">
                    <li>
                        <Link href="/nasjonal/123456789">Ny oppgave</Link>
                    </li>
                    <li>
                        <Link href="/nasjonal/ferdigstilt/3edded4c-2654-447d-a210-94ca8eb31801">
                            Redigering av sykmelding
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DevScenarios
