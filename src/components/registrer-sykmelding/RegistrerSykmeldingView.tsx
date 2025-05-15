'use client'

import React, { ReactElement, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import Link from 'next/link'
import { Alert, BodyShort, Button, Detail, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react'

import {
    JournalpostByIdDocument,
    JournalpostFragment,
    JournalpostStatusEnum,
    SykmeldingFraJournalpostDocument,
} from '../../graphql/queries/graphql.generated'
import SplitDocumentView from '../split-view-layout/SplitDocumentView'
import { PaneView } from '../split-view-layout/persistent-layout'

import RegistrerSykmeldingDocuments from './RegistrerSykmeldingDocuments'

function RegistrerSykmeldingView({ layout }: PaneView): ReactElement {
    const [journalpostId, setJournalpostId] = useState('')
    const [registrer, registrerResult] = useLazyQuery(JournalpostByIdDocument, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    })
    const journalpostResult = registrerResult.data?.journalpost ?? null

    return (
        <SplitDocumentView
            title="Registrer sykmelding"
            documentView={<RegistrerSykmeldingDocuments query={registrerResult} />}
            closeReturnsTo="gosys"
            defaultLayout={layout}
        >
            <div className="container p-4 mx-auto">
                <div className="flex items-end gap-3">
                    <TextField
                        className="grow"
                        label="JournalpostId"
                        value={journalpostId}
                        disabled={registrerResult.loading}
                        onChange={(event) => setJournalpostId(event.target.value.trim())}
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
        </SplitDocumentView>
    )
}

function Journalpost({ journalpost }: { journalpost: JournalpostFragment }): ReactElement {
    return (
        <div className="mt-8">
            <Heading level="2" size="medium" spacing>
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
            <Heading level="2" size="medium" spacing>
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

function createStatusMelding(status: JournalpostStatusEnum): string {
    switch (status) {
        case JournalpostStatusEnum.FeilKanal:
            return 'Feil kanal'
        case JournalpostStatusEnum.FeilTema:
            return 'Har ikke tema "SYM"'
        case JournalpostStatusEnum.ManglendeJournalpost:
            return 'Mangler journalpost'
        case JournalpostStatusEnum.ManglerFnr:
            return 'Mangler fødselsnummer'
        case JournalpostStatusEnum.Opprettet:
            return 'Sykmelding er allerede opprettet'
        case JournalpostStatusEnum.FeilType:
            return 'Journalposttype er av type notat'
    }
}

function JournalpostStatus({ status }: { status: JournalpostStatusEnum }): ReactElement {
    const feilmelding = createStatusMelding(status)

    return (
        <div className="mt-4">
            <Alert variant="info">
                <Heading level="3" size="medium">
                    Journalpost er ikke tilgjengelig
                </Heading>
                <BodyShort>{feilmelding}</BodyShort>
            </Alert>
        </div>
    )
}

function CreateSykmeldingForm({ journalpostId }: { journalpostId: string }): ReactElement {
    const [sykmeldingType, setSykmeldingType] = useState<string | null>(null)
    const [create, createResult] = useMutation(SykmeldingFraJournalpostDocument)
    const createdOppgaveId: string | null = createResult.data?.sykmeldingFraJournalpost.oppgaveId ?? null
    const opprettetSykmeldingStatus: JournalpostStatusEnum | null =
        createResult.data?.sykmeldingFraJournalpost.status ?? null
    return (
        <div className="mt-8">
            <Heading level="2" size="medium" spacing>
                Opprett sykmelding
            </Heading>
            <RadioGroup
                legend="Er det en norsk eller en utenlandsk sykmelding?"
                onChange={(val) => setSykmeldingType(val)}
            >
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
                {opprettetSykmeldingStatus === JournalpostStatusEnum.Opprettet && (
                    <Alert variant="success">
                        <Heading level="3" size="medium">
                            Sykmelding ble opprettet
                        </Heading>
                        {createdOppgaveId && sykmeldingType === 'utenlandsk' && (
                            <BodyShort>
                                Du kan digitalisere denne utenlandske sykmeldingen ved å{' '}
                                <Link href={`/oppgave/${createdOppgaveId}?source=registrer-sykmelding`}>
                                    gå til oppgaven
                                </Link>
                                .
                            </BodyShort>
                        )}
                        {createdOppgaveId && sykmeldingType === 'norsk' && (
                            <BodyShort>
                                Du kan digitalisere denne nasjonale sykmeldingen ved å{' '}
                                <Link href={`/nasjonal/${createdOppgaveId}?source=registrer-sykmelding`}>
                                    gå til oppgaven
                                </Link>
                                .
                            </BodyShort>
                        )}
                    </Alert>
                )}
                {opprettetSykmeldingStatus != null && opprettetSykmeldingStatus !== JournalpostStatusEnum.Opprettet && (
                    <JournalpostStatus status={opprettetSykmeldingStatus} />
                )}
                {createResult.error && <Alert variant="error">Klarte ikke å opprette sykmelding</Alert>}
            </div>
        </div>
    )
}

export default RegistrerSykmeldingView
