'use client'

import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client/react'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import {
    NasjonalFerdigstiltOppgaveBySykmeldingIdDocument,
    SykmeldingUnderArbeidStatus,
} from '../../graphql/queries/graphql.generated'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import {
    NasjonalOppgaveFerdigstiltDocuments,
    NasjonalOppgaveError,
    NasjonalOppgaveSkeleton,
} from './NasjonalOppgaveStates'
import NasjonalFerdigstiltOppgaveStatus from './status/NasjonalFerdigstiltOppgaveStatus'

type Props = PaneView & {
    sykmeldingId: string
}

function NasjonalOppgaveFerdigstiltView({ sykmeldingId, layout }: Props): ReactElement {
    const query = useQuery(NasjonalFerdigstiltOppgaveBySykmeldingIdDocument, {
        variables: { sykmeldingId },
    })
    return (
        <SplitDocumentView
            title="Korrigering av registrert papirsykmelding"
            ingress="Under kan du korrigere opplysningene i en allerede registrert papirsykmelding"
            documentView={
                <NasjonalOppgaveFerdigstiltDocuments loading={query.loading} data={query.data} error={query.error} />
            }
            closeReturnsTo="modia"
            defaultLayout={layout}
        >
            {query.loading && <NasjonalOppgaveSkeleton />}
            {query.data?.nasjonalFerdigstiltOppgave?.__typename === 'NasjonalOppgave' ? (
                <NasjonalSykmeldingForm
                    sykmelding={query.data.nasjonalFerdigstiltOppgave.nasjonalSykmelding}
                    oppgaveId={query.data.nasjonalFerdigstiltOppgave.oppgaveId}
                    status={SykmeldingUnderArbeidStatus.Ferdigstilt}
                />
            ) : (
                query.data?.nasjonalFerdigstiltOppgave?.__typename === 'NasjonalSykmeldingStatus' && (
                    <NasjonalFerdigstiltOppgaveStatus oppgave={query.data.nasjonalFerdigstiltOppgave} />
                )
            )}
            {query.error && (
                <NasjonalOppgaveError error={query.error}>
                    {`Klarte ikke å laste ferdigstilt oppgave med sykmelding-id "${sykmeldingId}".`}
                </NasjonalOppgaveError>
            )}
        </SplitDocumentView>
    )
}

export default NasjonalOppgaveFerdigstiltView
