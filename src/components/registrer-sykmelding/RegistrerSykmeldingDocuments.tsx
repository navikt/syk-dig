import React, { ReactElement } from 'react'
import { ErrorLike } from '@apollo/client'

import DocumentsViewerSkeleton from '../split-view-layout/document/DocumentViewSkeleton'
import DocumentsViewerNoDocuments from '../split-view-layout/document/DocumentViewNoDocuments'
import DocumentsViewer from '../split-view-layout/document/DocumentView'
import { JournalpostByIdQuery } from '../../graphql/queries/graphql.generated'

type Props = {
    loading: boolean
    data: JournalpostByIdQuery | undefined
    error: ErrorLike | undefined
}

function RegistrerSykmeldingDocuments({ loading, data, error }: Props): ReactElement {
    const journalpost = data?.journalpost

    if (loading) {
        return <DocumentsViewerSkeleton />
    } else if (!loading && journalpost == null && !error) {
        return <DocumentsViewerNoDocuments text="Journalposten er ikke åpen" />
    } else if (error) {
        return <DocumentsViewerNoDocuments text="Journalpost ble ikke lastet" />
    } else if (journalpost != null && journalpost?.__typename !== 'Journalpost') {
        return <DocumentsViewerNoDocuments text={`Journalpost har status ${journalpost.status}`} />
    } else if (journalpost != null && journalpost.dokumenter.length === 0 && !loading && !error) {
        return <DocumentsViewerNoDocuments text="Journalpost har ingen dokumenter" />
    } else if (journalpost != null && !loading && journalpost.dokumenter.length > 0) {
        return (
            <DocumentsViewer
                journalpostId={journalpost.journalpostId}
                documents={journalpost.dokumenter}
                edit={false}
            />
        )
    } else {
        throw new Error('Illegal state: Non loading, non error journalpost that is null')
    }
}

export default RegistrerSykmeldingDocuments
