import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Checkbox, CheckboxGroup, TextField } from '@navikt/ds-react'

import { AnnenFraverGrunnSchema, AnnenFraverGrunnValues } from '../../../schema/sykmelding/MedisinskVurdering'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'

function AnnenLovfestetFravaersgrunnField(): ReactElement {
    const { register } = useFormContext<NasjonalFormValues>()
    const { field: rootField } = useController<NasjonalFormValues, 'medisinskVurdering.annenFraversArsak'>({
        name: 'medisinskVurdering.annenFraversArsak',
    })
    const { field: reasonEnumField, fieldState: reasonEnumState } = useController<
        NasjonalFormValues,
        'medisinskVurdering.annenFraversArsakGrunn'
    >({
        name: 'medisinskVurdering.annenFraversArsakGrunn',
        rules: {
            required: {
                value: rootField.value,
                message: 'Lovfestet fraværsgrunn må være valgt når annen lovfestet fraværsgrunn er avkrysset',
            },
        },
    })

    return (
        <div className="flex flex-col gap-4">
            <SoloCheckbox {...rootField} legend="3.3">
                Annen lovfestet fraværsgrunn § 8-4, 3. ledd oppgis hvis relevant
            </SoloCheckbox>
            {rootField.value && (
                <>
                    <CheckboxGroup
                        {...reasonEnumField}
                        value={reasonEnumField.value ? reasonEnumField.value : []}
                        legend="3.3.1 Lovfestet fraværsgrunn"
                        error={reasonEnumState.error?.message}
                        id="medisinskVurdering.annenFraversArsakGrunn"
                    >
                        {R.values(AnnenFraverGrunnSchema.enum).map((it) => (
                            <Checkbox key={it} value={it}>
                                {AnnenFraverGrunnValues[it]}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                    <TextField
                        {...register('medisinskVurdering.annenFraversArsakBeskrivelse')}
                        label="3.3.2 Beskriv fravær (valgfritt)"
                    />
                </>
            )}
        </div>
    )
}

export default AnnenLovfestetFravaersgrunnField
