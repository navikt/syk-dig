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
    const countries = useCountrySuggestions();
    const combobox = useComboboxState({
        gutter: 8,
        sameWidth: true,
        defaultValue: initialValue ?? undefined,
        list: countries.map((it) => it.name),
        setValue: (value) => {
            onChange();

            const country = countries.find((country) => country.name === value);
            if (!country) return;

            onSelect(country.code);
        },
    });

    return (
        <ComboboxWrapper id="country-typeahead-label" label="Landet sykmeldingen ble skrevet">
            <DsCombobox id={id} aria-labelledby="country-typeahead-label" state={combobox} />
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

function useCountrySuggestions(): Country[] {
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
        fetch(api('/api/country'))
            .then((res) => res.json())
            .then((countries: Country[]) => {
                setCountries(countries);
            });
    }, []);

    return countries;
}

export default CountryCombobox;
