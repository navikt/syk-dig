import React, { PropsWithChildren } from 'react'
import Head from 'next/head'

import PageHeader from '../PageHeader/PageHeader'

interface Props {
    title: string
    className?: string
}

function PageWrapper({ children, title, className }: PropsWithChildren<Props>): JSX.Element {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <PageHeader />
            <main className={className}>{children}</main>
        </>
    )
}

export default PageWrapper
