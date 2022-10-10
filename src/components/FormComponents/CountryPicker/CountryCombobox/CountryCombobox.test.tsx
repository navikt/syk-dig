import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { waitFor } from '@testing-library/dom';

import { render, screen } from '../../../../utils/testUtils';

import CountryCombobox from './CountryCombobox';

describe('CountryTypeahead', () => {
    it('should have no a11y issues', async () => {
        const mockSelect = jest.fn();
        const { container } = render(
            <CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />,
        );

        await waitForPickerToBeLoaded();
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'Zim');
        await userEvent.click(await screen.findByRole('option', { name: 'Zimbabwe' }));

        expect(await axe(container)).toHaveNoViolations();
    });

    it('should search and select a country', async () => {
        const mockSelect = jest.fn();
        render(<CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />);

        await waitForPickerToBeLoaded();
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'Zim');
        await userEvent.click(await screen.findByRole('option', { name: 'Zimbabwe' }));

        expect(mockSelect).toHaveBeenCalledWith('ZW');
    });

    it('should search and select a country with multiple hits', async () => {
        const mockSelect = jest.fn();
        render(<CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />);

        await waitForPickerToBeLoaded();
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'No');
        const results = await screen.findAllByRole('option');

        expect(results).toHaveLength(4);
        expect(results[0]).toHaveTextContent('Nord-Korea');
        expect(results[1]).toHaveTextContent('Norge');
        expect(results[2]).toHaveTextContent('Libanon');
        expect(results[3]).toHaveTextContent('San Marino');

        await userEvent.click(results[1]);

        expect(mockSelect).toHaveBeenCalledWith('NO');
    });

    it('should correctly set initial value without invoking onSelect', async () => {
        const mockSelect = jest.fn();
        render(<CountryCombobox onSelect={mockSelect} initialValue={'NO'} onChange={() => void 0} />);

        await waitForPickerToBeLoaded();
        await waitFor(() =>
            expect(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' })).toHaveValue('Norge'),
        );
        expect(mockSelect).not.toHaveBeenCalled();
    });

    it('should display no results', async () => {
        const mockSelect = jest.fn();
        render(<CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />);

        await waitForPickerToBeLoaded();
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'IkkeEtLand');

        expect(screen.getByText('Ingen treff')).toBeInTheDocument();
        expect(mockSelect).not.toHaveBeenCalled();
    });
});

async function waitForPickerToBeLoaded(): Promise<void> {
    await waitFor(() =>
        expect(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' })).not.toBeDisabled(),
    );
}
