'use client'

import React, { ReactElement } from 'react'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import { useNasjonalOppgave } from './useNasjonalOppgave'
import { NasjonalOppgaveDocuments, NasjonalOppgaveError, NasjonalOppgaveSkeleton } from './NasjonalOppgaveStates'

type Props = {
    oppgaveId: string
}

function NasjonalOppgaveView({ oppgaveId }: Props): ReactElement {
    const query = useNasjonalOppgave(oppgaveId)

    return (
        <SplitDocumentView
            title="Nasjonal papirsykmelding"
            ingress="Vennligst legg inn opplysningene fra papirsykmeldingen"
            documentView={<NasjonalOppgaveDocuments oppgaveId={oppgaveId} query={query} />}
            closeReturnsTo="gosys"
        >
            {query.loading && <NasjonalOppgaveSkeleton />}
            {query.data && (
                <NasjonalSykmeldingForm
                    oppgaveId={oppgaveId}
                    sykmelding={query.data.oppgave.papirSmRegistering}
                    ferdigstilt={false}
                />
            )}
            {query.error && (
                <NasjonalOppgaveError>
                    {`Klarte ikke å laste oppgave med oppgave-id "${oppgaveId}".`}
                </NasjonalOppgaveError>
            )}
        </SplitDocumentView>
    )
}

export default NasjonalOppgaveView
