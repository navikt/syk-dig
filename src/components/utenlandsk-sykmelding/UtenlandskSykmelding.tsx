'use client'

import { useQuery } from '@apollo/client/react'
import React, { ReactElement } from 'react'
import { range } from 'remeda'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import { ErrorLike } from '@apollo/client'

import { PaneView } from '../split-view-layout/persistent-layout'
import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import {
    DigitalisertSykmeldingResultFragment,
    SykmeldingByIdDocument,
    SykmeldingByIdQuery,
} from '../../graphql/queries/graphql.generated'
import DocumentsViewerSkeleton from '../split-view-layout/document/DocumentViewSkeleton'
import DocumentsViewerNoDocuments from '../split-view-layout/document/DocumentViewNoDocuments'
import DocumentsViewer from '../split-view-layout/document/DocumentView'
import { raise } from '../../utils/tsUtils'
import ModiaAlert from '../../modia/ModiaAlert'
import { useModiaContext } from '../../modia/modia-context'
import { FormSectionSkeleton } from '../form-layout/FormSection'
import { InfoWithHeaderSkeleton, InputWithTitleSkeleton } from '../skeleton/Skeletons'
import DigitalisertSykmeldingStatus from '../Sykmelding/DigitalisertSykmeldingStatus'
import { UpdateSykmeldingForm } from '../Sykmelding/UpdateSykmeldingForm'

type Props = PaneView & {
    sykmeldingId: string
}

function UtenlandskSykmeldingView({ sykmeldingId, layout }: Props): ReactElement {
    const modiaContext = useModiaContext()
    const sykmeldingQuery = useQuery(SykmeldingByIdDocument, {
        variables: { sykmeldingId },
    })

    return (
        <SplitDocumentView
            title="Utenlandsk sykmelding"
            ingress="Under kan du korrigere opplysningene i en allerede registrert utenlandsk papirsykmelding"
            documentView={
                <OppgaveDocuments
                    loading={sykmeldingQuery.loading}
                    data={sykmeldingQuery.data}
                    error={sykmeldingQuery.error}
                />
            }
            closeReturnsTo="modia"
            defaultLayout={layout}
        >
            {'errorType' in modiaContext.modia && <ModiaAlert error={modiaContext.modia} />}
            {sykmeldingQuery.loading && <OppgaveSkeleton />}
            {sykmeldingQuery.data?.digitalisertSykmelding && (
                <DigitalisertSykmelding sykmelding={sykmeldingQuery.data.digitalisertSykmelding} />
            )}
            {sykmeldingQuery.error && <OppgaveError sykmeldingId={sykmeldingId} />}
        </SplitDocumentView>
    )
}

function DigitalisertSykmelding({ sykmelding }: { sykmelding: DigitalisertSykmeldingResultFragment }): ReactElement {
    if (sykmelding.__typename === 'DigitalisertSykmelding') {
        return <UpdateSykmeldingForm values={sykmelding.values} person={sykmelding.person} />
    } else {
        return <DigitalisertSykmeldingStatus sykmeldingStatus={sykmelding} />
    }
}

function OppgaveError({ sykmeldingId }: { sykmeldingId: string }): ReactElement {
    return (
        <Alert variant="error" className="m-4">
            <Heading size="medium" spacing>
                En uventet feil oppsto
            </Heading>
            <BodyShort spacing>{`Klarte ikke å laste sykmelding med sykmelding-id "${sykmeldingId}".`}</BodyShort>
            <BodyShort>
                Du kan klikke her for å <Link href="">oppfriske</Link> siden. Dersom problemet vedvarer kan du kontakte
                Team Sykmelding på <a href="https://nav-it.slack.com/archives/CMA3XV997">Slack</a> eller ta kontakt med
                brukerstøtte
            </BodyShort>
        </Alert>
    )
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

function OppgaveDocuments({
    loading,
    data,
    error,
}: {
    loading: boolean
    data: SykmeldingByIdQuery | undefined
    error: ErrorLike | undefined
}): ReactElement {
    const oppgave = data?.digitalisertSykmelding

    if (loading) {
        return <DocumentsViewerSkeleton />
    } else if (error) {
        return <DocumentsViewerNoDocuments text="Oppgaven ble ikke lastet" />
    } else if (oppgave != null && oppgave?.__typename === 'DigitalisertSykmelding') {
        return <DocumentsViewer oppgaveId={oppgave.oppgaveId} documents={oppgave.documents} edit />
    } else {
        raise(new Error('Illegal state: Non loading, non error oppgave that is null'))
    }
}

export default UtenlandskSykmeldingView
