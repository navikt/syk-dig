import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { BodyLong, ErrorMessage, Label, Select } from '@navikt/ds-react';
import cn from 'clsx';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';

import DiagnoseTypeahead from './DiagnoseTypeahead/DiagnoseTypeahead';
import styles from './DiagnosePicker.module.css';

interface Props {
    control: Control<SykmeldingFormValues>;
    name: 'diagnoser.hoveddiagnose';
    diagnoseType: string;
}

function DiagnosePicker({ name, control, diagnoseType }: Props): JSX.Element {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                validate: (value) => {
                    if (value.code == null || value.text == null) return `Du må velge en ${diagnoseType}`;
                },
            }}
            render={({ field, fieldState }) => (
                <div>
                    <div className={styles.diagnosePicker}>
                        <Select
                            label="Kodesystem"
                            onChange={(event) => {
                                field.onChange({ system: event.target.value, code: null, text: null });
                            }}
                        >
                            <option>ICD10</option>
                            <option>ICPC2</option>
                        </Select>
                        <DiagnoseTypeahead
                            id={diagnoseType}
                            system={field.value.system}
                            onSelect={(suggestion) => field.onChange({ ...suggestion, system: field.value.system })}
                        />
                        <DiagnoseDescription text={field.value.text} />
                    </div>
                    {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
                </div>
            )}
        />
    );
}

function DiagnoseDescription({ text }: { text: string | undefined }): JSX.Element {
    return (
        <div className={cn('navds-form-field navds-form-field--medium')}>
            <Label>Beskrivelse</Label>
            <BodyLong className={styles.diagnoseDescriptionText}>{text}</BodyLong>
        </div>
    );
}

export default DiagnosePicker;
