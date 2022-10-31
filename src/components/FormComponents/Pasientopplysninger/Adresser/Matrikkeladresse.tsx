import { BodyShort } from '@navikt/ds-react'

import { Matrikkeladresse } from '../../../../graphql/queries/graphql.generated'

type MatrikkeladresseProps = {
    matrikkeladresse: Matrikkeladresse
}

function Matrikkeladresse({ matrikkeladresse }: MatrikkeladresseProps): JSX.Element {
    return (
        <>
            {matrikkeladresse.tilleggsnavn && <BodyShort>{matrikkeladresse.tilleggsnavn}</BodyShort>}
            {matrikkeladresse.bruksenhetsnummer && <BodyShort>{matrikkeladresse.bruksenhetsnummer}</BodyShort>}
            <BodyShort>{`${matrikkeladresse.postnummer} ${matrikkeladresse.poststed}`}</BodyShort>
        </>
    )
}

export default Matrikkeladresse
