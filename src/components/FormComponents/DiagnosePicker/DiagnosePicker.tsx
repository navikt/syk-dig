import { ReactElement, useCallback } from 'react'
import { useController } from 'react-hook-form'
import { BodyLong, Button, Label, Select } from '@navikt/ds-react'
import cn from 'clsx'
import { XMarkIcon } from '@navikt/aksel-icons'

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'
import { DiagnoseSystem } from '../../Sykmelding/DiagnoseFormSection'

import styles from './DiagnosePicker.module.css'
import DiagnoseCombobox from './DiagnoseCombobox/DiagnoseCombobox'

export type PossiblePickerFormNames = 'diagnoser.hoveddiagnose' | `diagnoser.bidiagnoser.${number}`

interface Props {
    name: PossiblePickerFormNames
    diagnoseType: 'hoveddiagnose' | 'bidiagnose'
    onRemove?: () => void
}

function DiagnosePicker({ name, diagnoseType, onRemove }: Props): ReactElement {
    const { field, fieldState } = useController<SykmeldingFormValues, PossiblePickerFormNames>({
        name,
        rules: {
            validate: (value) => {
                if (value.code == null) return `Du må velge en diagnosekode for ${diagnoseType}.`
            },
        },
    })

    const resetValues = useCallback(
        (value: DiagnoseSystem) => {
            field.onChange({ system: value, code: null, text: null })
        },
        [field],
    )

    return (
        <div>
            <div className={styles.diagnosePicker}>
                <Select
                    label="Kodesystem"
                    value={field.value.system}
                    onChange={(event) => resetValues(event.target.value as DiagnoseSystem)}
                >
                    <option>ICD10</option>
                    <option>ICPC2</option>
                </Select>
                <DiagnoseCombobox
                    id={`${name}-combobox`}
                    name={name}
                    system={field.value.system}
                    onSelect={(suggestion) => field.onChange({ ...suggestion, system: field.value.system })}
                    onChange={() => {
                        if (field.value.code) {
                            resetValues(field.value.system)
                        }
                    }}
                    initialValue={field.value.code}
                />
                <DiagnoseDescription text={field.value.text} />
                {onRemove && (
                    <div className={styles.onRemoveButtonWrapper}>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onRemove}
                            size="xsmall"
                            icon={<XMarkIcon title="Fjern bidiagnose" />}
                        />
                    </div>
                )}
            </div>
            <FieldError error={fieldState.error} />
        </div>
    )
}

function DiagnoseDescription({ text }: { text: string | null | undefined }): ReactElement {
    return (
        <div className={cn('navds-form-field navds-form-field--medium')}>
            <Label>Beskrivelse</Label>
            <BodyLong className={styles.diagnoseDescriptionText}>{text ?? '-'}</BodyLong>
        </div>
    )
}

export default DiagnosePicker
