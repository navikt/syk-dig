import { BodyShort } from '@navikt/ds-react'
import { ReactElement } from 'react'

import type { Matrikkeladresse } from '../../../../graphql/queries/graphql.generated'

type MatrikkeladresseProps = {
    matrikkeladresse: Matrikkeladresse
}

function Matrikkeladresse({ matrikkeladresse }: MatrikkeladresseProps): ReactElement {
    return (
        <>
            {matrikkeladresse.tilleggsnavn && <BodyShort>{matrikkeladresse.tilleggsnavn}</BodyShort>}
            {matrikkeladresse.bruksenhetsnummer && <BodyShort>{matrikkeladresse.bruksenhetsnummer}</BodyShort>}
            <BodyShort>{`${matrikkeladresse.postnummer} ${matrikkeladresse.poststed}`}</BodyShort>
        </>
    )
}

export default Matrikkeladresse
