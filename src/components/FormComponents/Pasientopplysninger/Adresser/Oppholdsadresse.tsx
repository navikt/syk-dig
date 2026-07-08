import { BodyShort } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { OppholdsadresseFragment } from '../../../../graphql/queries/graphql.generated'

import Matrikkeladresse from './Matrikkeladresse'
import OppholdAnnet from './OppholdAnnet'
import UtenlandskAdresse from './Utenlandskadresse'
import Vegadresse from './Vegadresse'

type OppholdsadresseProps = {
    oppholdsadresse: OppholdsadresseFragment | null
}

function Oppholdsadresse({ oppholdsadresse }: OppholdsadresseProps): ReactElement {
    if (!oppholdsadresse) {
        return <BodyShort>Oppholdsadresse mangler</BodyShort>
    }

    switch (oppholdsadresse.__typename) {
        case 'Vegadresse':
            return <Vegadresse vegadresse={oppholdsadresse} />
        case 'Matrikkeladresse':
            return <Matrikkeladresse matrikkeladresse={oppholdsadresse} />
        case 'UtenlandskAdresse':
            return <UtenlandskAdresse utenlandskAdresse={oppholdsadresse} />
        case 'OppholdAnnetSted':
            return <OppholdAnnet oppholdAnnet={oppholdsadresse} />
    }
}

export default Oppholdsadresse
