import { useController, useFormContext } from 'react-hook-form'
import { DatePicker, useRangeDatepicker } from '@navikt/ds-react'
import { differenceInDays, isAfter, isBefore, isSameDay } from 'date-fns'
import { ReactElement } from 'react'

import { toDate } from '../../../utils/dateUtils'
import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'

import styles from './PeriodePicker.module.css'

type DateRange = {
    from: Date | undefined
    to?: Date | undefined
}

type FormName = `periode.${number}.range`
type FormField = `${FormName}.${'fom' | 'tom'}`

interface PeriodePickerProps {
    index: number
    name: FormName
}

function PeriodePicker({ index, name }: PeriodePickerProps): ReactElement {
    const { watch } = useFormContext<SykmeldingFormValues>()
    const previousTom: Date | null = watch(`periode.${index - 1}.range.tom`) ?? null
    const behandletTidspunkt = watch('behandletTidspunkt')

    const { field: fromField, fieldState: fromFieldState } = useController<SykmeldingFormValues, FormField>({
        name: `${name}.fom`,
        rules: {
            validate: (value) => {
                if (!value) {
                    return 'Du må fylle inn fra dato.'
                }
                if (previousTom && (isBefore(value, previousTom) || isSameDay(value, previousTom))) {
                    return 'Fra kan ikke være tidligere eller samme dag som forrige periode.'
                }
                if (
                    index === 0 &&
                    behandletTidspunkt &&
                    isAfter(value, toDate(behandletTidspunkt)) &&
                    differenceInDays(value, toDate(behandletTidspunkt)) > 30
                ) {
                    return 'Fra kan ikke være mer enn 30 dager etter datoen sykmeldingen ble skrevet.'
                }
                return undefined
            },
        },
    })
    const { field: toField, fieldState: toFieldState } = useController<SykmeldingFormValues, FormField>({
        name: `${name}.tom`,
        rules: {
            validate: (value) => {
                if (!value) {
                    return 'Du må fylle inn til dato.'
                }
                return undefined
            },
        },
    })

    const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
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
            <DatePicker {...datepickerProps} wrapperClassName={styles.dateRangePicker}>
                <DatePicker.Input
                    id={fromField.name}
                    {...fromInputProps}
                    label="Fra"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={fromFieldState.error?.message}
                />

                <DatePicker.Input
                    id={toField.name}
                    {...toInputProps}
                    label="Til"
                    placeholder="DD.MM.ÅÅÅÅ"
                    error={toFieldState.error?.message}
                />
            </DatePicker>
        </div>
    )
}

export default PeriodePicker
