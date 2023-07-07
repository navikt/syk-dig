import { TextField } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { ReactElement } from 'react'

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'

import styles from './GradInput.module.css'

type FormName = `periode.${number}.grad`

export interface Props {
    name: FormName
}

function GradInput({ name }: Props): ReactElement {
    const {
        register,
        formState: { errors },
    } = useFormContext<SykmeldingFormValues>()

    return (
        <div className={styles.grad}>
            <TextField
                id={name}
                label="Oppgi grad"
                type="number"
                {...register(name, {
                    valueAsNumber: true,
                    min: { value: 20, message: 'Grad kan ikke være lavere enn 20 prosent.' },
                    max: { value: 100, message: 'Grad kan ikke være høyere enn 100 prosent.' },
                    required: 'Du må fylle inn grad.',
                })}
            />
            <ErrorMessage name={name} errors={errors} render={(data) => <FieldError error={data.message} />} />
        </div>
    )
}

export default GradInput
