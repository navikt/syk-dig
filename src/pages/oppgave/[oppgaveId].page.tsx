import { useQuery } from '@apollo/client'
import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'

import { withAuthenticatedPage } from '../../auth/withAuth'
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import SykmeldingForm from '../../components/Sykmelding/SykmeldingForm'
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
import { Location, useParam } from '../../utils/useParam'
import OppgaveView from '../../components/OppgaveView/OppgaveView'

function Utenlandsk(): JSX.Element {
    const { oppgaveId } = useParam(Location.Utenlansk)
    const { data, error, loading } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId },
    })

    return (
        <PageWrapper title="Registrering av sykmelding">
            <OppgaveView oppgaveId={oppgaveId}>
                {loading && <Loader size="3xlarge" />}
                {data && <SykmeldingForm oppgave={data.oppgave} />}
                {error && <Alert variant="error">Klarte ikke å laste oppgave med oppgave-id {oppgaveId}</Alert>}
            </OppgaveView>
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default Utenlandsk
