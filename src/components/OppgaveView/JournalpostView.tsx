import { PropsWithChildren, ReactElement } from 'react'
import cn from 'clsx'

import { JournalpostFragment } from '../../graphql/queries/graphql.generated'

import styles from './OppgaveView.module.css'
import { DocumentsViewerNoDocuments, DocumentsViewerSkeleton } from './DocumentViewerStates'
import JournalpostDocumentsViewer from './JournalpostDocumentsViewer'

interface Props {
    journalpost: JournalpostFragment | null | undefined
    isError: boolean
    loading: boolean
}

function JournalpostView({ journalpost, loading, isError, children }: PropsWithChildren<Props>): ReactElement {
    const documentsSectionClassNames = cn(styles.pdf)

    return (
        <>
            <div className={styles.contentWrapper}>
                <section aria-labelledby="oppgave-header" className={cn(styles.scrollArea)}>
                    <div className={styles.content}>{children} </div>
                </section>
                {loading && <DocumentsViewerSkeleton className={documentsSectionClassNames} />}
                {!loading && journalpost == null && (
                    <DocumentsViewerNoDocuments
                        className={documentsSectionClassNames}
                        text="Journalposten er ikke åpen"
                    />
                )}
                {isError && (
                    <DocumentsViewerNoDocuments
                        className={documentsSectionClassNames}
                        text="Journalpost ble ikke lastet"
                    />
                )}
                {journalpost != null && journalpost.dokumenter.length === 0 && !loading && !isError && (
                    <DocumentsViewerNoDocuments
                        className={documentsSectionClassNames}
                        text="Journalpost har ingen dokumenter"
                    />
                )}
                {journalpost != null && !loading && journalpost.dokumenter.length > 0 && (
                    <JournalpostDocumentsViewer className={documentsSectionClassNames} journalpost={journalpost} />
                )}
            </div>
        </>
    )
}
export default JournalpostView
