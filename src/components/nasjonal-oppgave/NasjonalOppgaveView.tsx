'use client'

import React, { ReactElement } from 'react'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import { useModiaContext } from '../../modia/modia-context'
import ModiaAlert from '../../modia/ModiaAlert'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import { useNasjonalOppgave } from './useNasjonalOppgave'
import { NasjonalOppgaveDocuments, NasjonalOppgaveError, NasjonalOppgaveSkeleton } from './NasjonalOppgaveStates'

type Props = PaneView & {
    oppgaveId: string
}

function NasjonalOppgaveView({ oppgaveId, layout }: Props): ReactElement {
    const query = useNasjonalOppgave(oppgaveId)
    const modiaContext = useModiaContext()

    return (
        <SplitDocumentView
            title="Nasjonal papirsykmelding"
            ingress="Vennligst legg inn opplysningene fra papirsykmeldingen"
            documentView={<NasjonalOppgaveDocuments oppgaveId={oppgaveId} query={query} />}
            closeReturnsTo="gosys"
            defaultLayout={layout}
        >
            {'errorType' in modiaContext.modia && <ModiaAlert error={modiaContext.modia} />}
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
