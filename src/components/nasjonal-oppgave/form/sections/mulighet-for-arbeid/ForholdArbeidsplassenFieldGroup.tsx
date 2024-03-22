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
    const { field: typeField, fieldState: typeState } = useController<
        NasjonalFormValues,
        `${typeof parent}.arbeidsrelatertArsakType`
    >({
        name: `${parent}.arbeidsrelatertArsakType`,
    })

    return (
        <div>
            <SoloCheckbox {...field} hideLegend legend="">
                Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet
            </SoloCheckbox>
            {field.value && (
                <>
                    <CheckboxGroup
                        {...typeField}
                        value={typeField.value ? typeField.value : []}
                        legend="Medisinske årsaker"
                        error={typeState.error?.message}
                    >
                        {R.values(ArbeidsrelatertArsakTypeSchema.Enum).map((it) => (
                            <Checkbox key={it} value={it}>
                                {ArbeidsrelatertArsakTypeValues[it as ArbeidsrelatertArsakType]}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                    <TextField {...register(`${parent}.arbeidsrelatertArsakBeskrivelse`)} label="Beskrivelse" />
                </>
            )}
        </div>
    )
}

export default ForholdArbeidsplassenFieldGroup
