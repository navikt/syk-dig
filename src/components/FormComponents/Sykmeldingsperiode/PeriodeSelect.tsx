import { Select } from '@navikt/ds-react';
import { useController } from 'react-hook-form';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import FieldError from '../FieldError/FieldError';
import { PeriodeType } from '../../../graphql/queries/graphql.generated';

import styles from './PeriodeSelect.module.css';

type FormName = `periode.${number}.sykmeldingstype`;

interface Props {
    name: FormName;
}

function PeriodeSelect({ name }: Props): JSX.Element {
    const { field, fieldState } = useController<SykmeldingFormValues, FormName>({
        name,
        rules: {
            required: 'Du må fylle inn periode.',
        },
    });
    return (
        <div className={styles.periodeSelect}>
            <Select id={name} label="Periode" {...field}>
                <option value={PeriodeType.AktivitetIkkeMulig}>100% sykmeldt</option>
                <option value={PeriodeType.Avventende}>Avventende sykmelding</option>
                <option value={PeriodeType.Behandlingsdager}>Behandlingsdager</option>
                <option value={PeriodeType.Gradert}>Gradert sykmelding</option>
                <option value={PeriodeType.Reisetilskudd}>Reisetilskudd</option>
            </Select>
            <FieldError error={fieldState.error} />
        </div>
    );
}

export default PeriodeSelect;
