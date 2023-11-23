import React, { ReactElement } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Heading, Label, Alert } from '@navikt/ds-react'

export const metadata: Metadata = {
    title: 'Testside for syk-dig',
}

function Page(): ReactElement {
    return (
        <div>
            <Alert variant="warning" className="m-4 max-w-prose">
                <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
                <Label>Denne siden skal ikke vises i produksjon</Label>
            </Alert>

            <div className="m-4">
                <h2 className="mt-8 text-xl font-bold">Eksempler på oppgaver</h2>
                <ul className="list-disc pl-8">
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/eksisterende" prefetch={false}>
                            Oppgave med eksisterende data
                        </Link>
                    </li>
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/blank" prefetch={false}>
                            Oppgave uten eksisterende data
                        </Link>
                    </li>
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/ferdigstilt" prefetch={false}>
                            Oppgave med status Ferdigstilt
                        </Link>
                    </li>
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/finnesikke" prefetch={false}>
                            Oppgave med status FinnesIkke
                        </Link>
                    </li>
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/avvist" prefetch={false}>
                            Oppgave med status Avvist
                        </Link>
                    </li>
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/ikkeensykmelding" prefetch={false}>
                            Oppgave med status IkkeEnSykmelding
                        </Link>
                    </li>
                    <li>
                        <Link href="/src/components/utenlandsk-oppgave/oppgave/bare-tull" prefetch={false}>
                            Oppgave som ikke vil laste og vise en ukjent feil
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Page
