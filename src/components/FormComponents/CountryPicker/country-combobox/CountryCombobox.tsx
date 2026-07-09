import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import { countries } from '../../../../utils/countries'

const countryOptions = countries.map((country) => ({ label: `${country.name} (${country.code})`, value: country.code }))

type Props = {
    id?: string
    value?: string | null
    onSelect: (countryCode: string | null) => void
    onBlur?: () => void
    onFocus?: () => void
}

export function CountryCombobox({ id, value, onSelect, onBlur }: Props): ReactElement {
    const selectedCountry = countryOptions.find((option) => option.value === value)

    return (
        <Combobox
            id={id}
            label="Landet sykmeldingen ble skrevet"
            options={countryOptions}
            selectedOptions={selectedCountry ? [selectedCountry] : []}
            onToggleSelected={(value) => {
                onSelect(value)
            }}
            onBlur={onBlur}
        />
    )
}
