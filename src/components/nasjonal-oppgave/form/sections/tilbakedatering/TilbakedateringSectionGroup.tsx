import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { BodyShort, DatePicker, useDatepicker } from '@navikt/ds-react'

import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { formatsmregDate, SMREG_SHORTHAND_FORMAT } from '../../../smregDateUtils'

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
        <div>
            <SoloCheckbox {...tilbakedateringField} legend="11.1">
                Er sykmeldingen tilbakedatert?
            </SoloCheckbox>
            {tilbakedateringField.value && (
                <>
                    <DatePicker {...datepickerProps}>
                        <DatePicker.Input
                            {...inputProps}
                            label="Oppgi dato for dokumenterbar kontakt med pasienten"
                            placeholder="DDMMÅÅ"
                        />
                    </DatePicker>
                    {selectedDay && <BodyShort>{formatsmregDate(selectedDay)}</BodyShort>}
                </>
            )}
        </div>
    )
}

export default TilbakedateringSectionGroup
