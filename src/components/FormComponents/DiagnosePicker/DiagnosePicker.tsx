import React, { useCallback } from 'react';
import { useController } from 'react-hook-form';
import { BodyLong, Button, ErrorMessage, Label, Select } from '@navikt/ds-react';
import cn from 'clsx';
import { Delete } from '@navikt/ds-icons';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';

import DiagnoseTypeahead from './DiagnoseTypeahead/DiagnoseTypeahead';
import styles from './DiagnosePicker.module.css';

type PossiblePickerFormNames = 'diagnoser.hoveddiagnose' | `diagnoser.bidiagnoser.${number}`;

interface Props {
    name: PossiblePickerFormNames;
    diagnoseType: 'hoveddiagnose' | 'bidiagnose';
    onRemove?: () => void;
}

function DiagnosePicker({ name, diagnoseType, onRemove }: Props): JSX.Element {
    const { field, fieldState } = useController<SykmeldingFormValues, PossiblePickerFormNames>({
        name,
        rules: {
            validate: (value) => {
                if (value.code == null || value.text == null) return `Du må velge en diagnosekode for ${diagnoseType}`;
            },
        },
    });

    const resetValues = useCallback(
        (value: string) => {
            field.onChange({ system: value, code: null, text: null });
        },
        [field],
    );

    return (
        <div>
            <div className={styles.diagnosePicker}>
                <Select
                    label="Kodesystem"
                    value={field.value.system}
                    onChange={(event) => resetValues(event.target.value)}
                >
                    <option>ICD10</option>
                    <option>ICPC2</option>
                </Select>
                <DiagnoseTypeahead
                    id={diagnoseType}
                    system={field.value.system}
                    onSelect={(suggestion) => field.onChange({ ...suggestion, system: field.value.system })}
                    onChange={() => {
                        if (field.value.code) {
                            resetValues(field.value.system);
                        }
                    }}
                    initialValue={field.value.code}
                />
                <DiagnoseDescription text={field.value.text} />
                {onRemove && (
                    <div className={styles.onRemoveButtonWrapper}>
                        <Button variant="tertiary" icon={<Delete />} type="button" onClick={onRemove} />
                    </div>
                )}
            </div>
            {fieldState.error && <ErrorMessage>{fieldState.error.message}</ErrorMessage>}
        </div>
    );
}

function DiagnoseDescription({ text }: { text: string | null | undefined }): JSX.Element {
    return (
        <div className={cn('navds-form-field navds-form-field--medium')}>
            <Label>Beskrivelse</Label>
            <BodyLong className={styles.diagnoseDescriptionText}>{text ?? '-'}</BodyLong>
        </div>
    );
}

export default DiagnosePicker;