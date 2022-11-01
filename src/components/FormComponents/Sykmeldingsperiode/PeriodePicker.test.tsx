import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../../../utils/testUtils'

import PeriodePicker from './PeriodePicker'

describe('PeriodePicker', () => {
    const PeriodeSelectComp = (): JSX.Element => {
        const methods = useForm()

        const values = methods.watch('periode.0.range')

        return (
            <FormProvider {...methods}>
                <PeriodePicker name="periode.0.range" />
                <div data-testid="debug-values">{JSON.stringify(values)}</div>
            </FormProvider>
        )
    }

    it('should type in fom date', async () => {
        render(<PeriodeSelectComp />)

        const inputFom = screen.getByRole('textbox', { name: 'Fra' })

        await userEvent.type(inputFom, '12.10.2022')

        await waitFor(() => expect(inputFom).toHaveAttribute('value', '12.10.2022'))
    })

    it('should type in tom date', async () => {
        render(<PeriodeSelectComp />)

        const inputTom = screen.getByRole('textbox', { name: 'Til' })

        await userEvent.type(inputTom, '20.10.2022')

        await waitFor(() => expect(inputTom).toHaveAttribute('value', '20.10.2022'))
    })

    it('should empty fom and tom input fields when Nullstill dato is clicked', async () => {
        render(<PeriodeSelectComp />)

        const inputTom = screen.getByRole('textbox', { name: 'Til' })
        const inputFom = screen.getByRole('textbox', { name: 'Fra' })
        const resetButton = screen.getByRole('button', { name: 'Nullstill dato' })

        console.log('Before typning fom')
        await userEvent.type(inputFom, '03.08.2022')
        console.log('After typning fom')
        console.log('Before typning tom')
        await userEvent.type(inputTom, '03.08.2022')
        console.log('After typning fom')

        await waitFor(() => expect(inputFom).toHaveAttribute('value', '03.08.2022'))
        await waitFor(() => expect(inputTom).toHaveAttribute('value', '03.08.2022'))
        expect(screen.getByTestId('debug-values')).toHaveTextContent(
            '{"fom":"2022-08-02T00:00:00.000Z","tom":"2022-08-02T22:00:00.000Z"}',
        )

        await userEvent.click(resetButton)

        await waitFor(() => expect(inputFom).toHaveAttribute('value', ''))
        await waitFor(() => expect(inputTom).toHaveAttribute('value', ''))
    })
})
