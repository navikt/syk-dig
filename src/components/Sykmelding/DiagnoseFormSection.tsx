import React from 'react';
import { useFormContext } from 'react-hook-form';

import DiagnosePicker from '../FormComponents/DiagnosePicker/DiagnosePicker';

import { SykmeldingFormValues } from './SykmeldingForm';
import styles from './DiagnoseFormSection.module.css';

export type DiagnoseSystem = 'ICD10' | 'ICPC2';
export type DiagnoseFormValue = { system: DiagnoseSystem; code: string; text: string };
export type DiagnoseFormSectionValues = {
    hoveddiagnose: DiagnoseFormValue;
};

function DiagnoseFormSection(): JSX.Element {
    const { control } = useFormContext<SykmeldingFormValues>();

    return (
        <div>
            <div className={styles.hovedDiagnoseSection}>
                <DiagnosePicker name="diagnoser.hoveddiagnose" diagnoseType="hoveddiagnose" control={control} />
            </div>
        </div>
    );
}

export default DiagnoseFormSection;
