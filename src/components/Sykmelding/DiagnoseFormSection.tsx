import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@navikt/ds-react';
import { Bandage } from '@navikt/ds-icons';

import DiagnosePicker from '../FormComponents/DiagnosePicker/DiagnosePicker';
import SykmeldingSection from '../SykmeldingSection/SykmeldingSection';

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
        <SykmeldingSection id="diagnose-seksjon" title="Diagnose" Icon={Bandage}>
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
                <div className={styles.buttonSection}>
                    <Button
                        variant="secondary"
                        onClick={() => append({ system: 'ICD10', code: null, text: null }, { shouldFocus: true })}
                        type="button"
                    >
                        Legg til bidiagnose
                    </Button>
                </div>
            </div>
        </SykmeldingSection>
    );
}

export default DiagnoseFormSection;
