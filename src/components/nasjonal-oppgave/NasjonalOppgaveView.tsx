'use client'

import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'

import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'
import { useModiaContext } from '../../modia/modia-context'
import ModiaAlert from '../../modia/ModiaAlert'
import { NasjonalOppgaveByIdDocument, SykmeldingUnderArbeidStatus } from '../../graphql/queries/graphql.generated'

import NasjonalSykmeldingForm from './form/NasjonalSykmeldingForm'
import { NasjonalOppgaveDocuments, NasjonalOppgaveError, NasjonalOppgaveSkeleton } from './NasjonalOppgaveStates'
import NasjonalOppgaveStatus from './status/NasjonalOppgaveStatus'

type Props = PaneView & {
    oppgaveId: string
}

function NasjonalOppgaveView({ oppgaveId, layout }: Props): ReactElement {
    const modiaContext = useModiaContext()
    const query = useQuery(NasjonalOppgaveByIdDocument, {
        variables: { oppgaveId },
    })
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
            {query.data?.nasjonalOppgave?.__typename === 'NasjonalOppgave' ? (
                <NasjonalSykmeldingForm
                    oppgaveId={query.data.nasjonalOppgave.oppgaveId}
                    sykmelding={query.data.nasjonalOppgave.nasjonalSykmelding}
                    status={SykmeldingUnderArbeidStatus.UnderArbeid}
                />
            ) : (
                query.data?.nasjonalOppgave?.__typename === 'NasjonalOppgaveStatus' && (
                    <NasjonalOppgaveStatus oppgave={query.data.nasjonalOppgave} />
                )
            )}
            {query.error && (
                <NasjonalOppgaveError error={query.error}>
                    {`Klarte ikke å laste oppgave med oppgave-id "${oppgaveId}".`}
                </NasjonalOppgaveError>
            )}
        </SplitDocumentView>
    )
}

export default NasjonalOppgaveView
