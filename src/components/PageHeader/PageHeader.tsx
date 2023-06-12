import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Select, InternalHeader as Header } from '@navikt/ds-react'
import Link from 'next/link'

import { ModiaContextDocument, UpdateAktivEnhetDocument } from '../../graphql/queries/graphql.generated'
import { browserEnv } from '../../utils/env'

import styles from './PageHeader.module.css'

function PageHeader(): JSX.Element {
    const { data } = useQuery(ModiaContextDocument)
    const [updateAktivEnhet] = useMutation(UpdateAktivEnhetDocument)

    return (
        <Header className={styles.header}>
            <HeaderText />
            {data?.modia && (
                <div className={styles.enhetMenu} data-theme="dark">
                    <Select
                        label=""
                        size="small"
                        value={data.modia.aktivEnhet ?? ''}
                        onChange={(event) => {
                            updateAktivEnhet({
                                variables: { enhetId: event.target.value },
                            })
                        }}
                    >
                        {data.modia.enheter.map((enhet) => (
                            <option key={enhet.enhetId} value={enhet.enhetId}>
                                {enhet.enhetId} {enhet.navn}
                            </option>
                        ))}
                    </Select>
                </div>
            )}
            {data?.modia && (
                <Header.User
                    name={data.modia.navn}
                    description={`Enhet: ${data.modia.aktivEnhet ?? 'Ingen enhet valgt'}`}
                />
            )}
            {!data?.modia && <Header.User name="Feil under lasting" description="Klarte ikke å laste enhet" />}
        </Header>
    )
}

function HeaderText(): JSX.Element {
    if (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production') {
        return <Header.Title as="div">Registrering av sykmelding</Header.Title>
    }

    return (
        <Link href="/" legacyBehavior passHref>
            <Header.Title as="a">Registrering av sykmelding</Header.Title>
        </Link>
    )
}

export default PageHeader
