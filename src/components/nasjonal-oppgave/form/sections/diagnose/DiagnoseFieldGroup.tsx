import React, { ReactElement } from 'react'
import { Button, Heading } from '@navikt/ds-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import DiagnosePicker from '../../../../FormComponents/DiagnosePicker/DiagnosePicker'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'

function DiagnoseFieldGroup(): ReactElement {
    const { control } = useFormContext<NasjonalFormValues>()
    const { append, remove, fields } = useFieldArray({
        name: 'medisinskVurdering.bidiagnoser',
        control,
    })

    return (
        <div className="flex flex-col gap-8">
            <section aria-labelledby="hoveddiagnose-heading">
                <Heading size="xsmall" level="3" spacing id="hoveddiagnose-heading">
                    3.1 Hoveddiagnose
                </Heading>
                <DiagnosePicker name="medisinskVurdering.hoveddiagnose" diagnoseType="hoveddiagnose" specificLabels />
            </section>
            <section aria-labelledby="bidiagnose-heading">
                <Heading size="xsmall" level="3" spacing id="bidiagnose-heading">
                    3.2 Bidiagnose
                </Heading>
                <div className="flex flex-col gap-8 divide-y-2 divide-border-divider [&>div]:pt-8 [&>div:first-child]:p-0">
                    {fields.map((field, index) => (
                        <DiagnosePicker
                            key={field.id}
                            name={`medisinskVurdering.bidiagnoser.${index}`}
                            diagnoseType="bidiagnose"
                            onRemove={() => remove(index)}
                            specificLabels
                        />
                    ))}
                </div>
            </section>
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
    )
}

export default DiagnoseFieldGroup
