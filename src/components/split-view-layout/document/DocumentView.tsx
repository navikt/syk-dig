import { ReactElement, useState } from 'react'
import cn from 'clsx'
import { Heading } from '@navikt/ds-react'

import Pdf from '../../Pdf/Pdf'

import DocumentTabs from './document-tabs/DocumentTabs'
import styles from './DocumentView.module.css'

type DocumentOppgaveVariant =
    | {
          edit: boolean
          oppgaveId: string
      }
    | {
          edit: false
          journalpostId: string
      }

type Props = {
    documents: { tittel: string; dokumentInfoId: string }[]
    className?: string
} & DocumentOppgaveVariant

function DocumentsViewer({ documents, className, edit, ...props }: Props): ReactElement {
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
                oppgaveId={'oppgaveId' in props && edit ? props.oppgaveId : null}
            />
            {renderedDocuments.map((documentId) => (
                <Pdf
                    key={documentId}
                    className={cn(styles.pdf, {
                        hidden: tabState !== documentId,
                    })}
                    href={`${getPdfUrl(props, documentId)}`}
                />
            ))}
        </section>
    )
}

function getPdfUrl(id: { oppgaveId: string } | { journalpostId: string }, documentId: string): string {
    if ('oppgaveId' in id) {
        return `/api/document/${id.oppgaveId}/${documentId}`
    }

    return `/api/document/journalpost/${id.journalpostId}/${documentId}`
}

export default DocumentsViewer
