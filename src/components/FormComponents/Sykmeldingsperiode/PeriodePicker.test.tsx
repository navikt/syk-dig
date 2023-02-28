import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../../../utils/testUtils'

import PeriodePicker from './PeriodePicker'

describe('PeriodePicker', () => {
    const PeriodeSelectComp = (): JSX.Element => {
        const methods = useForm()
        return (
            <FormProvider {...methods}>
                <PeriodePicker index={0} name="periode.0.range" />
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
})
