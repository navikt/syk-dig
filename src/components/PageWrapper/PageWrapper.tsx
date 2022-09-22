import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

import PageHeader from '../PageHeader/PageHeader';

function PageWrapper({ children, title }: PropsWithChildren<{ title: string }>): JSX.Element {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <PageHeader />
            <main>{children}</main>
        </div>
    );
}

export default PageWrapper;
