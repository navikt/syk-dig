import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { BodyShort, DatePicker, useDatepicker } from '@navikt/ds-react'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { formatsmregDate, SMREG_SHORTHAND_FORMAT } from '../../../smregDateUtils'

function BehandletDatoField(): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, 'behandler.behandletDato'>({
        name: 'behandler.behandletDato',
        rules: {
            required: 'Behandletdato må være definert',
        },
    })

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        defaultSelected: field.value ? field.value : undefined,
        onDateChange: (date) => {
            field.onChange(date ?? null)
        },
        inputFormat: SMREG_SHORTHAND_FORMAT,
    })

    return (
        <div>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    label="12.1 Behandletdato"
                    placeholder="DDMMÅÅ"
                    error={fieldState.error?.message}
                />
            </DatePicker>
            {selectedDay && <BodyShort>{formatsmregDate(selectedDay)}</BodyShort>}
        </div>
    )
}

export default BehandletDatoField
