import React, { useState } from 'react'
import { Heading, Tabs } from '@navikt/ds-react'
import cn from 'clsx'

import Pdf from '../Pdf/Pdf'
import { OppgaveFragment } from '../../graphql/queries/graphql.generated'

import styles from './DocumentsViewer.module.css'
import DocumentTab from './DocumentTabLabel'

interface Props {
    className?: string
    oppgave: OppgaveFragment
}

function DocumentsViewer({ oppgave, className }: Props): JSX.Element {
    const [tabState, setTabState] = useState(oppgave.documents[0].dokumentInfoId)

    return (
        <section className={cn(styles.sectionRoot, className)} aria-labelledby="pdf-viewer-section-heading">
            <Heading id="pdf-viewer-section-heading" level="2" size="xsmall" className={styles.heading}>
                Dokumenter som er mottatt
            </Heading>
            <DocumentTabs
                documents={oppgave.documents}
                value={tabState}
                onTabChange={setTabState}
                oppgaveId={oppgave.oppgaveId}
            />
            <Pdf className={styles.pdf} href={`/api/document/${oppgave.oppgaveId}/${tabState}`}></Pdf>
        </section>
    )
}

function DocumentTabs({
    value,
    documents,
    onTabChange,
    oppgaveId,
}: {
    value: string
    onTabChange: (value: string) => void
    documents: { tittel: string; dokumentInfoId: string }[]
    oppgaveId: string
}): JSX.Element {
    return (
        <Tabs className={styles.tabsRoot} value={value} onChange={onTabChange}>
            <Tabs.List>
                {documents.map((document) => (
                    <Tabs.Tab
                        key={document.dokumentInfoId}
                        value={document.dokumentInfoId}
                        label={<DocumentTab document={document} oppdaveId={oppgaveId} />}
                    ></Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    )
}

export default DocumentsViewer
