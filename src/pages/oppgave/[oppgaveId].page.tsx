import { useQuery } from '@apollo/client'
import { Alert } from '@navikt/ds-react'
import React from 'react'
import { range } from 'remeda'

import { withAuthenticatedPage } from '../../auth/withAuth'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import SykmeldingForm from '../../components/Sykmelding/SykmeldingForm'
import { DigitaliseringOppgaveResultFragment, OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
import { Location, useParam } from '../../utils/useParam'
import OppgaveView from '../../components/OppgaveView/OppgaveView'
import OppgaveStatus from '../../components/OppgaveStatus/OppgaveStatus'
import { SykmeldingSectionSkeleton } from '../../components/SykmeldingSection/SykmeldingSection'
import { InfoWithHeaderSkeleton, InputWithTitleSkeleton } from '../../components/skeleton/Skeletons'

function Utenlandsk(): JSX.Element {
    const { oppgaveId } = useParam(Location.Utenlansk)
    const { data, error, loading } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId },
    })

    return (
        <PageWrapper title="Registrering av sykmelding">
            <OppgaveView oppgave={data?.oppgave}>
                {loading && <OppgaveSkeleton />}
                {data?.oppgave && <DigitaliseringsOppgave oppgave={data.oppgave} />}
                {error && <Alert variant="error">Klarte ikke å laste oppgave med oppgave-id {oppgaveId}</Alert>}
            </OppgaveView>
        </PageWrapper>
    )
}

function DigitaliseringsOppgave({ oppgave }: { oppgave: DigitaliseringOppgaveResultFragment }): JSX.Element {
    if (oppgave.__typename === 'Digitaliseringsoppgave') {
        return <SykmeldingForm oppgave={oppgave} />
    } else {
        return <OppgaveStatus oppgave={oppgave} />
    }
}

function OppgaveSkeleton(): JSX.Element {
    return (
        <>
            {range(0, 4).map((it) => (
                <SykmeldingSectionSkeleton key={it}>
                    <div className="mb-12 flex gap-32">
                        <InfoWithHeaderSkeleton />
                        <InfoWithHeaderSkeleton />
                    </div>
                    <div className="mb-12 flex gap-32">
                        <InfoWithHeaderSkeleton />
                        <InfoWithHeaderSkeleton />
                    </div>
                    <InputWithTitleSkeleton />
                </SykmeldingSectionSkeleton>
            ))}
        </>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default Utenlandsk
