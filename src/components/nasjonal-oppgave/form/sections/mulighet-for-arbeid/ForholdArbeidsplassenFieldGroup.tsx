import React, { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Checkbox, CheckboxGroup, TextField } from '@navikt/ds-react'
import * as R from 'remeda'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import {
    ArbeidsrelatertArsakType,
    ArbeidsrelatertArsakTypeSchema,
    ArbeidsrelatertArsakTypeValues,
} from '../../../schema/sykmelding/Periode'

type Props = {
    parent: `mulighetForArbeid.${number}`
}

function ForholdArbeidsplassenFieldGroup({ parent }: Props): ReactElement {
    const { register } = useFormContext<NasjonalFormValues>()
    const { field } = useController<NasjonalFormValues, `${typeof parent}.arbeidsrelatertArsak`>({
        name: `${parent}.arbeidsrelatertArsak`,
    })
    const { field: typeField } = useController<NasjonalFormValues, `${typeof parent}.arbeidsrelatertArsakType`>({
        name: `${parent}.arbeidsrelatertArsakType`,
    })

    return (
        <div className="flex flex-col gap-4">
            <SoloCheckbox {...field} hideLegend legend="Forhold på arbeidsplassen">
                Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet
            </SoloCheckbox>
            {field.value && (
                <div className="ml-8">
                    <CheckboxGroup
                        {...typeField}
                        value={typeField.value ? typeField.value : []}
                        legend="Arbeidsrelaterte årsaker"
                    >
                        {R.values(ArbeidsrelatertArsakTypeSchema.Enum).map((it) => (
                            <Checkbox key={it} value={it}>
                                {ArbeidsrelatertArsakTypeValues[it as ArbeidsrelatertArsakType]}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                    <TextField {...register(`${parent}.arbeidsrelatertArsakBeskrivelse`)} label="Beskrivelse" />
                </div>
            )}
        </div>
    )
}

export default ForholdArbeidsplassenFieldGroup
