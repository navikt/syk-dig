import { withAuthenticatedPage } from '../auth/withAuth'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { Button, Heading, TextField } from '@navikt/ds-react'
import { useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { redirectTilGosys } from '../components/Sykmelding/ActionSection/ActionSection'
import { OppgaveByIdDocument } from '../graphql/queries/graphql.generated'

export default () => {
    const [fnr, setFnr] = useState('')
    const [registrer, registrerResult] = useLazyQuery(OppgaveByIdDocument, {
        onCompleted: () => {},
    })

    return (
        <PageWrapper title="Registrer sykmelding">
            <div className="container p-4 mx-auto">
                <Heading size="large">Registrer sykmelding</Heading>
                <TextField label="JournalpostId" value={fnr} onChange={(event) => setFnr(event.target.value)} />
                <Button variant="primary" onClick={() => registrer({ variables: { oppgaveId: fnr } })}>
                    Hent journalpost
                </Button>
            </div>
            {JSON.stringify(registrerResult.data)}
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage()
