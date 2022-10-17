import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { Button, DateInputProps, UNSAFE_DatePicker, UNSAFE_useRangeDatepicker } from '@navikt/ds-react';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import FieldError from '../FieldError/FieldError';

import styles from './PeriodePicker.module.css';

type FomName = `periode.${number}.fom`;
type TomName = `periode.${number}.tom`;

interface DatepickerInputProps {
    name: FomName | TomName;
    label: 'Fra' | 'Til';
    datepickerInputProps: Pick<DateInputProps, 'value' | 'onChange' | 'onBlur' | 'onFocus'>;
    error: string;
}

interface PeriodePickerProps {
    index: number;
}

function DatepickerInput({ name, label, datepickerInputProps, error }: DatepickerInputProps): JSX.Element {
    const { field, fieldState } = useController<SykmeldingFormValues, FomName | TomName>({
        name,
        rules: {
            validate: (value) => {
                if (!value) {
                    return error;
                }
            },
        },
    });

    useEffect(() => {
        if (datepickerInputProps.value && datepickerInputProps.value.toString() !== field.value?.toString()) {
            field.onChange(datepickerInputProps.value);
        } else if (!datepickerInputProps.value && field.value) {
            field.onChange(null);
        }
    }, [datepickerInputProps.value, field]);

    return (
        <div>
            <UNSAFE_DatePicker.Input
                id={field.name}
                {...datepickerInputProps}
                label={label}
                placeholder="DD.MM.ÅÅÅÅ"
                onFocus={(event) => {
                    event.preventDefault();
                }}
            />
            <FieldError error={fieldState.error} />
        </div>
    );
}

function PeriodePicker({ index }: PeriodePickerProps): JSX.Element {
    const { datepickerProps, toInputProps, fromInputProps, reset } = UNSAFE_useRangeDatepicker({
        today: new Date(),
        defaultSelected: {
            from: undefined,
            to: undefined,
        },
    });

    const fomName: FomName = `periode.${index}.fom`;
    const tomName: TomName = `periode.${index}.tom`;

    return (
        <>
            <div className={styles.periodePicker}>
                <UNSAFE_DatePicker {...datepickerProps}>
                    <DatepickerInput
                        name={fomName}
                        label="Fra"
                        datepickerInputProps={fromInputProps}
                        error="Du må fylle inn fra dato."
                    />
                    <DatepickerInput
                        name={tomName}
                        label="Til"
                        datepickerInputProps={toInputProps}
                        error="Du må fylle inn til dato."
                    />
                </UNSAFE_DatePicker>
                <Button
                    className={styles.nullstillButton}
                    variant="tertiary"
                    type="button"
                    onClick={() => {
                        reset();
                    }}
                >
                    Nullstill dato
                </Button>
            </div>
        </>
    );
}

export default PeriodePicker;
