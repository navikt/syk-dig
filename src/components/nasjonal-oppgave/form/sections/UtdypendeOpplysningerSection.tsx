import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'

import FormSection from '../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../sections'
import SoloCheckbox from '../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { NasjonalFormValues } from '../NasjonalSykmeldingFormTypes'

function UtdypendeOpplysningerSection(): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, 'harUtdypendeOpplysninger'>({
        name: 'harUtdypendeOpplysninger',
    })

    return (
        <FormSection id="utdypendeopplysninger-section" title={getSectionTitle(sections.UTDYPENDE_OPPLYSNINGER)}>
            <SoloCheckbox {...field} legend="" hideLegend error={fieldState.error?.message}>
                Sykmeldingen har utdypende opplysninger
            </SoloCheckbox>
        </FormSection>
    )
}

export default UtdypendeOpplysningerSection
