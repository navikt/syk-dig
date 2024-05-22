import React, { ReactElement, useState } from 'react'
import { DatePicker, RangeValidationT, useRangeDatepicker } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { SMREG_SHORTHAND_FORMAT } from '../../../smregDateUtils'
import { toDate } from '../../../../../utils/dateUtils'
import { SelectedRange } from '../../../../FormComponents/dates/SelectedDate'

import styles from './FomTomPicker.module.css'

type Props = {
    parent: `mulighetForArbeid.${number}`
}

function FomTomPicker({ parent }: Props): ReactElement {
    const [rangeError, setRangeError] = useState<RangeValidationT | null>(null)
    const { field: fomField, fieldState: fomState } = useController<NasjonalFormValues, `${typeof parent}.fom`>({
        name: `${parent}.fom`,
        rules: {
            validate: (value) => {
                const dateError = getDateErrorMessage('f.o.m.', rangeError?.from)
                if (dateError) return dateError
                if (value == null) return 'Du må fylle inn f.o.m. dato'
            },
        },
    })
    const { field: tomField, fieldState: tomState } = useController<NasjonalFormValues, `${typeof parent}.tom`>({
        name: `${parent}.tom`,
        rules: {
            validate: (value) => {
                const dateError = getDateErrorMessage('t.o.m.', rangeError?.to)
                if (dateError) return dateError
                if (value == null) return 'Du må fylle inn t.o.m. dato'
            },
        },
    })

    const { datepickerProps, toInputProps, fromInputProps, selectedRange } = useRangeDatepicker({
        defaultSelected: {
            from: fomField.value ? toDate(fomField.value) : undefined,
            to: tomField.value ? toDate(tomField.value) : undefined,
        },
        onRangeChange: (range) => {
            // There are some strange timing issues when form has validated, and value changes from invalid → valid
            // Deferring the change to the next frame seems to fix it
            requestAnimationFrame(() => {
                range?.from && fomField.onChange(range.from)
                range?.to && tomField.onChange(range.to)
            })
        },
        onValidate: (range) => {
            setRangeError(range)

            !range.from.isValidDate && fomField.onChange(null)
            !range.to.isValidDate && tomField.onChange(null)
        },
        inputFormat: SMREG_SHORTHAND_FORMAT,
    })

    return (
        <div className="max-w-96">
            <div className={styles.periodePicker}>
                <DatePicker {...datepickerProps} wrapperClassName={styles.dateRangePicker}>
                    <DatePicker.Input
                        className={styles.dateRangeInput}
                        {...fromInputProps}
                        label="F.o.m"
                        placeholder="DDMMÅÅ"
                        error={fomState.error?.message}
                        id={`${parent}.fom`}
                    />
                    <DatePicker.Input
                        className={styles.dateRangeInput}
                        {...toInputProps}
                        label="T.o.m"
                        placeholder="DDMMÅÅ"
                        error={tomState.error?.message}
                        id={`${parent}.tom`}
                    />
                </DatePicker>
            </div>
            <SelectedRange range={selectedRange} />
        </div>
    )
}

function getDateErrorMessage(name: 'f.o.m.', validation: RangeValidationT['from'] | null | undefined): string | null
function getDateErrorMessage(name: 't.o.m.', validation: RangeValidationT['to'] | null | undefined): string | null
function getDateErrorMessage(
    name: 'f.o.m.' | 't.o.m.',
    validation: RangeValidationT['from'] | RangeValidationT['to'] | null | undefined,
): string | null {
    if (validation == null) return null

    if ('isBeforeFrom' in validation && validation.isBeforeFrom) {
        return `${name} dato kan ikke være før f.o.m. dato`
    }

    if (validation.isEmpty) {
        return `Du må fylle inn ${name} dato`
    }

    if (validation.isInvalid) {
        return `Dato er ugyldig`
    }

    return null
}

export default FomTomPicker
