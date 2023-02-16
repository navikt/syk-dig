import { BodyShort } from '@navikt/ds-react'
import { useQuery } from '@apollo/client'

import { CountriesDocument, UtenlandskAdresse } from '../../../../graphql/queries/graphql.generated'

type UtenlandskAdresseProps = {
    utenlandskAdresse: UtenlandskAdresse
}

function UtenlandskAdresse({ utenlandskAdresse }: UtenlandskAdresseProps): JSX.Element {
    const { loading, data } = useQuery(CountriesDocument)
    const country = data?.countries.find((country) => country.code === utenlandskAdresse.landkode)?.name

    return (
        <>
            {loading ? (
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
