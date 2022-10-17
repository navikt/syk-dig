import { TextField } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import FieldError from '../FieldError/FieldError';

import styles from './Fodselsnummer.module.css';

function Fodselsnummer(): JSX.Element {
    const {
        register,
        formState: { errors },
    } = useFormContext<SykmeldingFormValues>();

    return (
        <div className={styles.fodselsnummer}>
            <TextField
                id="fnr"
                label="Fødselsnummer (11 siffer)"
                {...register('fnr', { required: 'Du må fylle inn fødselsnummer.' })}
            />
            <FieldError error={errors.fnr} />
        </div>
    );
}

export default Fodselsnummer;
