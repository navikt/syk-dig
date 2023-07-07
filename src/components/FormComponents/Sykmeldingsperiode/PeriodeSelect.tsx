import { Select } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'
import { PeriodeType } from '../../../graphql/queries/graphql.generated'

import styles from './PeriodeSelect.module.css'

type FormName = `periode.${number}.sykmeldingstype`

interface Props {
    name: FormName
    index: number
}

function PeriodeSelect({ name, index }: Props): ReactElement {
    const { field, fieldState } = useController<SykmeldingFormValues, FormName>({
        name,
        rules: {
            required: 'Du må fylle inn periode.',
        },
    })
    return (
        <div className={styles.periodeSelect}>
            <Select id={name} label={`Periode ${index + 1}`} {...field}>
                <option value={PeriodeType.AktivitetIkkeMulig}>100% sykmeldt</option>
                <option value={PeriodeType.Gradert}>Gradert sykmelding</option>
            </Select>
            <FieldError error={fieldState.error} />
        </div>
    )
}

export default PeriodeSelect
