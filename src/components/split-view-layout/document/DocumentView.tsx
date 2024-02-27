import { ReactElement, useState } from 'react'
import cn from 'clsx'
import { Heading } from '@navikt/ds-react'

import Pdf from '../../Pdf/Pdf'

import DocumentTabs from './document-tabs/DocumentTabs'
import styles from './DocumentView.module.css'

type OppgaveOrJournalPost =
    | { oppgaveId: string | null; source?: 'syk-dig' | 'smreg' }
    | {
          journalpostId: string | null
      }

type Props = {
    documents: { tittel: string; dokumentInfoId: string }[]
    className?: string
} & OppgaveOrJournalPost

function DocumentsViewer({ documents, className, ...props }: Props): ReactElement {
    const [tabState, setTabState] = useState(documents[0].dokumentInfoId)
    const [renderedDocuments, setRenderedDocuments] = useState<string[]>([documents[0].dokumentInfoId])

    return (
        <section className={cn('h-full', styles.sectionRoot, className)} aria-labelledby="pdf-viewer-section-heading">
            <Heading id="pdf-viewer-section-heading" level="2" size="xsmall" className={styles.heading}>
                Dokumenter som er mottatt
            </Heading>
            <DocumentTabs
                documents={documents}
                value={tabState}
                onTabChange={(value) => {
                    if (!renderedDocuments.includes(value)) {
                        setRenderedDocuments((docs) => [...docs, value])
                    }
                    setTabState(value)
                }}
                oppgaveId={'oppgaveId' in props && props.source !== 'smreg' ? props.oppgaveId : null}
            />
            {renderedDocuments.map((documentId) => (
                <Pdf
                    key={documentId}
                    className={cn(styles.pdf, {
                        hidden: tabState !== documentId,
                    })}
                    href={`${getPdfUrl(props)}/${documentId}`}
                />
            ))}
        </section>
    )
}

function getPdfUrl(id: OppgaveOrJournalPost): string {
    if ('oppgaveId' in id) {
        return id.source !== 'smreg' ? `/api/document/${id.oppgaveId}` : `/api/smreg/api/v1/pdf/${id.oppgaveId}`
    }
    return `/api/document/journalpost/${id.journalpostId}`
}

export default DocumentsViewer
