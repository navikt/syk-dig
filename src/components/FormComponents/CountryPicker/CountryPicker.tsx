import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ErrorMessage } from '@navikt/ds-react';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';

import CountryTypeahead from './DiagnoseTypeahead/CountryTypeahead';

interface Props {
    control: Control<SykmeldingFormValues>;
    name: 'land';
}

function CountryPicker({ control, name }: Props): JSX.Element {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: 'Du må velge et land' }}
            render={({ field, fieldState }) => (
                <div>
                    <CountryTypeahead onSelect={field.onChange} />
                    {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
                </div>
            )}
        />
    );
}
export default CountryPicker;
