import { Button, ErrorMessage, TextField } from '@navikt/ds-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { SykmeldingFormValues } from './SykmeldingForm';

export interface Periode {
    periode: string;
    grad: string;
}

function Sykmeldingsperiode(): JSX.Element {
    const {
        register,
        formState: { errors },
        clearErrors,
    } = useFormContext<SykmeldingFormValues>();

    const { fields, append, remove } = useFieldArray({
        name: 'periode',
    });

    return (
        <>
            {fields.map((field, index) => (
                <div id="periode" key={field.id}>
                    <TextField
                        id={`periode${index}`}
                        label="Periode"
                        {...register(`periode.${index}.periode`, { required: 'Du må fylle inn periode.' })}
                    />
                    {errors.periode?.[index]?.periode && (
                        <ErrorMessage>{errors.periode?.[index]?.periode?.message}</ErrorMessage>
                    )}
                    <TextField
                        id={`grad${index}`}
                        label="Oppgi grad"
                        {...register(`periode.${index}.grad`, { required: 'Du må fylle inn grad.' })}
                    />
                    {errors.periode?.[index]?.grad && (
                        <ErrorMessage>{errors.periode?.[index]?.grad?.message}</ErrorMessage>
                    )}
                    {index > 0 && (
                        <Button variant="tertiary" type="button" onClick={() => remove(index)}>
                            Nullstill periode
                        </Button>
                    )}
                </div>
            ))}
            <Button
                variant="secondary"
                type="button"
                onClick={() => {
                    clearErrors(), append({ grad: '' });
                }}
            >
                Legg til periode
            </Button>
        </>
    );
}

export default Sykmeldingsperiode;
