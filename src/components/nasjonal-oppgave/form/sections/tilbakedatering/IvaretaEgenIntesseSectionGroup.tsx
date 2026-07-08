import { Textarea } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'

function IvaretaEgenIntesseSectionGroup(): ReactElement {
    const { register } = useFormContext<NasjonalFormValues>()
    const { field: ivaretaEgenInteresseField } = useController<
        NasjonalFormValues,
        'tilbakedatering.kunneIkkeIvaretaEgneInteresser'
    >({
        name: 'tilbakedatering.kunneIkkeIvaretaEgneInteresser',
    })

    return (
        <div className="flex flex-col gap-4">
            <SoloCheckbox {...ivaretaEgenInteresseField} legend="11.2">
                Pasienten har ikke kunnet ivareta egne interesser
            </SoloCheckbox>
            {ivaretaEgenInteresseField.value && (
                <Textarea {...register('tilbakedatering.kunneIkkeIvaretaEgneInteresserBegrunnelse')} label="Begrunn" />
            )}
        </div>
    )
}

export default IvaretaEgenIntesseSectionGroup
