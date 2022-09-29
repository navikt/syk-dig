import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { render, screen } from '../../../../utils/testUtils';

import CountryTypeahead from './CountryTypeahead';

describe('CountryTypeahead', () => {
    it('should have no a11y issues', async () => {
        const mockSelect = jest.fn();
        const { container } = render(<CountryTypeahead onSelect={mockSelect} />);

        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'Zim');
        await userEvent.click(await screen.findByRole('option', { name: /Zim(.*)babwe, ZW/ }));

        expect(await axe(container)).toHaveNoViolations();
    });

    it('should search and select a country', async () => {
        const mockSelect = jest.fn();
        render(<CountryTypeahead onSelect={mockSelect} />);

        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'Zim');
        await userEvent.click(await screen.findByRole('option', { name: /Zim(.*)babwe, ZW/ }));

        expect(mockSelect).toHaveBeenCalledWith('ZW');
    });

    it('should search and select a country with multiple hits', async () => {
        const mockSelect = jest.fn();
        render(<CountryTypeahead onSelect={mockSelect} />);

        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'No');
        const results = await screen.findAllByRole('option');

        expect(results).toHaveLength(4);
        expect(results[0]).toHaveTextContent(/Libanon, LB/);
        expect(results[1]).toHaveTextContent(/Nord-Korea, KP/);
        expect(results[2]).toHaveTextContent(/Norge, NO/);
        expect(results[3]).toHaveTextContent(/San Marino, SM/);

        await userEvent.click(results[1]);

        expect(mockSelect).toHaveBeenCalledWith('KP');
    });

    it('should display no results', async () => {
        const mockSelect = jest.fn();
        render(<CountryTypeahead onSelect={mockSelect} />);

        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'IkkeEtLand');

        expect(screen.getByText('Ingen treff')).toBeInTheDocument();
        expect(mockSelect).not.toHaveBeenCalled();
    });
});
