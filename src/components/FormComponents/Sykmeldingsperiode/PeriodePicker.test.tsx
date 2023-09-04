import { describe, it, expect } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

import { render, screen } from '../../../utils/testUtils'

import PeriodePicker from './PeriodePicker'

describe('PeriodePicker', () => {
    const PeriodeSelectComp = (): ReactElement => {
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

        expect(inputFom).toHaveAttribute('value', '12.10.2022')
    })

    it('should type in tom date', async () => {
        render(<PeriodeSelectComp />)

        const inputTom = screen.getByRole('textbox', { name: 'Til' })

        await userEvent.type(inputTom, '20.10.2022')

        expect(inputTom).toHaveAttribute('value', '20.10.2022')
    })
})
