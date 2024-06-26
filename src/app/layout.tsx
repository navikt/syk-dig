import '../style/global.css'
import { PropsWithChildren, ReactElement } from 'react'
import { Metadata } from 'next'

import { getToggles } from '../toggles/rsc'
import { getModiaContext } from '../modia/ModiaService'
import { verifyUserLoggedIn } from '../auth/rsc'
import PageHeader from '../components/PageHeader/PageHeader'

import Providers from './_providers'

export const metadata: Metadata = {
    title: 'Digitalisering av Sykmeldinger',
    description: 'Intern applikasjon for digitalisering av sykmeldinger',
}

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactElement> {
    const userToken = await verifyUserLoggedIn()
    const [toggles, modiaContext] = await Promise.all([getToggles(), getModiaContext(userToken.accessToken)])

    return (
        <html lang="nb">
            <head>
                <link
                    rel="preload"
                    href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <Providers modiaContext={modiaContext} toggles={toggles.toggles}>
                    <PageHeader />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    )
}
