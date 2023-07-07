import { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { OppholdAnnetFragment } from '../../../../graphql/queries/graphql.generated'

interface Props {
    oppholdAnnet: OppholdAnnetFragment
}

function OppholdAnnet({ oppholdAnnet }: Props): ReactElement {
    return <BodyShort>{`Annet opphold: ${oppholdAnnetTypeToText(oppholdAnnet.type)}`}</BodyShort>
}

type OppholdAnnetType = 'MILITAER' | 'PENDLER' | 'UTENRIKS' | 'PAA_SVALBARD' | string

function oppholdAnnetTypeToText(value: OppholdAnnetType | null | undefined): string | null {
    if (value == null) return null

    switch (value) {
        case 'MILITAER':
            return 'Militær'
        case 'PENDLER':
            return 'Pendler'
        case 'UTENRIKS':
            return 'Utenriks'
        case 'PAA_SVALBARD':
            return 'På Svalbard'
        default:
            return value
    }
}

export default OppholdAnnet
