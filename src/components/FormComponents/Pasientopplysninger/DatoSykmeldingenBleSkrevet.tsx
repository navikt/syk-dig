import { useController } from 'react-hook-form'
import { Button, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'

import { toDate } from '../../../utils/dateUtils'
import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'

import styles from './DatoSykmeldingenBleSkrevet.module.css'

type DateName = 'behandletTidspunkt'

function DatoSykmeldingenBleSkrevet(): JSX.Element {
    const { field, fieldState } = useController<SykmeldingFormValues, DateName>({
        name: 'behandletTidspunkt',
        rules: {
            validate: (value) => {
                if (!value) {
                    return 'Du må fylle inn dato for når sykmeldingen ble skrevet.'
                }
            },
        },
    })

    const { datepickerProps, inputProps, setSelected } = UNSAFE_useDatepicker({
        defaultSelected: field.value ? toDate(field.value) : undefined,
        onDateChange: (date: Date | undefined) => {
            field.onChange(date)
        },
    })

    return (
        <div className={styles.datoSykmeldingenBleSkrevet}>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input
                    id={field.name}
                    {...inputProps}
                    label="Datoen sykmeldingen ble skrevet"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={fieldState.error?.message}
                />
            </UNSAFE_DatePicker>
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
    )
}

export default DatoSykmeldingenBleSkrevet
