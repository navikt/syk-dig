import React, { ReactElement } from 'react'

import FormSection from '../../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../../sections'

import AndreDiagnoseOpplysningerFieldGroup from './AndreDiagnoseOpplysningerFieldGroup'
import AnnenLovfestetFravaersgrunnFieldGroup from './AnnenLovfestetFravaersgrunnField'
import DiagnoseFieldGroup from './DiagnoseFieldGroup'

function DiagnoseFormSection(): ReactElement {
    return (
        <FormSection id="diagnose-seksjon" title={getSectionTitle(sections.DIAGNOSE)} className="flex flex-col gap-8">
            <DiagnoseFieldGroup />
            <AnnenLovfestetFravaersgrunnFieldGroup />
            <AndreDiagnoseOpplysningerFieldGroup />
        </FormSection>
    )
}

export default DiagnoseFormSection
