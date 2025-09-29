import React, { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Checkbox, CheckboxGroup, TextField } from '@navikt/ds-react'
import * as R from 'remeda'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import {
    MedisinskArsakType,
    MedisinskArsakTypeSchema,
    MedisinskArsakTypeValues,
} from '../../../schema/sykmelding/Periode'

type Props = {
    parent: `mulighetForArbeid.${number}`
}

function MedisinskArsakFieldGroup({ parent }: Props): ReactElement {
    const { register } = useFormContext<NasjonalFormValues>()
    const { field } = useController<NasjonalFormValues, `${typeof parent}.medisinskArsak`>({
        name: `${parent}.medisinskArsak`,
    })
    const { field: typeField } = useController<NasjonalFormValues, `${typeof parent}.medisinskArsakType`>({
        name: `${parent}.medisinskArsakType`,
    })

    return (
        <div className="flex flex-col gap-4">
            <SoloCheckbox {...field} hideLegend legend="Medisinske årsaker">
                Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet
            </SoloCheckbox>
            {field.value && (
                <div className="ml-8">
                    <CheckboxGroup
                        {...typeField}
                        value={typeField.value ? typeField.value : []}
                        legend="Medisinske årsaker"
                    >
                        {R.values(MedisinskArsakTypeSchema.enum).map((it) => (
                            <Checkbox key={it} value={it}>
                                {MedisinskArsakTypeValues[it as MedisinskArsakType]}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                    <TextField {...register(`${parent}.medisinskArsakBeskrivelse`)} label="Beskrivelse" />
                </div>
            )}
        </div>
    )
}

export default MedisinskArsakFieldGroup
