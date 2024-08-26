import React, { ReactElement, startTransition, useState } from 'react'

import {
    AkselifiedCombobox,
    AkselifiedComboboxDisclosure,
    AkselifiedComboboxItem,
    AkselifiedComboboxNonInteractiveFeedbackItem,
    AkselifiedComboboxNonSelectables,
    AkselifiedComboboxPopover,
    AkselifiedComboboxWrapper,
} from '../../combobox/AkselifiedCombobox'
import { countries } from '../../../../utils/countries'

type Props = {
    id?: string
    onSelect: (countryCode: string | null) => void
    onChange: () => void
    initialValue: string | null
}

function CountryCombobox({ id, onChange, onSelect, initialValue }: Props): ReactElement {
    const defaultCountry = countries.find((country) => country.code === initialValue)?.name
    const [searchValue, setSearchValue] = useState(defaultCountry ?? '')
    const suggestions = !searchValue.trim()
        ? countries
        : countries.filter(
              (country) =>
                  country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  country.code.toLowerCase().includes(searchValue.toLowerCase()),
          )

    return (
        <AkselifiedComboboxWrapper
            defaultValue={defaultCountry ?? undefined}
            labelId="country-typeahead-label"
            label="Landet sykmeldingen ble skrevet"
            setValue={(value) => {
                const country = countries.find((country) => country.name === value)

                startTransition(() => {
                    if (country) {
                        onSelect(country.code)
                        setSearchValue(country.name)
                    } else {
                        onChange()
                        setSearchValue(value)
                    }
                })
            }}
        >
            <AkselifiedCombobox id={id} aria-labelledby="country-typeahead-label" placeholder="Søk etter land">
                <AkselifiedComboboxDisclosure />
            </AkselifiedCombobox>
            <AkselifiedComboboxPopover>
                <AkselifiedComboboxNonSelectables>
                    {suggestions.length === 0 && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            {`Fant ingen land med navn eller kode "${searchValue}"`}
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                </AkselifiedComboboxNonSelectables>
                {suggestions.length > 0 &&
                    suggestions.map((value) => (
                        <AkselifiedComboboxItem key={value.code} value={value.name}>
                            {value.name}
                        </AkselifiedComboboxItem>
                    ))}
            </AkselifiedComboboxPopover>
        </AkselifiedComboboxWrapper>
    )
}

export default CountryCombobox
