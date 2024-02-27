import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { DatePicker, useDatepicker } from '@navikt/ds-react'

import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { SMREG_SHORTHAND_FORMAT } from '../../../smregDateUtils'
import { SelectedDate } from '../../../../FormComponents/dates/SelectedDate'

function TilbakedateringSectionGroup(): ReactElement {
    const { field: tilbakedateringField } = useController<NasjonalFormValues, 'tilbakedatering.tilbakedatert'>({
        name: 'tilbakedatering.tilbakedatert',
    })
    const { field: tilbakedatertDatoField } = useController<NasjonalFormValues, 'tilbakedatering.tilbakedatertDato'>({
        name: 'tilbakedatering.tilbakedatertDato',
    })
    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        defaultSelected: tilbakedatertDatoField.value ? tilbakedatertDatoField.value : undefined,
        onDateChange: (date) => {
            tilbakedatertDatoField.onChange(date ?? null)
        },
        inputFormat: SMREG_SHORTHAND_FORMAT,
    })

    return (
        <div className="flex flex-col gap-4">
            <SoloCheckbox {...tilbakedateringField} legend="11.1">
                Er sykmeldingen tilbakedatert?
            </SoloCheckbox>
            {tilbakedateringField.value && (
                <div className="flex flex-col gap-3">
                    <DatePicker {...datepickerProps}>
                        <DatePicker.Input
                            {...inputProps}
                            label="Oppgi dato for dokumenterbar kontakt med pasienten"
                            placeholder="DDMMÅÅ"
                        />
                    </DatePicker>
                    <SelectedDate date={selectedDay} />
                </div>
            )}
        </div>
    )
}

export default TilbakedateringSectionGroup
