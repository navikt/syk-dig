'use client'

import React, { ReactElement } from 'react'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import { useFerdigstiltNasjonalOppgave } from './useNasjonalOppgave'
import { NasjonalOppgaveDocuments, NasjonalOppgaveError, NasjonalOppgaveSkeleton } from './NasjonalOppgaveStates'

type Props = {
    sykmeldingId: string
}

function NasjonalOppgaveFerdigstiltView({ sykmeldingId }: Props): ReactElement {
    const query = useFerdigstiltNasjonalOppgave(sykmeldingId)

    return (
        <SplitDocumentView
            title="Korrigering av registrert papirsykmelding"
            ingress="Under kan du korrigere opplysningene i en allerede registrert papirsykmelding"
            documentView={<NasjonalOppgaveDocuments query={query} />}
            closeReturnsTo="modia"
        >
            {query.loading && <NasjonalOppgaveSkeleton />}
            {query.data && (
                <NasjonalSykmeldingForm oppgave={query.data.oppgave} sykmeldingId={sykmeldingId} ferdigstilt />
            )}
            {query.error && (
                <NasjonalOppgaveError>
                    {`Klarte ikke å laste ferdigstilt oppgave med sykmelding-id "${sykmeldingId}".`}
                </NasjonalOppgaveError>
            )}
        </SplitDocumentView>
    )
}

export default NasjonalOppgaveFerdigstiltView
