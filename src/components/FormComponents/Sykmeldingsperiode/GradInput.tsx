import { TextField } from '@navikt/ds-react';
import { useController } from 'react-hook-form';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import FieldError from '../FieldError/FieldError';

import styles from './GradInput.module.css';

type FormName = `periode.${number}.grad`;

export interface Props {
    name: FormName;
}

function GradInput({ name }: Props): JSX.Element {
    const { field, fieldState } = useController<SykmeldingFormValues, FormName>({
        name,
        rules: {
            min: { value: 20, message: 'Grad kan ikke være lavere enn 20 prosent.' },
            max: { value: 100, message: 'Grad kan ikke være høyere enn 100 prosent.' },
            required: 'Du må fylle inn grad.',
        },
    });

    return (
        <div className={styles.grad}>
            <TextField id={name} label="Oppgi grad" type="number" {...field} value={field.value ?? 0} />
            <FieldError error={fieldState.error} />
        </div>
    );
}

export default GradInput;
