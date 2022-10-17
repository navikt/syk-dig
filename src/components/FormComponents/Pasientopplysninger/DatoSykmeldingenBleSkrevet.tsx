import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';

import { toDate } from '../../../utils/dateUtils';
import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import FieldError from '../FieldError/FieldError';

import styles from './DatoSykmeldingenBleSkrevet.module.css';

type DateName = 'behandletTidspunkt';

function DatoSykmeldingenBleSkrevet(): JSX.Element {
    const { field, fieldState } = useController<SykmeldingFormValues, DateName>({
        name: 'behandletTidspunkt',
        rules: {
            validate: (value) => {
                if (!value) {
                    return 'Du må fylle inn dato for når sykmeldingen ble skrevet.';
                }
            },
        },
    });

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        today: new Date(),
        defaultSelected: field.value ? toDate(field.value) : undefined,
    });

    useEffect(() => {
        if (selectedDay && selectedDay.toString() !== field.value?.toString()) {
            field.onChange(selectedDay);
        } else if (!selectedDay && field.value) {
            field.onChange(null);
        }
    }, [selectedDay, field]);

    return (
        <div className={styles.datoSykmeldingenBleSkrevet}>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input
                    id={field.name}
                    {...inputProps}
                    label="Datoen sykmeldingen ble skrevet"
                    placeholder="DD.MM.ÅÅÅÅ"
                    onFocus={(event) => {
                        event.preventDefault();
                    }}
                />
            </UNSAFE_DatePicker>
            <FieldError error={fieldState.error} />
        </div>
    );
}

export default DatoSykmeldingenBleSkrevet;
