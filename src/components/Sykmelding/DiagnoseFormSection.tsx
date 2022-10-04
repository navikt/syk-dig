import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@navikt/ds-react';

import DiagnosePicker from '../FormComponents/DiagnosePicker/DiagnosePicker';

import { SykmeldingFormValues } from './SykmeldingForm';
import styles from './DiagnoseFormSection.module.css';

export type DiagnoseSystem = 'ICD10' | 'ICPC2';
export type DiagnoseFormValue = { system: DiagnoseSystem; code: string | null; text: string | null };
export type DiagnoseFormSectionValues = {
    hoveddiagnose: DiagnoseFormValue;
    bidiagnoser: DiagnoseFormValue[];
};

function DiagnoseFormSection(): JSX.Element {
    const { control } = useFormContext<SykmeldingFormValues>();
    const { append, remove, fields } = useFieldArray({
        name: 'diagnoser.bidiagnoser',
        control,
    });

    return (
        <div className={styles.diagnoseFormSection}>
            <DiagnosePicker name="diagnoser.hoveddiagnose" diagnoseType="hoveddiagnose" />
            {fields.map((field, index) => (
                <DiagnosePicker
                    key={field.id}
                    name={`diagnoser.bidiagnoser.${index}`}
                    diagnoseType="bidiagnose"
                    onRemove={() => remove(index)}
                />
            ))}
            <div>
                <Button
                    variant="secondary"
                    onClick={() => append({ system: 'ICD10', code: null, text: null }, { shouldFocus: true })}
                    type="button"
                >
                    Legg til bidiagnose
                </Button>
            </div>
        </div>
    );
}

export default DiagnoseFormSection;
