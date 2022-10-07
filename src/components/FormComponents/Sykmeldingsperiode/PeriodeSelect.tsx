import { Select } from '@navikt/ds-react';
import { useController } from 'react-hook-form';

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import FieldError from '../FieldError/FieldError';

export enum Periodetype {
    AktivitetIkkeMulig = 'AKTIVITET_IKKE_MULIG',
    Avventende = 'AVVENTENDE',
    Behandlingsdager = 'BEHANDLINGSDAGER',
    Gradert = 'GRADERT',
    Reisetilskudd = 'REISETILSKUDD',
}

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
        <div>
            <Select id={name} label="Periode" {...field}>
                <option value={Periodetype.AktivitetIkkeMulig}>100% sykmeldt</option>
                <option value={Periodetype.Avventende}>Avventende sykmelding</option>
                <option value={Periodetype.Behandlingsdager}>Behandlingsdager</option>
                <option value={Periodetype.Gradert}>Gradert sykmelding</option>
                <option value={Periodetype.Reisetilskudd}>Reisetilskudd</option>
            </Select>
            <FieldError error={fieldState.error} />
        </div>
    );
}

export default PeriodeSelect;
