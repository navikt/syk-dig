import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../../utils/testUtils';

import DiagnoseTypeahead from './DiagnoseTypeahead';

describe('DiagnosePicker', () => {
    it('should search and select value when seaching for specific code', async () => {
        const onSelectMock = jest.fn();
        render(<DiagnoseTypeahead system="ICD10" onSelect={onSelectMock} />);

        const combobox = screen.getByRole('combobox', { name: 'Søk i ICD10 diagnoser' });
        await userEvent.type(combobox, 'L815');
        await userEvent.click(await screen.findByRole('option', { name: 'L815' }));

        expect(combobox).toHaveValue('L815');
        expect(onSelectMock).toHaveBeenCalledWith({ code: 'L815', text: 'Leukodermi, ikke klassifisert annet sted' });
    });

    it('should inform that code does not exist', async () => {
        const onSelectMock = jest.fn();
        render(<DiagnoseTypeahead system="ICD10" onSelect={onSelectMock} />);

        const combobox = screen.getByRole('combobox', { name: 'Søk i ICD10 diagnoser' });
        await userEvent.type(combobox, 'XYZ');

        expect(onSelectMock).not.toHaveBeenCalled();
        expect(screen.getByText('Fant ingen diagnose med kode eller beskrivelse "XYZ"')).toBeInTheDocument();
    });
});
