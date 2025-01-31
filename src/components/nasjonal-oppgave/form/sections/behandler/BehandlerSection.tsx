import React, { ReactElement } from 'react'

import FormSection from '../../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../../sections'
import { BehandlerFragment } from '../../../../../graphql/queries/graphql.generated'

import BehandletDatoField from './BehandletDatoField'
import BehandlerFieldGroup from './BehandlerFieldGroup'

type Props = {
    behandlerInfo: BehandlerFragment | null
}

function BehandlerSection({ behandlerInfo }: Props): ReactElement {
    return (
        <FormSection id="behandler-section" title={getSectionTitle(sections.BEHANDLER)} className="flex flex-col gap-4">
            <BehandletDatoField />
            <BehandlerFieldGroup behandlerInfo={behandlerInfo} />
        </FormSection>
    )
}

export default BehandlerSection
