import { useController } from 'react-hook-form'
import { DateValidationT, DatePicker, useDatepicker } from '@navikt/ds-react'
import { ReactElement, useState } from 'react'

import { toDate } from '../../../utils/dateUtils'
import { UtenlanskFormValues } from '../../Sykmelding/SykmeldingForm'

import styles from './DatoSykmeldingenBleSkrevet.module.css'

function DatoSykmeldingenBleSkrevet(): ReactElement {
    const [validationError, setValidationError] = useState<DateValidationT | null>(null)
    const { field, fieldState } = useController<UtenlanskFormValues, 'behandletTidspunkt'>({
        name: 'behandletTidspunkt',
        rules: {
            validate: (value) => {
                if (validationError?.isAfter) {
                    return 'Datoen sykmeldingen ble skrevet kan ikke være i fremtiden'
                }

                if (!value) {
                    return 'Du må fylle inn dato for når sykmeldingen ble skrevet'
                }
            },
        },
    })

    const { datepickerProps, inputProps } = useDatepicker({
        toDate: new Date(),
        today: new Date(),
        defaultSelected: field.value ? toDate(field.value) : undefined,
        onDateChange: (date: Date | undefined) => {
            field.onChange(date ?? null)
        },
        onValidate: (validation) => {
            setValidationError(validation)
        },
    })

    return (
        <div className={styles.datoSykmeldingenBleSkrevet}>
            <DatePicker {...datepickerProps} wrapperClassName={styles.datePicker}>
                <DatePicker.Input
                    id={field.name}
                    {...inputProps}
                    label="Datoen sykmeldingen ble skrevet"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={fieldState.error?.message}
                />
            </DatePicker>
        </div>
    )
}

export default DatoSykmeldingenBleSkrevet
