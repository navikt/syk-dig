import { useQuery } from '@apollo/client'
import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import { ReactElement } from 'react'
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

function Utenlandsk(): ReactElement {
    const { oppgaveId } = useParam(Location.Utenlansk)
    const { data, error, loading } = useQuery(OppgaveByIdDocument, {
        variables: { oppgaveId },
    })

    return (
        <PageWrapper title="Registrering av sykmelding">
            <OppgaveView oppgave={data?.oppgave} loading={loading} isError={error != null}>
                {loading && <OppgaveSkeleton />}
                {data?.oppgave && <DigitaliseringsOppgave oppgave={data.oppgave} />}
                {error && <OppgaveError oppgaveId={oppgaveId} />}
            </OppgaveView>
        </PageWrapper>
    )
}

function DigitaliseringsOppgave({ oppgave }: { oppgave: DigitaliseringOppgaveResultFragment }): ReactElement {
    if (oppgave.__typename === 'Digitaliseringsoppgave') {
        return <SykmeldingForm oppgave={oppgave} />
    } else {
        return <OppgaveStatus oppgave={oppgave} />
    }
}

function OppgaveSkeleton(): ReactElement {
    return (
        <>
            {range(0, 4).map((it) => (
                <SykmeldingSectionSkeleton key={it}>
                    <div className="mb-16 flex gap-32">
                        <InfoWithHeaderSkeleton />
                        <InfoWithHeaderSkeleton />
                    </div>
                    <div className="mb-18 flex gap-32">
                        <InfoWithHeaderSkeleton lines={2} />
                        <InfoWithHeaderSkeleton lines={3} />
                    </div>
                    <InputWithTitleSkeleton />
                </SykmeldingSectionSkeleton>
            ))}
        </>
    )
}

function OppgaveError({ oppgaveId }: { oppgaveId: string }): ReactElement {
    return (
        <Alert variant="error" className="m-4">
            <Heading size="small" spacing>
                En uventet feil oppsto
            </Heading>
            <BodyShort spacing>{`Klarte ikke å laste oppgave med oppgave-id "${oppgaveId}".`}</BodyShort>
            <BodyShort>
                Du kan klikke her for å <Link href="">oppfriske</Link> siden. Dersom problemet vedvarer kan du kontakte
                Team Sykmelding på <a href="https://nav-it.slack.com/archives/CMA3XV997">Slack</a> eller ta kontakt med
                brukerstøtte
            </BodyShort>
        </Alert>
    )
}

export const getServerSideProps = withAuthenticatedPage()

export default Utenlandsk
