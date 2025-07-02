import { Select } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import { UtenlanskFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'
import { PeriodeType } from '../../../graphql/queries/graphql.generated'

type FormName = `periode.${number}.sykmeldingstype`

interface Props {
    name: FormName
    index: number
}

function PeriodeSelect({ name, index }: Props): ReactElement {
    const { field, fieldState } = useController<UtenlanskFormValues, FormName>({
        name,
        rules: {
            required: 'Du må fylle inn periode',
        },
    })
    return (
        <div>
            <Select id={name} label={`Periode ${index + 1}`} {...field} className="w-56">
                <option value={PeriodeType.AktivitetIkkeMulig}>100% sykmeldt</option>
                <option value={PeriodeType.Gradert}>Gradert sykmelding</option>
            </Select>
            <FieldError error={fieldState.error} />
        </div>
    )
}

export default PeriodeSelect
