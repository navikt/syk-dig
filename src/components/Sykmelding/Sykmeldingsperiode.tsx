import { Button } from '@navikt/ds-react';
import { Calender, Delete } from '@navikt/ds-icons';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection';
import PeriodeSelect, { Periodetype } from '../FormComponents/Sykmeldingsperiode/PeriodeSelect';
import GradInput from '../FormComponents/Sykmeldingsperiode/GradInput';
import PeriodePicker from '../FormComponents/Sykmeldingsperiode/PeriodePicker';

import { SykmeldingFormValues } from './SykmeldingForm';
import styles from './Sykmeldingsperiode.module.css';

export interface Periode {
    sykmeldingstype: string;
    grad?: number | undefined;
    fom?: Date | string | undefined;
    tom?: Date | string | undefined;
}

function Sykmeldingsperiode(): JSX.Element {
    const { control, clearErrors } = useFormContext<SykmeldingFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'periode',
    });

    const watchFieldArray = useWatch({ name: 'periode' });

    return (
        <SykmeldingSection id="sykmeldingsperiode-seksjon" title="Sykmeldingsperiode" Icon={Calender}>
            {fields.map((field, index) => (
                <div id={`periode${index}`} className={styles.periode} key={field.id}>
                    {index > 0 && (
                        <Button variant="danger" icon={<Delete />} type="button" onClick={() => remove(index)} />
                    )}
                    <PeriodeSelect name={`periode.${index}.sykmeldingstype`} />
                    {watchFieldArray?.[index]?.sykmeldingstype === Periodetype.Gradert && (
                        <GradInput name={`periode.${index}.grad`} />
                    )}
                    <PeriodePicker index={index} />
                </div>
            ))}
            <Button
                className={styles.leggTilButton}
                variant="secondary"
                type="button"
                onClick={() => {
                    clearErrors();
                    append({ sykmeldingstype: Periodetype.AktivitetIkkeMulig, fom: undefined, tom: undefined });
                }}
            >
                Legg til periode
            </Button>
        </SykmeldingSection>
    );
}

export default Sykmeldingsperiode;
