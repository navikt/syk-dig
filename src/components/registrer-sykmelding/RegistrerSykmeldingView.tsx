'use client'

import React, { ReactElement, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { BodyShort, Detail, Heading } from '@navikt/ds-react'
import { Alert, Button, TextField, RadioGroup, Radio } from '@navikt/ds-react'

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
        <div className="mt-8">
            <Heading size="medium" spacing>
                Journalpostdetaljer
            </Heading>
            <div className="flex gap-3 mb-8">
                <div className="p-4 bg-bg-subtle">
                    <Detail>ID</Detail>
                    <BodyShort>{journalpost.journalpostId}</BodyShort>
                </div>
                <div className="p-4 bg-bg-subtle">
                    <Detail>Status</Detail>
                    <BodyShort>Journalstatus: {journalpost.journalstatus}</BodyShort>
                </div>
                <div className="p-4 bg-bg-subtle">
                    <Detail>Fødselsnummer</Detail>
                    <BodyShort>{journalpost.fnr}</BodyShort>
                </div>
            </div>
            <Heading size="medium" spacing>
                Dokumenter
            </Heading>
            <div className="flex gap-3">
                {journalpost.dokumenter.map((value, index) => (
                    <div key={value.dokumentInfoId} className="bg-bg-subtle p-4">
                        <Detail>Dokument {index + 1}</Detail>
                        <BodyShort>Tittel: {value.tittel}</BodyShort>
                        <BodyShort>DokumentId: {value.dokumentInfoId}</BodyShort>
                    </div>
                ))}
            </div>
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
    const [sykmeldingType, setSykmeldingType] = useState<string | null>(null)
    const [create, createResult] = useMutation(SykmeldingFraJournalpostDocument)

    return (
        <div className="mt-8">
            <Heading size="medium" spacing>
                Opprett sykmelding
            </Heading>
            <RadioGroup legend="Er det norsk eller utenlandsk sykmelding?" onChange={(val) => setSykmeldingType(val)}>
                <Radio value="norsk" disabled={createResult.data != null}>
                    Norsk sykmelding
                </Radio>
                <Radio value="utenlandsk" disabled={createResult.data != null}>
                    Utenlandsk sykmelding
                </Radio>
            </RadioGroup>
            <div className="mt-4">
                <Button
                    variant="secondary"
                    loading={createResult.loading}
                    disabled={createResult.data != null || sykmeldingType == null}
                    onClick={() => create({ variables: { id: journalpostId, norsk: sykmeldingType === 'norsk' } })}
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
