import { BodyShort } from '@navikt/ds-react'
import { ReactElement } from 'react'

import type { UtenlandskAdresse } from '../../../../graphql/queries/graphql.generated'
import { countries } from '../../../../utils/countries'

type UtenlandskAdresseProps = {
    utenlandskAdresse: UtenlandskAdresse
}

function UtenlandskAdresse({ utenlandskAdresse }: UtenlandskAdresseProps): ReactElement {
    const country = countries.find((country) => country.code === utenlandskAdresse.landkode)?.name

    return (
        <>
            {utenlandskAdresse.adressenavnNummer && <BodyShort>{utenlandskAdresse.adressenavnNummer}</BodyShort>}
            {utenlandskAdresse.postboksNummerNavn && <BodyShort>{utenlandskAdresse.postboksNummerNavn}</BodyShort>}
            {utenlandskAdresse.postkode && (
                <BodyShort>{`${utenlandskAdresse.postkode} ${utenlandskAdresse.bySted ?? ''}`}</BodyShort>
            )}
            {country && <BodyShort>{country}</BodyShort>}
        </>
    )
}

export default UtenlandskAdresse
