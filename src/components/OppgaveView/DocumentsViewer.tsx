import React, { useState } from 'react'
import { Heading, Tabs } from '@navikt/ds-react'
import cn from 'clsx'

import Pdf from '../Pdf/Pdf'

import styles from './DocumentsViewer.module.css'

interface Props {
    className?: string
    oppgaveId: string
    documents: { tittel: string; dokumentInfoId: string }[] | null
}

function DocumentsViewer({ oppgaveId, documents, className }: Props): JSX.Element {
    const [tabState, setTabState] = useState('primary')

    return (
        <section className={cn(styles.sectionRoot, className)} aria-labelledby="pdf-viewer-section-heading">
            <Heading id="pdf-viewer-section-heading" level="2" size="xsmall" className={styles.heading}>
                Dokumenter som er mottatt
            </Heading>
            <DocumentTabs documents={documents ?? []} value={tabState} onTabChange={setTabState} />
            <Pdf className={styles.pdf} href={`/api/document/${oppgaveId}/${tabState}`}></Pdf>
        </section>
    )
}

function DocumentTabs({
    value,
    documents,
    onTabChange,
}: {
    value: string
    onTabChange: (value: string) => void
    documents: { tittel: string; dokumentInfoId: string }[]
}): JSX.Element {
    return (
        <Tabs className={styles.tabsRoot} value={value} onChange={onTabChange}>
            <Tabs.List>
                <Tabs.Tab value="primary" label="Sykmelding" />
                {documents.map((document) => (
                    <Tabs.Tab key={document.dokumentInfoId} value={document.dokumentInfoId} label={document.tittel} />
                ))}
            </Tabs.List>
        </Tabs>
    )
}

export default DocumentsViewer
