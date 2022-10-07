import { FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from '../../../utils/testUtils';

import PeriodePicker from './PeriodePicker';

describe('PeriodePicker', () => {
    const PeriodeSelectComp = (): JSX.Element => {
        const methods = useForm();
        return (
            <FormProvider {...methods}>
                <PeriodePicker index={0} />
            </FormProvider>
        );
    };

    it('should type in fom date', async () => {
        render(<PeriodeSelectComp />);

        const inputFom = screen.getByRole('textbox', { name: 'Fra' });
        expect(inputFom).toBeInTheDocument();

        await userEvent.type(inputFom, '12.10.2022');

        await waitFor(() => expect(inputFom).toHaveAttribute('value', '12.10.2022'));
    });

    it('should type in tom date', async () => {
        render(<PeriodeSelectComp />);

        const inputTom = screen.getByRole('textbox', { name: 'Til' });
        expect(inputTom).toBeInTheDocument();

        await userEvent.type(inputTom, '20.10.2022');

        await waitFor(() => expect(inputTom).toHaveAttribute('value', '20.10.2022'));
    });

    it('should reset fom and tom input fields when Nullstill dato is clicked', async () => {
        render(<PeriodeSelectComp />);

        const inputTom = screen.getByRole('textbox', { name: 'Til' });
        const inputFom = screen.getByRole('textbox', { name: 'Fra' });
        const resetButton = screen.getByRole('button', { name: 'Nullstill dato' });

        await userEvent.type(inputFom, '03.08.2022');
        await userEvent.type(inputTom, '03.08.2022');

        await waitFor(() => expect(inputFom).toHaveAttribute('value', '03.08.2022'));
        await waitFor(() => expect(inputTom).toHaveAttribute('value', '03.08.2022'));

        await userEvent.click(resetButton);

        await waitFor(() => expect(inputFom).toHaveAttribute('value', ''));
        await waitFor(() => expect(inputTom).toHaveAttribute('value', ''));
    });
});
