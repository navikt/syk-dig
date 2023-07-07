import { BodyShort } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { Vegadresse } from '../../../../graphql/queries/graphql.generated'

type VegadresseProps = {
    vegadresse: Vegadresse
}

function Vegadresse({ vegadresse }: VegadresseProps): ReactElement {
    return (
        <>
            {vegadresse.adressenavn && (
                <BodyShort>{`${vegadresse.adressenavn} ${vegadresse.husnummer ?? ''}${
                    vegadresse.husbokstav ?? ''
                }`}</BodyShort>
            )}
            <BodyShort>{`${vegadresse.postnummer} ${vegadresse.poststed}`}</BodyShort>
        </>
    )
}

export default Vegadresse
