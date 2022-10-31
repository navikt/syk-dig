import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../../../utils/testUtils'

import DatoSykmeldingenBleSkrevet from './DatoSykmeldingenBleSkrevet'

describe('DatoSykmeldingenBleSkrevet', () => {
    const DatoSykmeldingenBleSkrevetComp = (): JSX.Element => {
        const methods = useForm()
        return (
            <FormProvider {...methods}>
                <DatoSykmeldingenBleSkrevet />
            </FormProvider>
        )
    }

    it('should type in date', async () => {
        render(<DatoSykmeldingenBleSkrevetComp />)

        const dateInput = screen.getByRole('textbox', { name: 'Datoen sykmeldingen ble skrevet' })

        await userEvent.type(dateInput, '02.11.2022')

        await waitFor(() => expect(dateInput).toHaveAttribute('value', '02.11.2022'))
    })

    it('should empty date input fields when Nullstill dato is clicked', async () => {
        render(<DatoSykmeldingenBleSkrevetComp />)

        const dateInput = screen.getByRole('textbox', { name: 'Datoen sykmeldingen ble skrevet' })
        const resetButton = screen.getByRole('button', { name: 'Nullstill dato' })

        await userEvent.type(dateInput, '09.12.2022')

        await waitFor(() => expect(dateInput).toHaveAttribute('value', '09.12.2022'))

        await userEvent.click(resetButton)

        await waitFor(() => expect(dateInput).toHaveAttribute('value', ''))
    })
})
