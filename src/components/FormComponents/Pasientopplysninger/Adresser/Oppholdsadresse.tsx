import { BodyShort, Heading } from '@navikt/ds-react'

import { OppholdsadresseFragment } from '../../../../graphql/queries/graphql.generated'

import Vegadresse from './Vegadresse'
import Matrikkeladresse from './Matrikkeladresse'
import UtenlandskAdresse from './Utenlandskadresse'
import OppholdAnnet from './OppholdAnnet'

type OppholdsadresseProps = {
    oppholdsadresse: OppholdsadresseFragment | null
}

function Oppholdsadresse({ oppholdsadresse }: OppholdsadresseProps): JSX.Element {
    return (
        <div>
            <Heading level="3" size="xsmall">
                Oppholdsadresse
            </Heading>
            <OppholdsadresseVariant oppholdsadresse={oppholdsadresse} />
        </div>
    )
}

function OppholdsadresseVariant({ oppholdsadresse }: OppholdsadresseProps): JSX.Element {
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
