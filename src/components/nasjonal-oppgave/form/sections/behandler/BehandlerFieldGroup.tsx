import React, { ReactElement } from 'react'
import { HelpText, TextField } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { Behandler } from '../../../schema/sykmelding/Behandler'

import styles from './BehandlerFieldGroup.module.css'
import BehandlerInfo from './BehandlerInfo'

type Props = {
    behandlerInfo: Behandler | null
}

function BehandlerFieldGroup({ behandlerInfo }: Props): ReactElement {
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
                }
            },
        },
    })
    const { field: telefonField, fieldState: telefonState } = useController<NasjonalFormValues, 'behandler.tlf'>({
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
                    error={telefonState.error?.message}
                    label="12.5 Telefon"
                />
            </div>
            {hprField.value != null && <BehandlerInfo hpr={hprField.value} behandlerInfo={behandlerInfo} />}
        </div>
    )
}

export default BehandlerFieldGroup
