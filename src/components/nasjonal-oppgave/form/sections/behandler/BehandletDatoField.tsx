import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { Button, DatePicker, useDatepicker } from '@navikt/ds-react'
import { XMarkIcon } from '@navikt/aksel-icons'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { SMREG_SHORTHAND_FORMAT } from '../../../smregDateUtils'
import { SelectedDate } from '../../../../FormComponents/dates/SelectedDate'

function BehandletDatoField(): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, 'behandler.behandletDato'>({
        name: 'behandler.behandletDato',
        rules: {
            required: 'Behandletdato må være definert',
        },
    })

    const { datepickerProps, inputProps, selectedDay, setSelected } = useDatepicker({
        defaultSelected: field.value ? field.value : undefined,
        onDateChange: (date) => {
            field.onChange(date ?? null)
        },
        inputFormat: SMREG_SHORTHAND_FORMAT,
    })

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-end">
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input
                        {...inputProps}
                        label="12.1 Behandletdato"
                        placeholder="DDMMÅÅ"
                        error={fieldState.error?.message}
                        id="behandler.behandletDato"
                    />
                </DatePicker>
                <div>
                    <Button
                        variant="tertiary"
                        icon={<XMarkIcon />}
                        iconPosition="left"
                        type="button"
                        onClick={() => {
                            setSelected(undefined)
                        }}
                    >
                        Fjern dato
                    </Button>
                </div>
            </div>
            <SelectedDate date={selectedDay} />
        </div>
    )
}

export default BehandletDatoField
