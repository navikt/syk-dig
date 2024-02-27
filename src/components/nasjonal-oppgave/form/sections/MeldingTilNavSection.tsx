import React, { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Textarea } from '@navikt/ds-react'

import FormSection from '../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../sections'
import SoloCheckbox from '../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { NasjonalFormValues } from '../NasjonalSykmeldingFormTypes'

function MeldingTilNavSection(): ReactElement {
    const { register } = useFormContext<NasjonalFormValues>()
    const { field: bistandField } = useController<NasjonalFormValues, 'bistandFraNAV.bistandFraNAV'>({
        name: 'bistandFraNAV.bistandFraNAV',
    })

    return (
        <FormSection id="meldingtilnav-section" title={getSectionTitle(sections.MELDING_TIL_NAV)}>
            <SoloCheckbox {...bistandField} legend="8.1">
                Ønskes bistand fra NAV nå?
            </SoloCheckbox>
            {bistandField.value && <Textarea {...register('bistandFraNAV.beskrivelse')} label="Begrunn nærmere" />}
        </FormSection>
    )
}

export default MeldingTilNavSection
