import { XMarkIcon } from '@navikt/aksel-icons'
import { Button } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import FormSection from '../../../../form-layout/FormSection'
import { getSectionTitle, sections } from '../../../sections'
import { createEmptyAktivitetMuligPeriode } from '../../nasjonalSykmeldingDefaultValues'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'

import PeriodeFieldGroup from './PeriodeFieldGroup'
import PeriodetypeSelectField from './PeriodetypeSelectField'

function MulighetForArbeidSection(): ReactElement {
    const { control } = useFormContext<NasjonalFormValues>()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'mulighetForArbeid',
    })

    return (
        <FormSection id="mulighet-for-arbeid-seksjon" title={getSectionTitle(sections.MULIGHET_FOR_ARBEID)}>
            <div className="flex flex-col gap-8 divide-y-2 divide-ax-border-neutral-subtle [&>section]:pt-8 [&>section:first-child]:p-0">
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
