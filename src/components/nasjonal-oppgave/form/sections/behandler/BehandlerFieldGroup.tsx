import React, { ReactElement } from 'react'
import { Alert, HelpText, TextField } from '@navikt/ds-react'
import { useController, useWatch } from 'react-hook-form'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { BehandlerFragment } from '../../../../../graphql/queries/graphql.generated'

import styles from './BehandlerFieldGroup.module.css'
import BehandlerInfo, { useBehandler } from './BehandlerInfo'

type Props = {
    behandlerInfo: BehandlerFragment | null
}

function BehandlerFieldGroup({ behandlerInfo }: Props): ReactElement {
    const hpr = useWatch({ name: 'behandler.hpr' })
    const isValidHpr: false | RegExpMatchArray | null =
        hpr?.length >= 7 && hpr?.length <= 9 && hpr.match('^\\+?[- _0-9]+$')
    const { data } = useBehandler(hpr, isValidHpr)
    const { field: hprField, fieldState: hprState } = useController<NasjonalFormValues, 'behandler.hpr'>({
        name: 'behandler.hpr',
        rules: {
            validate: (value) => {
                if (!value) {
                    return 'Behandlers HPR-nummer må være definert'
                } else if (value.length < 7 || value.length > 9) {
                    return 'Behandlers HPR-nummer må være mellom 7 og 9 siffer'
                } else if (!value.match('^\\+?[- _0-9]+$')) {
                    return 'Behandlers HPR-nummer er ikke på et gyldig format'
                } else if (!data?.sykmelder) {
                    return 'Vi klarte ikke å laste behandleren.'
                }
            },
        },
    })
    const { field: telefonField } = useController<NasjonalFormValues, 'behandler.tlf'>({
        name: 'behandler.tlf',
    })

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
            {!isValidHpr ? (
                <Alert variant="error">HPR-nummeret er ikke gyldig.</Alert>
            ) : (
                hprField.value != null && (
                    <BehandlerInfo hpr={hprField.value} behandlerInfo={behandlerInfo} isValidHpr={isValidHpr} />
                )
            )}
        </div>
    )
}

export default BehandlerFieldGroup
