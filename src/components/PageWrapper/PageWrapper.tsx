import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

import PageHeader from '../PageHeader/PageHeader';

import styles from './PageWrapper.module.css';

function PageWrapper({ children, title }: PropsWithChildren<{ title: string }>): JSX.Element {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <PageHeader />
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
}

export default PageWrapper;
