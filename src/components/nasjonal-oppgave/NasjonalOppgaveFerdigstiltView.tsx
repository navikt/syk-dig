'use client'

import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import { NasjonalFerdigstiltOppgaveBySykmeldingIdDocument } from '../../graphql/queries/graphql.generated'

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
            documentView={<NasjonalOppgaveFerdigstiltDocuments query={query} />}
            closeReturnsTo="modia"
            defaultLayout={layout}
        >
            {query.loading && <NasjonalOppgaveSkeleton />}
            {query.data?.nasjonalFerdigstiltOppgave?.__typename === 'NasjonalOppgave' ? (
                <NasjonalSykmeldingForm
                    sykmelding={query.data.nasjonalFerdigstiltOppgave.nasjonalSykmelding}
                    sykmeldingId={sykmeldingId}
                    ferdigstilt
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
