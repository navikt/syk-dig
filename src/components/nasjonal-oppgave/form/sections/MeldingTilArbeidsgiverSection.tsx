import { Textarea } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

import FormSection from '../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../sections'
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
