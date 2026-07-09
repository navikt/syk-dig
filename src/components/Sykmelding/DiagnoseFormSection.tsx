import { Button } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import FormSection from '../form-layout/FormSection'
import { DiagnoseSystem } from '../FormComponents/DiagnosePicker/diagnose-combobox/types'
import DiagnosePicker from '../FormComponents/DiagnosePicker/DiagnosePicker'

import styles from './DiagnoseFormSection.module.css'
import { UtenlanskFormValues } from './SykmeldingForm'

export type DiagnoseFormValue = { system: DiagnoseSystem; code: string | null; text: string | null }

export type DiagnoseFormSectionValues = {
    hoveddiagnose: DiagnoseFormValue
    bidiagnoser: DiagnoseFormValue[]
}

function DiagnoseFormSection(): ReactElement {
    const { control } = useFormContext<UtenlanskFormValues>()
    const { append, remove, fields } = useFieldArray({
        name: 'diagnoser.bidiagnoser',
        control,
    })

    return (
        <FormSection id="diagnose-seksjon" title="Diagnose">
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
                        size="small"
                    >
                        Legg til bidiagnose
                    </Button>
                </div>
            </div>
        </FormSection>
    )
}

export default DiagnoseFormSection
