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
            <div className="flex flex-col gap-8 divide-y-2 divide-border-divider [&>section]:pt-8 [&>section:first-child]:p-0">
                {fields.map((field, index) => (
                    <section key={field.id} aria-label={`Periode ${index + 1}`}>
                        <div className="relative">
                            <PeriodetypeSelectField fieldIndex={index} />
                            <PeriodeFieldGroup fieldIndex={index} />
                            {index > 0 && (
                                <div className="absolute top-0 right-0">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={() => remove(index)}
                                        size="xsmall"
                                        icon={<XMarkIcon title="Fjern periode" />}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
            <div className="mt-12">
                <Button variant="secondary" type="button" onClick={() => append(createEmptyAktivitetMuligPeriode())}>
                    Legg til periode
                </Button>
            </div>
        </FormSection>
    )
}

export default MulighetForArbeidSection
