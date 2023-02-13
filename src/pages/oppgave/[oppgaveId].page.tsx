import { useQuery } from '@apollo/client'
import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'

import { withAuthenticatedPage } from '../../auth/withAuth'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import SykmeldingForm from '../../components/Sykmelding/SykmeldingForm'
import { DigitaliseringOppgaveResultFragment, OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
import { Location, useParam } from '../../utils/useParam'
import OppgaveView from '../../components/OppgaveView/OppgaveView'
import OppgaveStatus from '../../components/OppgaveStatus/OppgaveStatus'

function Utenlandsk(): JSX.Element {
    const { oppgaveId } = useParam(Location.Utenlansk)
    const { data, error, loading } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId },
    })

    return (
        <PageWrapper title="Registrering av sykmelding">
            <OppgaveView oppgave={data?.oppgave}>
                {loading && <Loader size="3xlarge" />}
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

export const getServerSideProps = withAuthenticatedPage()

export default Utenlandsk
