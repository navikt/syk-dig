import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

import { createOppgave } from '../../mocks/data/dataCreators';
import { render, screen, within } from '../../utils/testUtils';
import { SaveOppgaveDocument, SykmeldingUnderArbeidStatus } from '../../graphql/queries/graphql.generated';
import { createMock } from '../../utils/test/apolloTestUtils';

import SykmeldingForm from './SykmeldingForm';

describe('SykmeldingForm', () => {
    beforeAll(() => {
        mockRouter.setCurrentUrl('/utenlandsk/test-oppgave-id');
    });

    it('allow submit when saving draft', async () => {
        const oppgave = createOppgave();
        const expectedRequest = createMock({
            request: {
                query: SaveOppgaveDocument,
                variables: {
                    id: 'test-oppgave-id',
                    values: { fnrPasient: null, skrevetLand: null },
                    status: SykmeldingUnderArbeidStatus.UnderArbeid,
                },
            },
            result: {
                data: { __typename: 'Mutation', lagre: oppgave },
            },
        });

        render(<SykmeldingForm oppgave={oppgave} />, {
            mocks: [expectedRequest],
        });

        await userEvent.click(screen.getByRole('button', { name: 'Fortsett senere' }));

        expect(await screen.findByText(/Oppgaven ble lagret/)).toBeInTheDocument();
    });

    describe('Error summary', () => {
        it('should show validation errors when registering a sykmelding with missing fields', async () => {
            const oppgave = createOppgave();
            render(<SykmeldingForm oppgave={oppgave} />);

            await userEvent.click(screen.getByRole('button', { name: 'Registrere og send' }));

            const errorSection = within(
                await screen.findByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen.',
                }),
            );

            expect(errorSection.getByRole('link', { name: 'Du må fylle inn fødselsnummer.' })).toBeInTheDocument();
            expect(errorSection.getByRole('link', { name: 'Du må velge et land' })).toBeInTheDocument();
            expect(
                errorSection.getByRole('link', { name: 'Du må velge en diagnosekode for hoveddiagnose' }),
            ).toBeInTheDocument();
        });

        it('should show validation errors for all errors, even deep down in the state tree', async () => {
            const oppgave = createOppgave();
            render(<SykmeldingForm oppgave={oppgave} />);

            await userEvent.click(screen.getByRole('button', { name: 'Legg til bidiagnose' }));
            await userEvent.click(screen.getByRole('button', { name: 'Registrere og send' }));

            const errorSection = within(
                await screen.findByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen.',
                }),
            );

            expect(errorSection.getByRole('link', { name: 'Du må fylle inn fødselsnummer.' })).toBeInTheDocument();
            expect(errorSection.getByRole('link', { name: 'Du må fylle inn fra dato.' })).toBeInTheDocument();
            expect(errorSection.getByRole('link', { name: 'Du må fylle inn til dato.' })).toBeInTheDocument();
            expect(
                errorSection.getByRole('link', { name: 'Du må velge en diagnosekode for hoveddiagnose' }),
            ).toBeInTheDocument();
            expect(
                errorSection.getByRole('link', { name: 'Du må velge en diagnosekode for bidiagnose' }),
            ).toBeInTheDocument();
        });
    });
});
