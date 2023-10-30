import { Button, Heading, TextField, Alert, BodyShort } from '@navikt/ds-react'
import { ReactElement, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { JournalpostByIdDocument } from '../graphql/queries/graphql.generated'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { withAuthenticatedPage } from '../auth/withAuth'

function RegistrerSykmelding(): ReactElement {
    const [journalPost, setJournalPost] = useState('')
    const [registrer, registrerResult] = useLazyQuery(JournalpostByIdDocument, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    })

    return (
        <PageWrapper title="Registrer sykmelding">
            <div className="container p-4 mx-auto">
                <Heading size="large">Registrer sykmelding</Heading>
                <div className="flex items-end gap-3">
                    <TextField
                        className="grow"
                        label="JournalpostId"
                        value={journalPost}
                        disabled={registrerResult.loading}
                        onChange={(event) => setJournalPost(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                registrer({ variables: { id: journalPost } })
                            }
                        }}
                    />
                    <div>
                        <Button
                            variant="secondary"
                            loading={registrerResult.loading}
                            onClick={() => registrer({ variables: { id: journalPost } })}
                        >
                            Hent journalpost
                        </Button>
                    </div>
                </div>
                {registrerResult.error && <Alert variant="error">Klarte ikke å laste inn journalposten</Alert>}
                {registrerResult.data && (
                    <div className="p-4">
                        <Heading size="medium">Fant journalpost</Heading>
                        <BodyShort>{registrerResult.data.journalpost.journalpostId}</BodyShort>
                        <BodyShort>{registrerResult.data.journalpost.journalstatus}</BodyShort>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage()
export default RegistrerSykmelding
