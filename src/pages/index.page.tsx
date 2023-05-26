import type { NextPage } from 'next'
import { Alert, Heading, Label } from '@navikt/ds-react'
import Link from 'next/link'
import React from 'react'

import { withAuthenticatedPage } from '../auth/withAuth'
import { getModiaContext } from '../modia/ModiaService'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { getServerEnv } from '../utils/env'

const Home: NextPage = () => {
    return (
        <PageWrapper title="Digitalisering av Sykmeldinger">
            <Alert variant="warning" className="m-4 max-w-prose">
                <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
                <Label>Denne siden skal ikke vises i produksjon</Label>
            </Alert>

            <div className="m-4">
                <h2 className="mt-8 text-xl font-bold">Eksempler på oppgaver</h2>
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
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage(async (context, accessToken) => {
    const runtimeEnv = getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT
    if (runtimeEnv === 'production' || runtimeEnv === 'dev') {
        return { notFound: true }
    }

    const modiaContext = await getModiaContext(accessToken)

    return {
        props: {
            modiaContext,
        },
    }
})

export default Home
