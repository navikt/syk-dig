import React, { ReactElement } from 'react'

import { getSectionTitle, sections } from '../../../sections'
import FormSection from '../../../../form-layout/FormSection'

import DiagnoseFieldGroup from './DiagnoseFieldGroup'
import AnnenLovfestetFravaersgrunnFieldGroup from './AnnenLovfestetFravaersgrunnField'
import AndreDiagnoseOpplysningerFieldGroup from './AndreDiagnoseOpplysningerFieldGroup'

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
