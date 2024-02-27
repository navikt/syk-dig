import React, { PropsWithChildren, ReactElement } from 'react'
import { range } from 'remeda'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import { QueryResult } from '@apollo/client'

import { raise } from '../../utils/tsUtils'
import { FormSectionSkeleton } from '../form-layout/FormSection'
import { InfoWithHeaderSkeleton, InputWithTitleSkeleton } from '../skeleton/Skeletons'
import DocumentsViewerNoDocuments from '../split-view-layout/document/DocumentViewNoDocuments'
import DocumentsViewerSkeleton from '../split-view-layout/document/DocumentViewSkeleton'
import DocumentsViewer from '../split-view-layout/document/DocumentView'

import { FerdigstiltOppgaveVariables, OppgaveResult, OppgaveVariables } from './useNasjonalOppgave'

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

export function NasjonalOppgaveError({ children }: PropsWithChildren): ReactElement {
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
    query,
}: {
    query: QueryResult<OppgaveResult, OppgaveVariables> | QueryResult<OppgaveResult, FerdigstiltOppgaveVariables>
}): ReactElement {
    const { loading, data, error } = query

    if (loading) {
        return <DocumentsViewerSkeleton />
    } else if (error) {
        return <DocumentsViewerNoDocuments text="Oppgaven ble ikke lastet" />
    } else if (data?.oppgave != null) {
        return <DocumentsViewer oppgaveId={data.oppgave.oppgaveid} documents={data.oppgave.documents} source="smreg" />
    } else {
        raise(new Error('Illegal state: Non loading, non error oppgave that is null'))
    }
}
