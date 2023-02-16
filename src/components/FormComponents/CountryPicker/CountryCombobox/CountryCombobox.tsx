import React, { useEffect } from 'react'
import { useComboboxState } from 'ariakit/combobox'
import { useQuery } from '@apollo/client'

import {
    ComboboxWrapper,
    DsCombobox,
    DsComboboxItem,
    DsComboboxNoResult,
    DsComboboxPopover,
} from '../../CustomFormComponents/Combobox'
import { CountriesDocument } from '../../../../graphql/queries/graphql.generated'

interface Props {
    id?: string
    onSelect: (countryCode: string | null) => void
    onChange: () => void
    initialValue: string | null
}

function CountryCombobox({ id, onSelect, onChange, initialValue }: Props): JSX.Element {
    const { loading, data } = useQuery(CountriesDocument)
    const combobox = useComboboxState({
        gutter: 8,
        sameWidth: true,
        list: data?.countries?.map((it) => it.name),
        setValue: (value) => {
            const country = data?.countries.find((country) => country.name === value)

            // Don't trigger onChange when we are setting the lazy loaded initial value
            if (country?.code === initialValue) return

            onChange()

            if (!country) return

            onSelect(country.code)
        },
    })
    const defaultCountry = data?.countries.find((country) => country.code === initialValue)?.name

    useEffect(() => {
        if (!defaultCountry) return

        // Countries are lazy-loaded, so we need to manually set the value when it has loaded
        combobox.setValue(defaultCountry)
    }, [combobox, defaultCountry])

    return (
        <ComboboxWrapper labelId="country-typeahead-label" label="Landet sykmeldingen ble skrevet" disabled={loading}>
            <DsCombobox
                id={id}
                aria-labelledby="country-typeahead-label"
                state={combobox}
                disabled={loading}
                placeholder={loading ? 'Laster land...' : 'Søk etter land'}
            />
            <DsComboboxPopover state={combobox}>
                {combobox.matches.map((country) => (
                    <DsComboboxItem key={country} value={country}>
                        {country}
                    </DsComboboxItem>
                ))}
                {combobox.matches.length === 0 && <DsComboboxNoResult text="Ingen treff" />}
            </DsComboboxPopover>
        </ComboboxWrapper>
    )
}

export default CountryCombobox
