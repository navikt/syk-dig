import { Button } from '@navikt/ds-react'
import { Calender, Delete } from '@navikt/ds-icons'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

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
        <SykmeldingSection id="sykmeldingsperiode-seksjon" title="Sykmeldingsperiode" Icon={Calender}>
            {fields.map((field, index) => (
                <div id={`periode${index}`} className={styles.periode} key={field.id}>
                    {index > 0 && (
                        <Button
                            variant="danger"
                            icon={<Delete aria-hidden />}
                            aria-label={`Slett periode ${index + 1}`}
                            type="button"
                            onClick={() => remove(index)}
                        />
                    )}
                    <PeriodeSelect name={`periode.${index}.sykmeldingstype`} />
                    {watchFieldArray?.[index]?.sykmeldingstype === PeriodeType.Gradert && (
                        <GradInput name={`periode.${index}.grad`} />
                    )}
                    <PeriodePicker name={`periode.${index}.range`} />
                </div>
            ))}
            <Button
                className={styles.leggTilButton}
                variant="secondary"
                type="button"
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
