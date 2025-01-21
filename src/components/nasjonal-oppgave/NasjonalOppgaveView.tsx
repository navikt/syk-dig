'use client'

import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import { useModiaContext } from '../../modia/modia-context'
import ModiaAlert from '../../modia/ModiaAlert'
import { NasjonalOppgaveByIdDocument, NasjonalOppgaveResultFragment } from '../../graphql/queries/graphql.generated'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import { NasjonalOppgaveDocuments, NasjonalOppgaveError, NasjonalOppgaveSkeleton } from './NasjonalOppgaveStates'

type Props = PaneView & {
    oppgaveId: string
}

function NasjonalOppgaveView({ oppgaveId, layout }: Props): ReactElement {
    const modiaContext = useModiaContext()
    const nasjonalOppgaveQuery = useQuery(NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId },
    })
    console.log("Entering nasjonalOppgaveView")
    return (
        <SplitDocumentView
            title="Nasjonal papirsykmelding"
            ingress="Vennligst legg inn opplysningene fra papirsykmeldingen"
            documentView={<NasjonalOppgaveDocuments oppgaveId={oppgaveId} query={nasjonalOppgaveQuery} />}
            closeReturnsTo="gosys"
            defaultLayout={layout}
        >
            {'errorType' in modiaContext.modia && <ModiaAlert error={modiaContext.modia} />}
            {nasjonalOppgaveQuery.loading && <NasjonalOppgaveSkeleton />}
            {nasjonalOppgaveQuery.data?.nasjonalOppgave && (
                <NasjonalOppgaveStatus oppgave={nasjonalOppgaveQuery.data.nasjonalOppgave} />
            )}
            {nasjonalOppgaveQuery.error && (
                <NasjonalOppgaveError error={nasjonalOppgaveQuery.error}>
                    {`Klarte ikke å laste oppgave med oppgave-id "${oppgaveId}".`}
                </NasjonalOppgaveError>
            )}
        </SplitDocumentView>
    )
}

function NasjonalOppgaveStatus({ oppgave }: { oppgave: NasjonalOppgaveResultFragment }): ReactElement {
    console.log("Entering NasjonalOppgaveStatus")
    if (oppgave.__typename === 'NasjonalOppgave') {
        return (
            <NasjonalSykmeldingForm
                oppgaveId={oppgave.oppgaveId}
                sykmelding={oppgave.nasjonalSykmelding}
                ferdigstilt={false}
            />
        )
    } else {
        return <NasjonalOppgaveStatus oppgave={oppgave} />
    }
}

export default NasjonalOppgaveView
