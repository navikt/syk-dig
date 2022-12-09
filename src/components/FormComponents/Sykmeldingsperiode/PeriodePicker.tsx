import { useController } from 'react-hook-form'
import { UNSAFE_DatePicker, UNSAFE_useRangeDatepicker } from '@navikt/ds-react'

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'

import styles from './PeriodePicker.module.css'

type DateRange = {
    from: Date | undefined
    to?: Date | undefined
}

type FormName = `periode.${number}.range`
type FormField = `${FormName}.${'fom' | 'tom'}`

interface PeriodePickerProps {
    name: FormName
}

function PeriodePicker({ name }: PeriodePickerProps): JSX.Element {
    const { field: fromField, fieldState: fromFieldState } = useController<SykmeldingFormValues, FormField>({
        name: `${name}.fom`,
        rules: { required: 'Du må fylle inn fra dato.' },
    })
    const { field: toField, fieldState: toFieldState } = useController<SykmeldingFormValues, FormField>({
        name: `${name}.tom`,
        rules: { required: 'Du må fylle inn til dato.' },
    })

    const { datepickerProps, toInputProps, fromInputProps } = UNSAFE_useRangeDatepicker({
        defaultSelected: {
            from: fromField.value,
            to: toField.value,
        },
        onRangeChange: (value: DateRange | undefined) => {
            fromField.onChange(value?.from)
            toField.onChange(value?.to)
        },
    })

    return (
        <div className={styles.periodePicker}>
            <UNSAFE_DatePicker {...datepickerProps} wrapperClassName={styles.dateRangePicker}>
                <UNSAFE_DatePicker.Input
                    id={fromField.name}
                    {...fromInputProps}
                    label="Fra"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={fromFieldState.error?.message}
                />

                <UNSAFE_DatePicker.Input
                    id={toField.name}
                    {...toInputProps}
                    label="Til"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={toFieldState.error?.message}
                />
            </UNSAFE_DatePicker>
        </div>
    )
}

export default PeriodePicker
