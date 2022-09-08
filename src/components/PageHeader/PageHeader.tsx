import React from 'react';
import { Header } from '@navikt/ds-react-internal';
import { useMutation, useQuery } from '@apollo/client';
import { Select } from '@navikt/ds-react';

import { ModiaContextDocument, UpdateAktivEnhetDocument } from '../../graphql/queries/graphql.generated';

import styles from './PageHeader.module.css';

function PageHeader(): JSX.Element {
    const { data, error } = useQuery(ModiaContextDocument);
    const [updateAktivEnhet] = useMutation(UpdateAktivEnhetDocument);

    return (
        <Header>
            <Header.Title href="#thecakeisalie">Digitalisering av sykmeldinger</Header.Title>
            {data?.modia && (
                <div className={styles.enhetMenu} data-theme="dark">
                    <Select
                        label=""
                        size="small"
                        value={data.modia.aktivEnhet ?? ''}
                        onChange={(event) => {
                            updateAktivEnhet({
                                variables: { enhetId: event.target.value },
                            });
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
            {error && <Header.User name="Klarte ikke å laste informasjon" description={error.message} />}
        </Header>
    );
}

export default PageHeader;