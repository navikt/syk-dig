import { useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import { Button, UNSAFE_DatePicker, UNSAFE_useRangeDatepicker } from '@navikt/ds-react';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';

import styles from './PeriodePicker.module.css';

type FormName = `periode.${number}.range`;
type FormField = `${FormName}.${'fom' | 'tom'}`;

interface PeriodePickerProps {
    name: FormName;
}

function PeriodePicker({ name }: PeriodePickerProps): JSX.Element {
    const { field: fromField, fieldState: fromFieldState } = useController<SykmeldingFormValues, FormField>({
        name: `${name}.fom`,
        rules: { required: 'Du må fylle inn fra dato.' },
    });
    const { field: toField, fieldState: toFieldState } = useController<SykmeldingFormValues, FormField>({
        name: `${name}.tom`,
        rules: { required: 'Du må fylle inn til dato.' },
    });

    const { datepickerProps, toInputProps, fromInputProps, selectedRange, setSelected } = UNSAFE_useRangeDatepicker({
        today: new Date(),
        defaultSelected: {
            from: fromField.value,
            to: toField.value,
        },
    });

    const onChangeFrom = fromField.onChange;
    const onChangeTo = toField.onChange;
    const hasMounted = useRef(false);
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        onChangeFrom(selectedRange?.from);
        onChangeTo(selectedRange?.to);
    }, [selectedRange, onChangeFrom, onChangeTo]);

    return (
        <>
            <div className={styles.periodePicker}>
                <UNSAFE_DatePicker {...datepickerProps}>
                    <UNSAFE_DatePicker.Input
                        ref={fromField.ref}
                        id={fromField.name}
                        {...fromInputProps}
                        label="Fra"
                        placeholder="DD.MM.ÅÅÅÅ"
                        onFocus={(event) => {
                            event.preventDefault();
                        }}
                        error={fromFieldState.error?.message}
                    />

                    <UNSAFE_DatePicker.Input
                        id={toField.name}
                        {...toInputProps}
                        label="Til"
                        placeholder="DD.MM.ÅÅÅÅ"
                        onFocus={(event) => {
                            event.preventDefault();
                        }}
                        error={toFieldState.error?.message}
                    />
                </UNSAFE_DatePicker>
                <Button
                    className={styles.nullstillButton}
                    variant="tertiary"
                    type="button"
                    onClick={() => {
                        setSelected({ from: undefined, to: undefined });
                    }}
                >
                    Nullstill dato
                </Button>
            </div>
        </>
    );
}

export default PeriodePicker;
