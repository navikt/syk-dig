'use client'

import React, { ReactElement } from 'react'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import {
    NasjonalOppgaveError,
    NasjonalOppgaveFerdigstiltDocuments,
    NasjonalOppgaveSkeleton,
} from './NasjonalOppgaveStates'
import {useQuery} from "@apollo/client";
import {
    NasjonalOppgaveByIdDocument,
} from "../../graphql/queries/graphql.generated";

type Props = PaneView & {
    oppgaveId: string
}

function NasjonalOppgaveFerdigstiltView({ oppgaveId, layout }: Props): ReactElement {
    const query = useQuery(NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId },
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
            {query.data && query?.data?.nasjonalOppgave?.__typename === 'NasjonalOppgave' && query?.data?.nasjonalOppgave?.nasjonalSykmelding?.sykmeldingId && (
                <NasjonalSykmeldingForm
                    sykmelding={query.data?.nasjonalOppgave?.nasjonalSykmelding}
                    sykmeldingId={query.data?.nasjonalOppgave?.nasjonalSykmelding?.sykmeldingId}
                    ferdigstilt
                />
            )}
            {query.error && (
                <NasjonalOppgaveError error={query.error}>
                    {`Klarte ikke å laste ferdigstilt oppgave med oppgaveId "${oppgaveId}".`}
                </NasjonalOppgaveError>
            )}
        </SplitDocumentView>
    )
}

export default NasjonalOppgaveFerdigstiltView
