import React, { ReactElement } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@navikt/ds-react'
import { XMarkIcon } from '@navikt/aksel-icons'

import FormSection from '../../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../../sections'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import { createEmptyAktivitetMuligPeriode } from '../../nasjonalSykmeldingDefaultValues'

import PeriodetypeSelectField from './PeriodetypeSelectField'
import PeriodeFieldGroup from './PeriodeFieldGroup'

function MulighetForArbeidSection(): ReactElement {
    const { control } = useFormContext<NasjonalFormValues>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'mulighetForArbeid',
    })

    return (
        <FormSection id="mulighet-for-arbeid-seksjon" title={getSectionTitle(sections.MULIGHET_FOR_ARBEID)}>
            <div className="flex flex-col gap-8">
                {fields.map((field, index) => (
                    <section key={field.id} className="relative" aria-label={`Periode ${index + 1}`}>
                        <PeriodetypeSelectField fieldIndex={index} />
                        <PeriodeFieldGroup fieldIndex={index} />
                        {index > 0 && (
                            <div>
                                <Button
                                    variant="secondary"
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-0 right-0"
                                    size="xsmall"
                                    icon={<XMarkIcon title="Fjern periode" />}
                                />
                            </div>
                        )}
                    </section>
                ))}
            </div>
            <Button
                variant="secondary"
                type="button"
                onClick={() => append(createEmptyAktivitetMuligPeriode())}
                size="small"
            >
                Legg til periode
            </Button>
        </FormSection>
    )
}

export default MulighetForArbeidSection
