import React, { ReactElement } from 'react'
import { gql, QueryResult, useQuery } from '@apollo/client'
import { logger } from '@navikt/next-logger'
import { Alert, Heading, HelpText, Loader, Table, Tag } from '@navikt/ds-react'

import FormInfo from '../../../../form-layout/FormInfo'
import { Behandler } from '../../../schema/sykmelding/Behandler'
import { AutorisasjonValues, HelsepersonellkategoriValues, Sykmelder } from '../../../schema/Sykmelder'

type Props = {
    behandlerInfo: Behandler | null
    hpr: string
    isValidHpr: RegExpMatchArray
}

type BehandlerResult = {
    sykmelder: Sykmelder
}

function BehandlerInfo({ behandlerInfo, hpr, isValidHpr }: Props): ReactElement | null {
    const { data, loading } = useBehandler(hpr, isValidHpr)
    const sykmelder = data?.sykmelder

    if (loading) {
        return (
            <div className="p-4 bg-surface-subtle flex justify-center items-center">
                <Loader size="2xlarge" />
            </div>
        )
    }

    if (!sykmelder) {
        return (
            <Alert variant="error">
                Vi klarte ikke å laste behandleren akkurat nå. Du kan prøve igjen senere. Dersom problemet vedvarer, ta
                kontakt med brukerstøtte.
            </Alert>
        )
    }

    return (
        <div className="p-4 bg-surface-subtle">
            <Heading level="3" size="medium" className="flex gap-3 items-center" spacing>
                Informasjon om behandleren
                <HelpText title="Detaljer om behandleren">
                    Informasjon om behandler er hentet fra HPR, basert på HPR-nummeret som ble lest ut fra
                    papirsykmeldingen. Her kan det skje tolkningsfeil, pass på at informasjonen stemmer med
                    informasjonen i papirsykmeldingen.
                </HelpText>
            </Heading>
            <div className="grid grid-cols-2 gap-8">
                <FormInfo title="Navn">
                    {sykmelder.fornavn} {sykmelder.mellomnavn} {sykmelder.etternavn}
                </FormInfo>
                <FormInfo title="Fødselsnummer">{sykmelder.fnr}</FormInfo>
                <FormInfo
                    className="col-span-2"
                    title={
                        <div className="inline-flex gap-3">
                            Navn fra papirsykmeldingen
                            <HelpText title="HPR-nummer info">
                                Dette er informasjon lest ut fra den skannede papirsykmeldingen. Hvis navnet ikke
                                samsvarer med navnet over kan det tyde på at HPR-nummer har blitt tolket feil.
                            </HelpText>
                        </div>
                    }
                >
                    {behandlerInfo != null ? (
                        <>
                            {behandlerInfo.fornavn} {behandlerInfo.mellomnavn} {behandlerInfo.etternavn}
                        </>
                    ) : (
                        'Klarte ikke hente ut navn fra papirsykmelding'
                    )}
                </FormInfo>
                <FormInfo
                    className="col-span-2"
                    title={
                        <div className="inline-flex gap-3">
                            Autorisasjoner
                            <HelpText title="HPR-nummer info">
                                Viser behandlers lisenser og autorisasjoner fra Helsedirektoratet.
                            </HelpText>
                        </div>
                    }
                >
                    <Table className="mt-4">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Kategori</Table.HeaderCell>
                                <Table.HeaderCell>Autorisasjonstype</Table.HeaderCell>
                                <Table.HeaderCell>Autorisert</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {sykmelder.godkjenninger.map((godkjenning, index) => {
                                if (godkjenning.helsepersonellkategori?.verdi && godkjenning.autorisasjon?.verdi) {
                                    return (
                                        <Table.Row key={index}>
                                            <Table.DataCell>
                                                {HelsepersonellkategoriValues[godkjenning.helsepersonellkategori.verdi]}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {`${godkjenning.autorisasjon.verdi} ${
                                                    AutorisasjonValues[godkjenning.autorisasjon.verdi]
                                                }`}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {godkjenning.autorisasjon.aktiv ? (
                                                    <Tag variant="success">Ja</Tag>
                                                ) : (
                                                    <Tag variant="error">Nei</Tag>
                                                )}
                                            </Table.DataCell>
                                        </Table.Row>
                                    )
                                }
                                return null
                            })}
                        </Table.Body>
                    </Table>
                </FormInfo>
            </div>
        </div>
    )
}

export function useBehandler(hpr: string, isValidHpr: false | RegExpMatchArray | null): QueryResult<BehandlerResult> {
    return useQuery<BehandlerResult>(
        gql`
            query Behandler($hpr: String!) {
                sykmelder(hpr: $hpr) @rest(type: "Sykmelder", path: "proxy/sykmelder/{args.hpr}") {
                    hprNummer
                    fnr
                    fornavn
                    mellomnavn
                    etternavn
                    godkjenninger
                }
            }
        `,
        {
            variables: { hpr },
            fetchPolicy: 'network-only',
            notifyOnNetworkStatusChange: true,
            skip: !isValidHpr,
            onError: (e) => logger.error(e),
        },
    )
}

export default BehandlerInfo
