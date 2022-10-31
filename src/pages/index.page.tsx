import type { NextPage } from 'next'
import { Heading, Label } from '@navikt/ds-react'
import Link from 'next/link'
import React from 'react'

import { withAuthenticatedPage } from '../auth/withAuth'
import { getModiaContext } from '../modia/ModiaService'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { getPublicEnv } from '../utils/env'

const Home: NextPage = () => {
    return (
        <PageWrapper title="Digitalisering av Sykmeldinger">
            <Heading size="medium">Digitalisering av Sykmeldinger</Heading>
            <Label>Denne siden skal ikke vises i produksjon</Label>

            <ul>
                <li>
                    <Link href="/utenlandsk/eksisterende">Eksempel utenlansk oppgave med eksisterende data</Link>
                </li>
                <li>
                    <Link href="/utenlandsk/blank">Eksempel utenlansk oppgave uten eksisterende data</Link>
                </li>
            </ul>
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage(async (context, accessToken) => {
    if (getPublicEnv().runtimeEnv === 'production') {
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
