'use client'

import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import { NasjonalFerdigstiltOppgaveByIdDocument } from '../../graphql/queries/graphql.generated'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import {
    NasjonalOppgaveError,
    NasjonalOppgaveFerdigstiltDocuments,
    NasjonalOppgaveSkeleton,
} from './NasjonalOppgaveStates'

type Props = PaneView & {
    sykmeldingId: string
}

function NasjonalOppgaveFerdigstiltView({ sykmeldingId, layout }: Props): ReactElement {
    const query = useQuery(NasjonalFerdigstiltOppgaveByIdDocument, {
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
            {query.data?.nasjonalFerdigstiltOppgave?.__typename === 'NasjonalOppgave' && (
                <NasjonalSykmeldingForm
                    sykmelding={query.data.nasjonalFerdigstiltOppgave.nasjonalSykmelding}
                    sykmeldingId={sykmeldingId}
                    ferdigstilt
                />
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
