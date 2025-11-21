import React, { PropsWithChildren, ReactElement } from 'react'
import { range } from 'remeda'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import { ErrorLike } from '@apollo/client'

import { raise } from '../../utils/tsUtils'
import { FormSectionSkeleton } from '../form-layout/FormSection'
import { InfoWithHeaderSkeleton, InputWithTitleSkeleton } from '../skeleton/Skeletons'
import DocumentsViewerNoDocuments from '../split-view-layout/document/DocumentViewNoDocuments'
import DocumentsViewerSkeleton from '../split-view-layout/document/DocumentViewSkeleton'
import DocumentsViewer from '../split-view-layout/document/DocumentView'
import {
    NasjonalFerdigstiltOppgaveBySykmeldingIdQuery,
    NasjonalOppgaveByIdQuery,
} from '../../graphql/queries/graphql.generated'

export function NasjonalOppgaveSkeleton(): ReactElement {
    return (
        <>
            {range(0, 4).map((it) => (
                <FormSectionSkeleton key={it}>
                    <div className="mb-16 flex gap-32">
                        <InfoWithHeaderSkeleton />
                        <InfoWithHeaderSkeleton />
                    </div>
                    <div className="mb-18 flex gap-32">
                        <InfoWithHeaderSkeleton lines={2} />
                        <InfoWithHeaderSkeleton lines={3} />
                    </div>
                    <InputWithTitleSkeleton />
                </FormSectionSkeleton>
            ))}
        </>
    )
}

export function NasjonalOppgaveError({
    error,
    children,
}: PropsWithChildren<{ error: ErrorLike | undefined }>): ReactElement {
    if (error) {
        return (
            <Alert variant="warning" className="m-4">
                <Heading size="small" spacing>
                    Fant ikke oppgave, eller oppgaven er allerede løst
                </Heading>
                <BodyShort>
                    Dersom dette ikke stemmer kan du kontakte Team Sykmelding på{' '}
                    <a href="https://nav-it.slack.com/archives/CMA3XV997">Slack</a> eller ta kontakt med brukerstøtte.
                </BodyShort>
            </Alert>
        )
    }

    return (
        <Alert variant="error" className="m-4">
            <Heading size="small" spacing>
                En uventet feil oppsto
            </Heading>
            <BodyShort spacing>{children}</BodyShort>
            <BodyShort>
                Du kan klikke her for å <Link href="">oppfriske</Link> siden. Dersom problemet vedvarer kan du kontakte
                Team Sykmelding på <a href="https://nav-it.slack.com/archives/CMA3XV997">Slack</a> eller ta kontakt med
                brukerstøtte
            </BodyShort>
        </Alert>
    )
}

export function NasjonalOppgaveDocuments({
    oppgaveId,
    data,
    loading,
    error,
}: {
    oppgaveId: string
    loading: boolean
    data: NasjonalOppgaveByIdQuery | undefined
    error: ErrorLike | undefined
}): ReactElement {
    const isStatus = data?.nasjonalOppgave?.__typename === 'NasjonalOppgaveStatus'

    if (loading) {
        return <DocumentsViewerSkeleton />
    } else if (!loading && isStatus) {
        return <DocumentsViewerNoDocuments text="Oppgaven er ikke åpen" />
    } else if (error) {
        return <DocumentsViewerNoDocuments text="Oppgaven ble ikke lastet" />
    } else if (data?.nasjonalOppgave?.__typename === 'NasjonalOppgave') {
        return (
            <DocumentsViewer documents={data?.nasjonalOppgave.documents} oppgaveId={oppgaveId} edit={false} nasjonal />
        )
    } else {
        raise(new Error('Illegal state: Non loading, non error oppgave that is null'))
    }
}

export function NasjonalOppgaveFerdigstiltDocuments({
    loading,
    data,
    error,
}: {
    loading: boolean
    data: NasjonalFerdigstiltOppgaveBySykmeldingIdQuery | undefined
    error: ErrorLike | undefined
}): ReactElement {
    if (loading) {
        return <DocumentsViewerSkeleton />
    } else if (error) {
        return <DocumentsViewerNoDocuments text="Oppgaven ble ikke lastet" />
    } else if (data?.nasjonalFerdigstiltOppgave?.__typename === 'NasjonalOppgave') {
        return (
            <DocumentsViewer
                journalpostId={data.nasjonalFerdigstiltOppgave.nasjonalSykmelding.journalpostId}
                documents={data.nasjonalFerdigstiltOppgave?.documents}
                edit={false}
            />
        )
    } else {
        raise(new Error('Illegal state: Non loading, non error oppgave that is null'))
    }
}
