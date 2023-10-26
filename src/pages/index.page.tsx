import type { NextPage } from 'next'
import { Alert, GuidePanel, Heading, Label } from '@navikt/ds-react'
import Link from 'next/link'

import { withAuthenticatedPage } from '../auth/withAuth'
import { getModiaContext } from '../modia/ModiaService'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { getServerEnv } from '../utils/env'
import { getFlagsServerSide } from '../toggles/ssr'

const Home: NextPage = () => {
    return (
        <PageWrapper title="Digitalisering av Sykmeldinger">
            <div className="container p-4 mx-auto">
                <GuidePanel>Dette er en registeringsløsning ..</GuidePanel>
                <Link href="/registrer-sykmelding">Registrer Sykmelding</Link>
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
    const flags = await getFlagsServerSide(context.req, context.res)

    return {
        props: {
            modiaContext,
            toggles: flags.toggles,
        },
    }
})

export default Home
