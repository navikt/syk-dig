import { useController } from 'react-hook-form'
import { Button, DateValidationT, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import { useState } from 'react'

import { toDate } from '../../../utils/dateUtils'
import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'

import styles from './DatoSykmeldingenBleSkrevet.module.css'

type DateName = 'behandletTidspunkt'

function DatoSykmeldingenBleSkrevet(): JSX.Element {
    const [validationError, setValidationError] = useState<DateValidationT | null>(null)
    const { field, fieldState } = useController<SykmeldingFormValues, DateName>({
        name: 'behandletTidspunkt',
        rules: {
            validate: (value) => {
                if (validationError?.isAfter) {
                    return 'Datoen sykmeldingen ble skrevet kan ikke være i fremtiden.'
                }

                if (!value) {
                    return 'Du må fylle inn dato for når sykmeldingen ble skrevet.'
                }
            },
        },
    })

    const { datepickerProps, inputProps, setSelected } = UNSAFE_useDatepicker({
        toDate: new Date(),
        today: new Date(),
        defaultSelected: field.value ? toDate(field.value) : undefined,
        onDateChange: (date: Date | undefined) => {
            field.onChange(date)
        },
        onValidate: (validation) => {
            setValidationError(validation)
        },
    })

    return (
        <div className={styles.datoSykmeldingenBleSkrevet}>
            <UNSAFE_DatePicker {...datepickerProps} wrapperClassName={styles.datePicker}>
                <UNSAFE_DatePicker.Input
                    id={field.name}
                    {...inputProps}
                    label="Datoen sykmeldingen ble skrevet"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={fieldState.error?.message}
                />
            </UNSAFE_DatePicker>
            <div>
                <Button
                    className={styles.nullstillButton}
                    variant="tertiary"
                    type="button"
                    onClick={() => {
                        setSelected(undefined)
                    }}
                >
                    Nullstill dato
                </Button>
            </div>
        </div>
    )
}

export default DatoSykmeldingenBleSkrevet
