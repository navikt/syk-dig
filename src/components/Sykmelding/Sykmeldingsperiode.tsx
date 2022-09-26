import { Button } from '@navikt/ds-react';
import { Calender } from '@navikt/ds-icons';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection';
import PeriodeSelect, { Periodetype } from '../FormComponents/Sykmeldingsperiode/PeriodeSelect';
import GradInput from '../FormComponents/Sykmeldingsperiode/GradInput';

import { SykmeldingFormValues } from './SykmeldingForm';
import styles from './Sykmeldingsperiode.module.css';

export interface Periode {
    sykmeldingstype: string;
    grad?: number;
}

function Sykmeldingsperiode(): JSX.Element {
    const { control, clearErrors } = useFormContext<SykmeldingFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'periode',
    });

    const watchFieldArray = useWatch({ name: 'periode' });

    return (
        <SykmeldingSection title="Sykmeldingsperiode" Icon={Calender} ariaLabelIcon="Kalender ikon">
            {fields.map((field, index) => (
                <div id={`periode${index}`} className={styles.periode} key={field.id}>
                    <PeriodeSelect name={`periode.${index}.sykmeldingstype`} />
                    {watchFieldArray?.[index]?.sykmeldingstype === Periodetype.Gradert && (
                        <GradInput name={`periode.${index}.grad`} />
                    )}
                    {index > 0 && (
                        <Button
                            className={styles.nullstillButton}
                            variant="tertiary"
                            type="button"
                            onClick={() => remove(index)}
                        >
                            Fjern periode
                        </Button>
                    )}
                </div>
            ))}
            <Button
                className={styles.leggTilButton}
                variant="secondary"
                type="button"
                onClick={() => {
                    clearErrors(), append({ sykmeldingstype: Periodetype.AktivitetIkkeMulig });
                }}
            >
                Legg til periode
            </Button>
        </SykmeldingSection>
    );
}

export default Sykmeldingsperiode;
