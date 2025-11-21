'use client'

import { useQuery } from '@apollo/client/react'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { range } from 'remeda'
import { ErrorLike } from '@apollo/client'

import {
    DigitaliseringOppgaveResultFragment,
    OppgaveByIdDocument,
    OppgaveByIdQuery,
} from '../../graphql/queries/graphql.generated'
import { raise } from '../../utils/tsUtils'
import SykmeldingForm from '../Sykmelding/SykmeldingForm'
import { FormSectionSkeleton } from '../form-layout/FormSection'
import { InfoWithHeaderSkeleton, InputWithTitleSkeleton } from '../skeleton/Skeletons'
import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import DocumentsViewerSkeleton from '../split-view-layout/document/DocumentViewSkeleton'
import DocumentsViewerNoDocuments from '../split-view-layout/document/DocumentViewNoDocuments'
import DocumentsViewer from '../split-view-layout/document/DocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import ModiaAlert from '../../modia/ModiaAlert'
import { useModiaContext } from '../../modia/modia-context'

import OppgaveStatus from './status/OppgaveStatus'

type Props = PaneView & {
    oppgaveId: string
}

function UtenlandskOppgaveView({ oppgaveId, layout }: Props): ReactElement {
    const modiaContext = useModiaContext()
    const oppgaveQuery = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId },
    })

    return (
        <SplitDocumentView
            title="Utenlandsk sykmelding"
            ingress="Vennligst skriv inn opplysningene fra sykmeldingen under"
            documentView={
                <OppgaveDocuments loading={oppgaveQuery.loading} data={oppgaveQuery.data} error={oppgaveQuery.error} />
            }
            closeReturnsTo="gosys"
            defaultLayout={layout}
        >
            {'errorType' in modiaContext.modia && <ModiaAlert error={modiaContext.modia} />}
            {oppgaveQuery.loading && <OppgaveSkeleton />}
            {oppgaveQuery.data?.oppgave && <DigitaliseringsOppgave oppgave={oppgaveQuery.data.oppgave} />}
            {oppgaveQuery.error && <OppgaveError oppgaveId={oppgaveId} />}
        </SplitDocumentView>
    )
}

function DigitaliseringsOppgave({ oppgave }: { oppgave: DigitaliseringOppgaveResultFragment }): ReactElement {
    if (oppgave.__typename === 'Digitaliseringsoppgave') {
        return <SykmeldingForm values={oppgave.values} person={oppgave.person} />
    } else {
        return <OppgaveStatus oppgave={oppgave} />
    }
}

export function OppgaveDocuments({
    loading,
    data,
    error,
}: {
    loading: boolean
    data: OppgaveByIdQuery | undefined
    error: ErrorLike | undefined
}): ReactElement {
    const isStatus = data?.oppgave?.__typename === 'DigitaliseringsoppgaveStatus'
    const oppgave = data?.oppgave

    if (loading) {
        return <DocumentsViewerSkeleton />
    } else if (!loading && isStatus) {
        return <DocumentsViewerNoDocuments text="Oppgaven er ikke åpen" />
    } else if (error) {
        return <DocumentsViewerNoDocuments text="Oppgaven ble ikke lastet" />
    } else if (oppgave != null && oppgave?.__typename === 'Digitaliseringsoppgave') {
        return <DocumentsViewer oppgaveId={oppgave.oppgaveId} documents={oppgave.documents} edit />
    } else {
        raise(new Error('Illegal state: Non loading, non error oppgave that is null'))
    }
}

function OppgaveSkeleton(): ReactElement {
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

function OppgaveError({ oppgaveId }: { oppgaveId: string }): ReactElement {
    return (
        <Alert variant="error" className="m-4">
            <Heading size="medium" spacing>
                En uventet feil oppsto
            </Heading>
            <BodyShort spacing>{`Klarte ikke å laste oppgave med oppgave-id "${oppgaveId}".`}</BodyShort>
            <BodyShort>
                Du kan klikke her for å <Link href="">oppfriske</Link> siden. Dersom problemet vedvarer kan du kontakte
                Team Sykmelding på <a href="https://nav-it.slack.com/archives/CMA3XV997">Slack</a> eller ta kontakt med
                brukerstøtte
            </BodyShort>
        </Alert>
    )
}

export default UtenlandskOppgaveView
