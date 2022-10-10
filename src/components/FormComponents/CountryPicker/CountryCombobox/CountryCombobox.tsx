import React, { useEffect, useState } from 'react';
import { useComboboxState } from 'ariakit/combobox';

import { api } from '../../../../utils/apiUtils';
import { Country } from '../../../../pages/api/country/index.api';
import {
    ComboboxWrapper,
    DsCombobox,
    DsComboboxItem,
    DsComboboxNoResult,
    DsComboboxPopover,
} from '../../CustomFormComponents/Combobox';

interface Props {
    id?: string;
    onSelect: (countryCode: string | null) => void;
    onChange: () => void;
    initialValue: string | null;
}

function CountryCombobox({ id, onSelect, onChange, initialValue }: Props): JSX.Element {
    const [loadingCountries, countries] = useCountrySuggestions();
    const combobox = useComboboxState({
        gutter: 8,
        sameWidth: true,
        list: countries.map((it) => it.name),
        setValue: (value) => {
            const country = countries.find((country) => country.name === value);

            // Don't trigger onChange when we are setting the lazy loaded initial value
            if (country?.code === initialValue) return;

            onChange();

            if (!country) return;

            onSelect(country.code);
        },
    });
    const defaultCountry = countries.find((country) => country.code === initialValue)?.name;

    useEffect(() => {
        if (!defaultCountry) return;

        // Countries are lazy-loaded, so we need to manually set the value when it has loaded
        combobox.setValue(defaultCountry);
    }, [combobox, defaultCountry]);

    return (
        <ComboboxWrapper
            id="country-typeahead-label"
            label="Landet sykmeldingen ble skrevet"
            disabled={loadingCountries}
        >
            <DsCombobox
                id={id}
                aria-labelledby="country-typeahead-label"
                state={combobox}
                disabled={loadingCountries}
                placeholder={loadingCountries ? 'Laster land...' : 'Søk etter land'}
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
    );
}

function useCountrySuggestions(): [loading: boolean, result: Country[]] {
    const [loading, setLoading] = useState<boolean>(true);
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
        fetch(api('/api/country'))
            .then((res) => res.json())
            .then((countries: Country[]) => {
                setCountries(countries);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return [loading, countries];
}

export default CountryCombobox;
