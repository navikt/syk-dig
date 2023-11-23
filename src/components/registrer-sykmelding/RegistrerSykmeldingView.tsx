'use client'

import React, { ReactElement, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { BodyShort, Heading } from '@navikt/ds-react'
import { Alert, Button, TextField } from '@navikt/ds-react'

import {
    JournalpostByIdDocument,
    JournalpostFragment,
    JournalpostStatusEnum,
    SykmeldingFraJournalpostDocument,
} from '../../graphql/queries/graphql.generated'
import JournalpostView from '../OppgaveView/JournalpostView'

function RegistrerSykmeldingView(): ReactElement {
    const [journalpostId, setJournalpostId] = useState('')
    const [registrer, registrerResult] = useLazyQuery(JournalpostByIdDocument, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    })
    const journalpostResult = registrerResult.data?.journalpost ?? null

    return (
        <JournalpostView
            journalpost={journalpostResult?.__typename === 'Journalpost' ? journalpostResult : null}
            loading={registrerResult.loading}
            isError={registrerResult.error != null}
        >
            <div className="container p-4 mx-auto">
                <Heading size="large">Registrer sykmelding</Heading>
                <div className="flex items-end gap-3">
                    <TextField
                        className="grow"
                        label="JournalpostId"
                        value={journalpostId}
                        disabled={registrerResult.loading}
                        onChange={(event) => setJournalpostId(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                registrer({ variables: { id: journalpostId } })
                            }
                        }}
                    />
                    <div>
                        <Button
                            variant="secondary"
                            loading={registrerResult.loading}
                            onClick={() => registrer({ variables: { id: journalpostId } })}
                        >
                            Hent journalpost
                        </Button>
                    </div>
                </div>

                {registrerResult.error && (
                    <div className="mt-4">
                        <Alert variant="error">Klarte ikke å laste inn journalposten</Alert>
                    </div>
                )}
                {journalpostResult && journalpostResult.__typename === 'Journalpost' && (
                    <Journalpost journalpost={journalpostResult} />
                )}
                {journalpostResult && journalpostResult.__typename === 'JournalpostStatus' && (
                    <JournalpostStatus status={journalpostResult.status} />
                )}
            </div>
        </JournalpostView>
    )
}

function Journalpost({ journalpost }: { journalpost: JournalpostFragment }): ReactElement {
    return (
        <div className="p-4 mt-4">
            <Heading size="medium">Fant journalpost</Heading>
            <BodyShort>JournalpostId: {journalpost.journalpostId}</BodyShort>
            <BodyShort>Journalstatus: {journalpost.journalstatus}</BodyShort>
            <BodyShort>Fnr: {journalpost.fnr}</BodyShort>
            {journalpost.dokumenter.map((value) => (
                <div key={value.dokumentInfoId} className="bg-bg-subtle mb-2 p-2">
                    <BodyShort>Tittel: {value.tittel}</BodyShort>
                    <BodyShort>DokumentId: {value.dokumentInfoId}</BodyShort>
                </div>
            ))}
            <CreateSykmeldingForm journalpostId={journalpost.journalpostId} />
        </div>
    )
}

function JournalpostStatus({ status }: { status: JournalpostStatusEnum }): ReactElement {
    return (
        <div className="mt-4">
            <Alert variant="info">
                <Heading level="3" size="medium">
                    Journalpost er ikke tilgjengelig
                </Heading>
                <BodyShort>
                    {status === JournalpostStatusEnum.ManglerFnr
                        ? 'Mangler fødselsnummer'
                        : status === JournalpostStatusEnum.FeilTema
                          ? 'Har ikke tema "SYM"'
                          : 'Sykmelding er allerede opprettet'}
                </BodyShort>
            </Alert>
        </div>
    )
}

function CreateSykmeldingForm({ journalpostId }: { journalpostId: string }): ReactElement {
    const [create, createResult] = useMutation(SykmeldingFraJournalpostDocument, { variables: { id: journalpostId } })
    return (
        <div>
            Journalpost: {journalpostId}
            <div className="mt-4">
                <Button
                    variant="secondary"
                    loading={createResult.loading}
                    disabled={createResult.data != null}
                    onClick={() => create({ variables: { id: journalpostId } })}
                >
                    Opprett sykmelding
                </Button>
            </div>
            <div className="mt-4">
                {createResult.data && <Alert variant="success">Sykmelding ble opprettet</Alert>}
                {createResult.error && <Alert variant="error">Klarte ikke å opprette sykmelding</Alert>}
            </div>
        </div>
    )
}

export default RegistrerSykmeldingView
