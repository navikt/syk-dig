import { BodyShort } from '@navikt/ds-react'

import { UtenlandskAdresse } from '../../../../graphql/queries/graphql.generated'
import { useCountrySuggestions } from '../../CountryPicker/CountryCombobox/CountryCombobox'

type UtenlandskAdresseProps = {
    utenlandskAdresse: UtenlandskAdresse
}

function UtenlandskAdresse({ utenlandskAdresse }: UtenlandskAdresseProps): JSX.Element {
    const [loadingCountries, countries] = useCountrySuggestions()
    const country = countries.find((country) => country.code === utenlandskAdresse.landkode)?.name

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
                    {country && <BodyShort>{country}</BodyShort>}
                </>
            )}
        </>
    )
}

export default UtenlandskAdresse
