import { Button, Heading, TextField, Alert, BodyShort } from '@navikt/ds-react'
import { ReactElement, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { JournalpostByIdDocument } from '../graphql/queries/graphql.generated'
import PageWrapper from '../components/PageWrapper/PageWrapper'
import { withAuthenticatedPage } from '../auth/withAuth'
import JournalpostView from '../components/OppgaveView/JournalpostView'
import { getModiaContext } from '../modia/ModiaService'
import { getFlagsServerSide } from '../toggles/ssr'

function RegistrerSykmelding(): ReactElement {
    const [journalPost, setJournalPost] = useState('')
    const [registrer, registrerResult] = useLazyQuery(JournalpostByIdDocument, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    })

    return (
        <PageWrapper title="Registrer sykmelding">
            <JournalpostView
                journalpost={registrerResult.data?.journalpost}
                loading={registrerResult.loading}
                isError={registrerResult.error != null}
            >
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
                        <div className="p-4 mt-4">
                            <Heading size="medium">Fant journalpost</Heading>
                            <BodyShort>{registrerResult.data.journalpost.journalpostId}</BodyShort>
                            <BodyShort>{registrerResult.data.journalpost.journalstatus}</BodyShort>
                            {registrerResult.data.journalpost.dokumenter.map((value) => (
                                <div key={value.dokumentInfoId} className="bg-bg-subtle mb-2 p-2">
                                    <BodyShort>Tittel: {value.tittel}</BodyShort>
                                    <BodyShort>DokumentId: {value.dokumentInfoId}</BodyShort>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </JournalpostView>
        </PageWrapper>
    )
}

export const getServerSideProps = withAuthenticatedPage(async (context, accessToken) => {
    const flags = await getFlagsServerSide(context.req, context.res)
    const flagEnabled = flags.toggles.find((it) => it.name === 'SYK_DIG_CREATE_NEW_SYKMELDING')?.enabled ?? false

    if (!flagEnabled) {
        return { notFound: true }
    }

    const modiaContext = await getModiaContext(accessToken)
    return {
        props: {
            modiaContext,
            toggles: flags.toggles,
        },
    }
})

export default RegistrerSykmelding
