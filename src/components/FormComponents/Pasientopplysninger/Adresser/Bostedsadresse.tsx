import { BodyShort } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { BostedsadresseFragment } from '../../../../graphql/queries/graphql.generated'

import Vegadresse from './Vegadresse'
import Matrikkeladresse from './Matrikkeladresse'
import UtenlandskAdresse from './Utenlandskadresse'

type BostedsadresseProps = {
    bostedsadresse: BostedsadresseFragment | null
}

function Bostedsadresse({ bostedsadresse }: BostedsadresseProps): ReactElement {
    if (!bostedsadresse) {
        return <BodyShort>Bostedsadresse mangler</BodyShort>
    }

    switch (bostedsadresse.__typename) {
        case 'Vegadresse':
            return <Vegadresse vegadresse={bostedsadresse} />
        case 'Matrikkeladresse':
            return <Matrikkeladresse matrikkeladresse={bostedsadresse} />
        case 'UtenlandskAdresse':
            return <UtenlandskAdresse utenlandskAdresse={bostedsadresse} />
        case 'UkjentBosted':
            return <BodyShort>{`Kommunenummer: ${bostedsadresse.bostedskommune}`}</BodyShort>
    }
}

export default Bostedsadresse
