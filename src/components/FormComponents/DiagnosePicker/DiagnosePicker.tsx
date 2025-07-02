import { ReactElement, useCallback } from 'react'
import { useController } from 'react-hook-form'
import { BodyShort, Button, Heading, Select } from '@navikt/ds-react'
import cn from 'clsx'
import { XMarkIcon } from '@navikt/aksel-icons'

import { UtenlanskFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'
import { NasjonalFormValues } from '../../nasjonal-oppgave/form/NasjonalSykmeldingFormTypes'

import { DiagnoseSystem } from './diagnose-combobox/types'
import DiagnoseCombobox from './diagnose-combobox/DiagnoseCombobox'
import styles from './DiagnosePicker.module.css'

export type PossiblePickerFormNames =
    | 'diagnoser.hoveddiagnose'
    | `diagnoser.bidiagnoser.${number}`
    | 'medisinskVurdering.hoveddiagnose'
    | `medisinskVurdering.bidiagnoser.${number}`

interface Props {
    name: PossiblePickerFormNames
    diagnoseType: 'hoveddiagnose' | 'bidiagnose'
    onRemove?: () => void
    specificLabels?: boolean
}

function DiagnosePicker({ name, diagnoseType, onRemove, specificLabels }: Props): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues | UtenlanskFormValues, PossiblePickerFormNames>({
        name,
        rules: {
            validate: (value) => {
                if (value.code == null || value.code === '') return `Du må velge en diagnosekode for ${diagnoseType}`
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
                    className={styles.field}
                    label={
                        !specificLabels
                            ? 'Kodesystem'
                            : diagnoseType === 'hoveddiagnose'
                              ? '3.1.1 Kodesystem'
                              : '3.2.1 Kodesystem'
                    }
                    value={field.value.system}
                    onChange={(event) => resetValues(event.target.value as DiagnoseSystem)}
                >
                    <option>ICD10</option>
                    <option>ICPC2</option>
                </Select>
                <DiagnoseCombobox
                    key={field.value.system}
                    className={styles.field}
                    id={`${name}-combobox`}
                    name={name}
                    label={
                        !specificLabels
                            ? 'Diagnosekode'
                            : diagnoseType === 'hoveddiagnose'
                              ? '3.1.2 Kode'
                              : '3.2.2 Kode'
                    }
                    system={field.value.system}
                    value={field.value.code}
                    onSelect={(suggestion) => field.onChange({ ...suggestion, system: field.value.system })}
                    onChange={() => {
                        if (field.value.code) {
                            resetValues(field.value.system)
                        }
                    }}
                />
                <DiagnoseDescription
                    className={styles.field}
                    text={field.value.text}
                    label={
                        !specificLabels
                            ? 'Beskrivelse'
                            : diagnoseType === 'hoveddiagnose'
                              ? '3.1.3 Tekst'
                              : '3.2.3 Tekst'
                    }
                />
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

function DiagnoseDescription({
    className,
    label,
    text,
}: {
    className?: string
    label: string
    text: string | null | undefined
}): ReactElement {
    return (
        <div className={cn(className, 'navds-form-field navds-form-field--medium')}>
            <Heading level="3" size="xsmall">
                {label}
            </Heading>
            <BodyShort className={cn('h-12 flex items-start')}>{text ?? '-'}</BodyShort>
        </div>
    )
}

export default DiagnosePicker
