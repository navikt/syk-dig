import { axe } from 'jest-axe'

import { act, render, screen, waitFor } from '../../../../utils/testUtils'
import { OppholdsadresseFragment } from '../../../../graphql/queries/graphql.generated'

import Oppholdsadresse from './Oppholdsadresse'

describe('Oppholdsadresse', () => {
    it('should have no a11y issues and show vegadresse', async () => {
        const vegadresse: OppholdsadresseFragment = {
            __typename: 'Vegadresse',
            adressenavn: 'Trondheimsveien',
            husbokstav: 'C',
            husnummer: '8',
            postnummer: '1234',
            poststed: 'Trondheim',
        }

        const { container } = render(<Oppholdsadresse oppholdsadresse={vegadresse} />)

        expect(await axe(container)).toHaveNoViolations()

        expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument()
        expect(screen.getByText('Trondheimsveien 8C')).toBeInTheDocument()
        expect(screen.getByText('1234 Trondheim')).toBeInTheDocument()
    })

    it('should have no a11y issues and show matrikkeladresse', async () => {
        const matrikkeladresse: OppholdsadresseFragment = {
            __typename: 'Matrikkeladresse',
            bruksenhetsnummer: 'H0101',
            postnummer: '1111',
            poststed: 'Bodø',
            tilleggsnavn: 'Bergensergata',
        }

        const { container } = render(<Oppholdsadresse oppholdsadresse={matrikkeladresse} />)

        expect(await axe(container)).toHaveNoViolations()

        expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument()
        expect(screen.getByText('Bergensergata')).toBeInTheDocument()
        expect(screen.getByText('H0101')).toBeInTheDocument()
        expect(screen.getByText('1111 Bodø')).toBeInTheDocument()
    })

    describe('utenlandskAdresse', () => {
        it('should have no a11y issues for utenlandskAdresse', async () => {
            const utenlandskadresse: OppholdsadresseFragment = {
                __typename: 'UtenlandskAdresse',
                adressenavnNummer: null,
                bySted: 'Reykjavik',
                landkode: 'ISL',
                postboksNummerNavn: 'Einimel 80',
                postkode: 'IS-107',
            }

            const { container } = render(<Oppholdsadresse oppholdsadresse={utenlandskadresse} />)

            await act(async () => {
                expect(await axe(container)).toHaveNoViolations()
            })
        })

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

            act(() => {
                expect(screen.getByText('Laster adresse...')).toBeInTheDocument()
            })

            await waitFor(() => expect(screen.queryByText('Laster adresse...')).not.toBeInTheDocument())

            expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument()
            expect(screen.getByText('Einimel 80')).toBeInTheDocument()
            expect(screen.getByText('IS-107 Reykjavik')).toBeInTheDocument()
            expect(screen.getByText('Island')).toBeInTheDocument()
        })
    })

    describe('oppholdAnnetSted', () => {
        it('should show the text "På Svaldbard" for oppholdAnnetSted if the value is PAA_SVALBARD', () => {
            const oppholdAnnetSted: OppholdsadresseFragment = {
                __typename: 'OppholdAnnetSted',
                type: 'PAA_SVALBARD',
            }
            render(<Oppholdsadresse oppholdsadresse={oppholdAnnetSted} />)

            expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument()
            expect(screen.getByText('Annet opphold: På Svalbard')).toBeInTheDocument()
        })

        it('should show value if it is other than MILITAER, PENDLER, UTENRIKS and PAA_SVALBARD', () => {
            const oppholdAnnetSted: OppholdsadresseFragment = {
                __typename: 'OppholdAnnetSted',
                type: 'UKJENT',
            }
            render(<Oppholdsadresse oppholdsadresse={oppholdAnnetSted} />)

            expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument()
            expect(screen.getByText('Annet opphold: UKJENT')).toBeInTheDocument()
        })
    })

    it('should show message about missing address if address is unknown type', () => {
        render(<Oppholdsadresse oppholdsadresse={null} />)

        expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument()
        expect(screen.getByText('Oppholdsadresse mangler')).toBeInTheDocument()
    })
})
