import { Button } from '@navikt/ds-react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { Close } from '@navikt/ds-icons'
import React from 'react'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import PeriodeSelect from '../FormComponents/Sykmeldingsperiode/PeriodeSelect'
import GradInput from '../FormComponents/Sykmeldingsperiode/GradInput'
import PeriodePicker from '../FormComponents/Sykmeldingsperiode/PeriodePicker'
import { PeriodeType } from '../../graphql/queries/graphql.generated'

import { SykmeldingFormValues } from './SykmeldingForm'
import styles from './Sykmeldingsperiode.module.css'

export interface PeriodeFormValue {
    sykmeldingstype: PeriodeType
    grad?: number | undefined
    range: {
        fom?: Date | undefined
        tom?: Date | undefined
    }
}

function Sykmeldingsperiode(): JSX.Element {
    const { control, clearErrors } = useFormContext<SykmeldingFormValues>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'periode',
    })

    const watchFieldArray = useWatch({ name: 'periode' })

    return (
        <SykmeldingSection id="sykmeldingsperiode-seksjon" title="Sykmeldingsperiode">
            {fields.map((field, index) => (
                <div id={`periode${index}`} key={field.id} className={styles.periodeRow}>
                    <div className={styles.periode}>
                        <div className={styles.periodeGradWrapper}>
                            <PeriodeSelect name={`periode.${index}.sykmeldingstype`} index={index} />
                            {watchFieldArray?.[index]?.sykmeldingstype === PeriodeType.Gradert && (
                                <GradInput name={`periode.${index}.grad`} />
                            )}
                        </div>
                        <PeriodePicker index={index} name={`periode.${index}.range`} />
                    </div>
                    {index > 0 && (
                        <div className={styles.deleteButton}>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => remove(index)}
                                className={styles.deleteButton}
                                size="xsmall"
                                icon={<Close title="Fjern periode" />}
                            />
                        </div>
                    )}
                </div>
            ))}
            <Button
                className={styles.leggTilButton}
                variant="secondary"
                type="button"
                size="small"
                onClick={() => {
                    append({
                        sykmeldingstype: PeriodeType.AktivitetIkkeMulig,
                        range: { fom: undefined, tom: undefined },
                    })
                    requestAnimationFrame(() => {
                        clearErrors()
                    })
                }}
            >
                Legg til periode
            </Button>
        </SykmeldingSection>
    )
}

export default Sykmeldingsperiode
