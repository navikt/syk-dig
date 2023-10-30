import { Button, Heading, TextField, Alert } from '@navikt/ds-react'
import { ReactElement, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { JournalpostByIdDocument } from '../graphql/queries/graphql.generated'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { withAuthenticatedPage } from '../auth/withAuth'

function RegistrerSykmelding(): ReactElement {
    const [journalPost, setJournalPost] = useState('')
    const [registrer, registrerResult] = useLazyQuery(JournalpostByIdDocument, {})

    return (
        <PageWrapper title="Registrer sykmelding">
            <div className="container p-4 mx-auto">
                <Heading size="large">Registrer sykmelding</Heading>
                <TextField
                    label="JournalpostId"
                    value={journalPost}
                    onChange={(event) => setJournalPost(event.target.value)}
                />
                <Button variant="primary" onClick={() => registrer({ variables: { id: journalPost } })}>
                    Hent journalpost
                </Button>
            </div>
            {registrerResult.error && <Alert variant="error">Klarte ikke å laste inn journalposten</Alert>}
            {registrerResult.data && (
                <div className="p-4">Is good! {registrerResult.data.journalpost.journalstatus}</div>
            )}
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage()
export default RegistrerSykmelding
