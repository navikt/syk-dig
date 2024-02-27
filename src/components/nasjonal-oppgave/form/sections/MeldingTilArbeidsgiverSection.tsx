import React, { ReactElement } from 'react'
import { Textarea } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'

import { getSectionTitle, sections } from '../../sections'
import FormSection from '../../../form-layout/FormSection'
import { NasjonalFormValues } from '../NasjonalSykmeldingFormTypes'

function MeldingTilArbeidsgiverSection(): ReactElement {
    const { register } = useFormContext<NasjonalFormValues>()

    return (
        <FormSection id="meldingtilarbeidsgiver-section" title={getSectionTitle(sections.MELDING_TIL_ARBEIDSGIVER)}>
            <Textarea {...register('andreInnspillTilArbeidsgiver')} label="9.1 Andre innspill til arbeidsgiveren" />
        </FormSection>
    )
}

export default MeldingTilArbeidsgiverSection
