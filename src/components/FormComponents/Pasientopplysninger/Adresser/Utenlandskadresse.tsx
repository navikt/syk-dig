import { useEffect, useState } from 'react';
import { BodyShort } from '@navikt/ds-react';

import { UtenlandskAdresse } from '../../../../graphql/queries/graphql.generated';
import { useCountrySuggestions } from '../../CountryPicker/CountryCombobox/CountryCombobox';

type UtenlandskAdresseProps = {
    utenlandskAdresse: UtenlandskAdresse;
};

function UtenlandskAdresse({ utenlandskAdresse }: UtenlandskAdresseProps): JSX.Element {
    const [countryName, setCountryName] = useState<string | null>(null);
    const [loadingCountries, countries] = useCountrySuggestions();

    const country = countries.find((country) => country.alpha3 === utenlandskAdresse.landkode)?.name;

    useEffect(() => {
        if (country) {
            setCountryName(country);
        }
    }, [country, countries, utenlandskAdresse.landkode]);

    return (
        <>
            {loadingCountries ? (
                <BodyShort>Laster adresse...</BodyShort>
            ) : (
                <>
                    {utenlandskAdresse.adressenavnNummer && (
                        <BodyShort>{utenlandskAdresse.adressenavnNummer}</BodyShort>
                    )}
                    {utenlandskAdresse.postboksNummerNavn && (
                        <BodyShort>{utenlandskAdresse.postboksNummerNavn}</BodyShort>
                    )}
                    {utenlandskAdresse.postkode && (
                        <BodyShort>{`${utenlandskAdresse.postkode} ${utenlandskAdresse.bySted ?? ''}`}</BodyShort>
                    )}
                    {countryName && <BodyShort>{countryName}</BodyShort>}
                </>
            )}
        </>
    );
}

export default UtenlandskAdresse;
