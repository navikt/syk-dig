import React, { ReactElement } from 'react'
import { QueryResult, useQuery } from '@apollo/client'
import { logger } from '@navikt/next-logger'
import { Alert, Heading, HelpText, Loader, Table, Tag } from '@navikt/ds-react'

import FormInfo from '../../../../form-layout/FormInfo'
import { AutorisasjonValues, HelsepersonellkategoriValues } from '../../../schema/Sykmelder'
import {
    BehandlerFragment,
    SykmelderDocument,
    SykmelderQuery,
    SykmelderQueryVariables,
} from '../../../../../graphql/queries/graphql.generated'

type Props = {
    behandlerInfo: BehandlerFragment | null
    hpr: string
    isValidHpr: RegExpMatchArray
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
            <div className="flex">
                <Heading level="3" size="medium" spacing>
                    Informasjon om behandleren
                </Heading>
                <HelpText title="Detaljer om behandleren" className="pl-3 pt-1">
                    Informasjon om behandler er hentet fra HPR, basert på HPR-nummeret som ble lest ut fra
                    papirsykmeldingen. Her kan det skje tolkningsfeil, pass på at informasjonen stemmer med
                    informasjonen i papirsykmeldingen.
                </HelpText>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <FormInfo title="Navn" headingLeave="4">
                    {sykmelder.fornavn} {sykmelder.mellomnavn} {sykmelder.etternavn}
                </FormInfo>
                <FormInfo title="Fødselsnummer" headingLeave="4">
                    {sykmelder.fnr}
                </FormInfo>
                <FormInfo
                    className="col-span-2"
                    headingLeave="4"
                    title={
                        <div className="inline-flex gap-3">
                            <Heading level="4" size="xsmall">
                                Navn fra papirsykmeldingen
                            </Heading>
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
                    className="overflow-x-auto col-span-2"
                    headingLeave="4"
                    title={
                        <div className="inline-flex gap-3">
                            <Heading level="4" size="xsmall">
                                Autorisasjoner
                            </Heading>
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
                            {sykmelder.godkjenninger?.map((godkjenning, index) => {
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

export function useBehandler(
    hprNummer: string,
    isValidHpr: false | RegExpMatchArray | null,
): QueryResult<SykmelderQuery, SykmelderQueryVariables> {
    return useQuery(SykmelderDocument, {
        variables: { hprNummer },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        skip: !isValidHpr,
        onError: (e) => logger.error(e),
    })
}

export default BehandlerInfo
