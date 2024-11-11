import React, { ReactElement } from 'react'
import { Metadata } from 'next'

import { getPersistentPaneLayout } from '../../../components/split-view-layout/persistent-layout'
import UtenlandskSykmelding from "../../../components/utenlandsk-sykmelding/UtenlandskSykmelding";

export const metadata: Metadata = {
    title: 'Rediger mangler i utenlandsk sykmelding',
}

async function Page({ params }: { params: Promise<{ sykmeldingId: string }> }): Promise<ReactElement> {
    const { sykmeldingId } = await params

    return <UtenlandskSykmelding sykmeldingId={sykmeldingId} layout={await getPersistentPaneLayout()} />
}

export default Page
