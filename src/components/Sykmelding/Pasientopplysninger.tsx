import { ErrorMessage, TextField } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

import CountryPicker from '../FormComponents/CountryPicker/CountryPicker';

import { SykmeldingFormValues } from './SykmeldingForm';

function Pasientopplysninger(): JSX.Element {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<SykmeldingFormValues>();

    return (
        <>
            <TextField
                id="fnr"
                label="Fødselsnummer (11 siffer)"
                {...register('fnr', { required: 'Du må fylle inn fødselsnummer.' })}
            />
            {errors?.fnr && <ErrorMessage>{errors.fnr.message}</ErrorMessage>}
            <CountryPicker control={control} name="land" />
        </>
    );
}

export default Pasientopplysninger;
