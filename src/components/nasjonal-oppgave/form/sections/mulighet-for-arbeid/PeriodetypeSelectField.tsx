import { Select } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'

import { MulighetForArbeid, NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'

type Props = {
    fieldIndex: number
}

function PeriodetypeSelectField({ fieldIndex }: Props): ReactElement {
    const { field } = useController<NasjonalFormValues, `mulighetForArbeid.${number}.type`>({
        name: `mulighetForArbeid.${fieldIndex}.type`,
    })

    return (
        <Select {...field} value={field.value} label="Periodetype" className="max-w-64 mb-4">
            <option value={'avventende' satisfies MulighetForArbeid['type']}>4.1 Avventende sykmelding</option>
            <option value={'gradert' satisfies MulighetForArbeid['type']}>4.2 Gradert sykmelding</option>
            <option value={'aktivitetIkkeMulig' satisfies MulighetForArbeid['type']}>4.3 100% sykmelding</option>
            <option value={'behandlingsdager' satisfies MulighetForArbeid['type']}>4.4 Behandlingsdager</option>
            <option value={'reisetilskudd' satisfies MulighetForArbeid['type']}>4.5 Reisetilskudd</option>
        </Select>
    )
}

export default PeriodetypeSelectField
