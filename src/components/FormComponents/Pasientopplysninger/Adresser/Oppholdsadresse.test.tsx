import { axe } from 'jest-axe';

import { act, render, screen, waitFor } from '../../../../utils/testUtils';
import { OppholdsadresseFragment } from '../../../../graphql/queries/graphql.generated';

import Oppholdsadresse from './Oppholdsadresse';

describe('Oppholdsadresse', () => {
    it('should have no a11y issues and show vegadresse', async () => {
        const adresser: OppholdsadresseFragment = {
            __typename: 'Oppholdsadresse',
            coAdressenavn: null,
            vegadresse: {
                __typename: 'Vegadresse',
                adressenavn: 'Trondheimsveien',
                bruksenhetsnummer: null,
                bydelsnummer: null,
                husbokstav: 'C',
                husnummer: '8',
                kommunenummer: '4321',
                postnummer: '1234',
                poststed: 'Trondheim',
                tilleggsnavn: null,
            },
            matrikkeladresse: null,
            utenlandskAdresse: null,
            oppholdAnnetSted: null,
        };

        const { container } = render(<Oppholdsadresse adresser={adresser} />);

        expect(await axe(container)).toHaveNoViolations();

        expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument();
        expect(screen.getByText('Trondheimsveien 8C')).toBeInTheDocument();
        expect(screen.getByText('1234 Trondheim')).toBeInTheDocument();
    });

    it('should have no a11y issues and show matrikkeladresse', async () => {
        const adresser: OppholdsadresseFragment = {
            __typename: 'Oppholdsadresse',
            coAdressenavn: null,
            vegadresse: null,
            matrikkeladresse: {
                __typename: 'Matrikkeladresse',
                bruksenhetsnummer: 'H0101',
                kommunenummer: '4321',
                postnummer: '1111',
                poststed: 'Bodø',
                tilleggsnavn: 'Bergensergata',
            },
            utenlandskAdresse: null,
            oppholdAnnetSted: null,
        };

        const { container } = render(<Oppholdsadresse adresser={adresser} />);

        expect(await axe(container)).toHaveNoViolations();

        expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument();
        expect(screen.getByText('Bergensergata')).toBeInTheDocument();
        expect(screen.getByText('H0101')).toBeInTheDocument();
        expect(screen.getByText('1111 Bodø')).toBeInTheDocument();
    });

    describe('utenlandskAdresse', () => {
        it('should have no a11y issues for utenlandskAdresse', async () => {
            const adresser: OppholdsadresseFragment = {
                __typename: 'Oppholdsadresse',
                coAdressenavn: null,
                vegadresse: null,
                matrikkeladresse: null,
                utenlandskAdresse: {
                    __typename: 'UtenlandskAdresse',
                    adressenavnNummer: null,
                    bySted: 'Reykjavik',
                    bygningEtasjeLeilighet: null,
                    landkode: 'ISL',
                    postboksNummerNavn: 'Einimel 80',
                    postkode: 'IS-107',
                    regionDistriktOmraade: null,
                },
                oppholdAnnetSted: null,
            };

            const { container } = render(<Oppholdsadresse adresser={adresser} />);

            await act(async () => {
                expect(await axe(container)).toHaveNoViolations();
            });
        });

        it('should show utenlandskAdresse', async () => {
            const adresser: OppholdsadresseFragment = {
                __typename: 'Oppholdsadresse',
                coAdressenavn: null,
                vegadresse: null,
                matrikkeladresse: null,
                utenlandskAdresse: {
                    __typename: 'UtenlandskAdresse',
                    adressenavnNummer: 'Einimel 80',
                    bySted: 'Reykjavik',
                    bygningEtasjeLeilighet: null,
                    landkode: 'ISL',
                    postboksNummerNavn: null,
                    postkode: 'IS-107',
                    regionDistriktOmraade: null,
                },
                oppholdAnnetSted: null,
            };

            render(<Oppholdsadresse adresser={adresser} />);

            act(() => {
                expect(screen.getByText('Laster adresse...')).toBeInTheDocument();
            });

            await waitFor(() => expect(screen.queryByText('Laster adresse...')).not.toBeInTheDocument());

            expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument();
            expect(screen.getByText('Einimel 80')).toBeInTheDocument();
            expect(screen.getByText('IS-107 Reykjavik')).toBeInTheDocument();
            expect(screen.getByText('Island')).toBeInTheDocument();
        });
    });

    describe('oppholdAnnetSted', () => {
        it('should show the text "På Svaldbard" for oppholdAnnetSted if the value is PAA_SVALBARD', () => {
            const adresser: OppholdsadresseFragment = {
                __typename: 'Oppholdsadresse',
                coAdressenavn: null,
                vegadresse: null,
                matrikkeladresse: null,
                utenlandskAdresse: null,
                oppholdAnnetSted: 'PAA_SVALBARD',
            };
            render(<Oppholdsadresse adresser={adresser} />);

            expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument();
            expect(screen.getByText('Annet opphold: På Svalbard')).toBeInTheDocument();
        });

        it('should show value if it is other than MILITAER, PENDLER, UTENRIKS and PAA_SVALBARD', () => {
            const adresser: OppholdsadresseFragment = {
                __typename: 'Oppholdsadresse',
                coAdressenavn: null,
                vegadresse: null,
                matrikkeladresse: null,
                utenlandskAdresse: null,
                oppholdAnnetSted: 'UKJENT',
            };
            render(<Oppholdsadresse adresser={adresser} />);

            expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument();
            expect(screen.getByText('Annet opphold: UKJENT')).toBeInTheDocument();
        });
    });

    it('should show message about missing address if address is unknown type', () => {
        const adresser: OppholdsadresseFragment = {
            __typename: 'Oppholdsadresse',
            coAdressenavn: null,
            vegadresse: null,
            matrikkeladresse: null,
            utenlandskAdresse: null,
            oppholdAnnetSted: null,
        };
        render(<Oppholdsadresse adresser={adresser} />);

        expect(screen.getByRole('heading', { name: 'Oppholdsadresse' })).toBeInTheDocument();
        expect(screen.getByText('Oppholdsadresse mangler')).toBeInTheDocument();
    });
});
