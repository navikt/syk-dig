import '../style/global.css'
import { Metadata } from 'next'
import React, { ReactElement } from 'react'

import PageHeader from '../components/PageHeader/PageHeader'
import { getModiaData } from '../modia/ModiaService'
import { getToggles } from '../toggles/rsc'

import Preload from './_preload'
import Providers from './_providers'

export const metadata: Metadata = {
    title: 'Digitalisering av Sykmeldinger',
    description: 'Intern applikasjon for digitalisering av sykmeldinger',
}

export default async function RootLayout({ children }: LayoutProps<'/'>): Promise<ReactElement> {
    const [toggles, modiaContext] = await Promise.all([getToggles(), getModiaData()])

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
