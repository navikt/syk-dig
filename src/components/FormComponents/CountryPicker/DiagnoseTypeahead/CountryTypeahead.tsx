import React, { ChangeEvent, useEffect, useState } from 'react';
import { ComboboxList } from '@reach/combobox';
import * as R from 'remeda';

import { api } from '../../../../utils/apiUtils';
import { Country } from '../../../../pages/api/country/index.api';
import {
    ComboboxWrapper,
    DsCombobox,
    DsComboboxInput,
    DsComboboxNoResult,
    DsComboboxOption,
    DsComboboxPopover,
} from '../../CustomFormComponents/Combobox';

interface Props {
    onSelect: (countryCode: string | null) => void;
}

function CountryTypeahead({ onSelect }: Props): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const countries = useCountrySuggestions(searchTerm);

    return (
        <ComboboxWrapper id="country-typeahead-label" label="Landet sykmeldingen ble skrevet">
            <DsCombobox
                aria-labelledby="country-typeahead-label"
                openOnFocus
                onSelect={(item) => {
                    if (typeof item !== 'string') return;

                    onSelect(item.split(', ')[1]);
                }}
            >
                <DsComboboxInput
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSearchTerm(event.target.value);

                        if (event.target.value.trim() === '') {
                            onSelect(null);
                        }
                    }}
                />
                <DsComboboxPopover>
                    <ComboboxList>
                        {countries.map((country) => (
                            <DsComboboxOption key={country.code} value={`${country.name}, ${country.code}`} />
                        ))}
                    </ComboboxList>
                    {countries.length === 0 && <DsComboboxNoResult text="Ingen treff" />}
                </DsComboboxPopover>
            </DsCombobox>
        </ComboboxWrapper>
    );
}

function useCountrySuggestions(searchTerm: string): Country[] {
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
        fetch(api('/api/country'))
            .then((res) => res.json())
            .then((countries: Country[]) => {
                setCountries(countries);
            });
    }, []);

    return searchCountries(searchTerm, countries);
}

function searchCountries(searchTerm: string, countries: Country[]): Country[] {
    if (searchTerm.trim() == '') {
        return countries;
    }

    return R.filter(countries, (country) => country.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
}

export default CountryTypeahead;
