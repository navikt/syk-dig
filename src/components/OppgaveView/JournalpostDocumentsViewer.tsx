import { ReactElement, useState } from 'react'
import { Heading, Tabs } from '@navikt/ds-react'
import cn from 'clsx'

import Pdf from '../Pdf/Pdf'
import { JournalpostFragment } from '../../graphql/queries/graphql.generated'

import DocumentTab from './DocumentTabLabel'
import styles from './DocumentsViewer.module.css'

interface Props {
    className?: string
    journalpost: JournalpostFragment
}

function JournalpostDocumentsViewer({ journalpost, className }: Props): ReactElement {
    const [tabState, setTabState] = useState(journalpost.dokumenter[0].dokumentInfoId)
    const [renderedDocuments, setRenderedDocuments] = useState<string[]>([journalpost.dokumenter[0].dokumentInfoId])

    return (
        <section className={cn(styles.sectionRoot, className)} aria-labelledby="pdf-viewer-section-heading">
            <Heading id="pdf-viewer-section-heading" level="2" size="xsmall" className={styles.heading}>
                Dokumenter som er mottatt
            </Heading>
            <DocumentTabs
                documents={journalpost.dokumenter}
                value={tabState}
                onTabChange={(value) => {
                    if (!renderedDocuments.includes(value)) {
                        setRenderedDocuments((docs) => [...docs, value])
                    }
                    setTabState(value)
                }}
            />
            {renderedDocuments.map((documentId) => (
                <Pdf
                    key={documentId}
                    className={cn(styles.pdf, {
                        hidden: tabState !== documentId,
                    })}
                    href={`/api/document/journalpost/${journalpost.journalpostId}/${documentId}`}
                />
            ))}
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
}): ReactElement {
    return (
        <Tabs className={styles.tabsRoot} value={value} onChange={onTabChange}>
            <Tabs.List className="w-full">
                {documents.map((document) => (
                    <DocumentTab key={document.dokumentInfoId} document={document} />
                ))}
            </Tabs.List>
        </Tabs>
    )
}

export default JournalpostDocumentsViewer
