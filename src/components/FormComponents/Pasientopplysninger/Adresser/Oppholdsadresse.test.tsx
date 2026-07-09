import { describe, it, expect } from 'vitest'

import { OppholdsadresseFragment } from '../../../../graphql/queries/graphql.generated'
import { render, screen } from '../../../../utils/testUtils'

import Oppholdsadresse from './Oppholdsadresse'

describe('Oppholdsadresse', () => {
    describe('utenlandskAdresse', () => {
        it('should show utenlandskAdresse', async () => {
            const utenlandsadresse: OppholdsadresseFragment = {
                __typename: 'UtenlandskAdresse',
                adressenavnNummer: 'Einimel 80',
                bySted: 'Reykjavik',
                landkode: 'ISL',
                postboksNummerNavn: null,
                postkode: 'IS-107',
            }

            render(<Oppholdsadresse oppholdsadresse={utenlandsadresse} />)

            expect(screen.getByText('Einimel 80')).toBeInTheDocument()
            expect(screen.getByText('IS-107 Reykjavik')).toBeInTheDocument()
            expect(await screen.findByText('Island')).toBeInTheDocument()
        })
    })

    describe('oppholdAnnetSted', () => {
        it('should show the text "På Svaldbard" for oppholdAnnetSted if the value is PAA_SVALBARD', () => {
            const oppholdAnnetSted: OppholdsadresseFragment = {
                __typename: 'OppholdAnnetSted',
                type: 'PAA_SVALBARD',
            }
            render(<Oppholdsadresse oppholdsadresse={oppholdAnnetSted} />)

            expect(screen.getByText('Annet opphold: På Svalbard')).toBeInTheDocument()
        })

        it('should show value if it is other than MILITAER, PENDLER, UTENRIKS and PAA_SVALBARD', () => {
            const oppholdAnnetSted: OppholdsadresseFragment = {
                __typename: 'OppholdAnnetSted',
                type: 'UKJENT',
            }
            render(<Oppholdsadresse oppholdsadresse={oppholdAnnetSted} />)

            expect(screen.getByText('Annet opphold: UKJENT')).toBeInTheDocument()
        })
    })

    it('should show message about missing address if address is unknown type', () => {
        render(<Oppholdsadresse oppholdsadresse={null} />)

        expect(screen.getByText('Oppholdsadresse mangler')).toBeInTheDocument()
    })
})
