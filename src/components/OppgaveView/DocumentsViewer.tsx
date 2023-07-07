import { ReactElement, useState } from 'react'
import { Heading, Tabs } from '@navikt/ds-react'
import cn from 'clsx'

import Pdf from '../Pdf/Pdf'
import { OppgaveFragment } from '../../graphql/queries/graphql.generated'

import DocumentTab from './DocumentTabLabel'
import styles from './DocumentsViewer.module.css'

interface Props {
    className?: string
    oppgave: OppgaveFragment
}

function DocumentsViewer({ oppgave, className }: Props): ReactElement {
    const [tabState, setTabState] = useState(oppgave.documents[0].dokumentInfoId)
    const [renderedDocuments, setRenderedDocuments] = useState<string[]>([oppgave.documents[0].dokumentInfoId])

    return (
        <section className={cn(styles.sectionRoot, className)} aria-labelledby="pdf-viewer-section-heading">
            <Heading id="pdf-viewer-section-heading" level="2" size="xsmall" className={styles.heading}>
                Dokumenter som er mottatt
            </Heading>
            <DocumentTabs
                documents={oppgave.documents}
                value={tabState}
                onTabChange={(value) => {
                    if (!renderedDocuments.includes(value)) {
                        setRenderedDocuments((docs) => [...docs, value])
                    }
                    setTabState(value)
                }}
                oppgaveId={oppgave.oppgaveId}
            />
            {renderedDocuments.map((documentId) => (
                <Pdf
                    key={documentId}
                    className={cn(styles.pdf, {
                        hidden: tabState !== documentId,
                    })}
                    href={`/api/document/${oppgave.oppgaveId}/${documentId}`}
                />
            ))}
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
}): ReactElement {
    return (
        <Tabs className={styles.tabsRoot} value={value} onChange={onTabChange}>
            <Tabs.List className="w-full">
                {documents.map((document) => (
                    <DocumentTab key={document.dokumentInfoId} document={document} oppdaveId={oppgaveId} />
                ))}
            </Tabs.List>
        </Tabs>
    )
}

export default DocumentsViewer
