import '../style/global.css'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Metadata } from 'next'

import { getToggles } from '../toggles/rsc'
import { getModiaData } from '../modia/ModiaService'
import { verifyUserLoggedIn } from '../auth/rsc'
import PageHeader from '../components/PageHeader/PageHeader'

import Providers from './_providers'
import Preload from './_preload'

export const metadata: Metadata = {
    title: 'Digitalisering av Sykmeldinger',
    description: 'Intern applikasjon for digitalisering av sykmeldinger',
}

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactElement> {
    const userToken = await verifyUserLoggedIn()
    const [toggles, modiaContext] = await Promise.all([getToggles(), getModiaData(userToken.accessToken)])

    return (
        <html lang="nb">
            <Preload />
            <body>
                <Providers modiaContext={modiaContext} toggles={toggles.toggles}>
                    <PageHeader />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    )
}
