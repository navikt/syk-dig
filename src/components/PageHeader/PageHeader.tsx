import { ReactElement } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Select, InternalHeader } from '@navikt/ds-react'
import Link from 'next/link'

import { ModiaContextDocument, UpdateAktivEnhetDocument } from '../../graphql/queries/graphql.generated'
import { browserEnv } from '../../utils/env'

import styles from './PageHeader.module.css'

function PageHeader(): ReactElement {
    const { data } = useQuery(ModiaContextDocument)
    const [updateAktivEnhet] = useMutation(UpdateAktivEnhetDocument)

    return (
        <InternalHeader className={styles.header}>
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
                <InternalHeader.User
                    name={data.modia.navn}
                    description={`Enhet: ${data.modia.aktivEnhet ?? 'Ingen enhet valgt'}`}
                />
            )}
            {!data?.modia && <InternalHeader.User name="Feil under lasting" description="Klarte ikke å laste enhet" />}
        </InternalHeader>
    )
}

function HeaderText(): ReactElement {
    if (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production') {
        return <InternalHeader.Title as="div">Registrering av sykmelding</InternalHeader.Title>
    }

    return (
        <InternalHeader.Title as={Link} href="/">
            Registrering av sykmelding
        </InternalHeader.Title>
    )
}

export default PageHeader
