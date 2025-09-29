import React, { ReactElement } from 'react'
import { Alert, HelpText, TextField } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { BehandlerFragment } from '../../../../../graphql/queries/graphql.generated'

import styles from './BehandlerFieldGroup.module.css'
import BehandlerInfo, { useBehandler } from './BehandlerInfo'
import { hprCorrectLength, hprOnlyNumbers } from './behandler-utils'

type Props = {
    behandlerInfo: BehandlerFragment | null
}

function BehandlerFieldGroup({ behandlerInfo }: Props): ReactElement {
    const { field: hprField, fieldState: hprState } = useController<NasjonalFormValues, 'behandler.hpr'>({
        name: 'behandler.hpr',
        rules: {
            validate: (value) => {
                if (!value) {
                    return 'Behandlers HPR-nummer må være definert'
                } else if (!hprCorrectLength(value)) {
                    return 'Behandlers HPR-nummer må være mellom 7 og 9 siffer'
                } else if (!hprOnlyNumbers(value)) {
                    return 'Behandlers HPR-nummer er ikke på et gyldig format'
                } else if (data?.sykmelder == null) {
                    return 'Kan ikke registrere sykmelding uten behandler.'
                }
            },
        },
    })
    const { field: telefonField } = useController<NasjonalFormValues, 'behandler.tlf'>({
        name: 'behandler.tlf',
    })

    const currentHpr = hprField.value?.trim() ?? ''
    const isValidHpr = currentHpr && hprCorrectLength(currentHpr) && hprOnlyNumbers(currentHpr)
    const { data, loading, error, called } = useBehandler(currentHpr ?? '', !isValidHpr)

    return (
        <div className="flex flex-col gap-4">
            <div className={styles.behandlerInputsWrapper}>
                <TextField
                    className={styles.behandlerInput}
                    {...hprField}
                    value={hprField.value ?? ''}
                    error={hprState.error?.message}
                    id="behandler.hpr"
                    label={
                        <div className="inline-flex gap-3">
                            12.4 HPR-nummer
                            <HelpText title="HPR-nummer info">
                                HPR-nummer skal være et tall på mellom 7 og 9 siffer
                            </HelpText>
                        </div>
                    }
                />
                <TextField
                    className={styles.behandlerInput}
                    {...telefonField}
                    value={telefonField.value ?? ''}
                    label="12.5 Telefon"
                />
            </div>
            {!isValidHpr && <Alert variant="error">HPR-nummeret er ikke gyldig.</Alert>}
            {isValidHpr && data?.sykmelder && (
                <BehandlerInfo behandlerInfo={behandlerInfo} sykmelder={data.sykmelder} />
            )}
            {called && data && data.sykmelder == null && (
                <Alert variant="warning">Fant ikke behandler for HPR-nr {currentHpr}</Alert>
            )}
            {!loading && error && (
                <Alert variant="error">
                    Vi klarte ikke å laste behandleren akkurat nå. Du kan prøve igjen senere. Dersom problemet vedvarer,
                    ta kontakt med brukerstøtte.
                </Alert>
            )}
        </div>
    )
}

export default BehandlerFieldGroup
