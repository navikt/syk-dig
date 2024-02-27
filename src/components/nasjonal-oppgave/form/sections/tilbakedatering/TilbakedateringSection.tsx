import React, { ReactElement } from 'react'

import FormSection from '../../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../../sections'

import TilbakedateringSectionGroup from './TilbakedateringSectionGroup'
import IvaretaEgenIntesseSectionGroup from './IvaretaEgenIntesseSectionGroup'

function TilbakedateringSection(): ReactElement {
    return (
        <FormSection
            id="tilbakedatering-section"
            title={getSectionTitle(sections.TILBAKEDATERING)}
            className="flex flex-col gap-4"
        >
            <TilbakedateringSectionGroup />
            <IvaretaEgenIntesseSectionGroup />
        </FormSection>
    )
}

export default TilbakedateringSection
