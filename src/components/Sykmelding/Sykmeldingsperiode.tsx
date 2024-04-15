import { Button } from '@navikt/ds-react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { XMarkIcon } from '@navikt/aksel-icons'
import { ReactElement } from 'react'

import FormSection from '../form-layout/FormSection'
import PeriodeSelect from '../FormComponents/Sykmeldingsperiode/PeriodeSelect'
import GradInput from '../FormComponents/Sykmeldingsperiode/GradInput'
import PeriodePicker from '../FormComponents/Sykmeldingsperiode/PeriodePicker'
import { PeriodeType } from '../../graphql/queries/graphql.generated'

import { UtenlanskFormValues } from './SykmeldingForm'
import styles from './Sykmeldingsperiode.module.css'

export interface PeriodeFormValue {
    sykmeldingstype: PeriodeType
    grad?: number | undefined
    range: {
        fom?: Date | undefined
        tom?: Date | undefined
    }
}

function Sykmeldingsperiode(): ReactElement {
    const { control, clearErrors } = useFormContext<UtenlanskFormValues>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'periode',
    })

    const watchFieldArray = useWatch({ name: 'periode' })

    return (
        <FormSection id="sykmeldingsperiode-seksjon" title="Sykmeldingsperiode">
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
                                icon={<XMarkIcon title="Fjern periode" />}
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
        </FormSection>
    )
}

export default Sykmeldingsperiode
