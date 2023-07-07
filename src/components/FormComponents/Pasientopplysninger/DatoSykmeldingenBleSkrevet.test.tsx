import { FormProvider, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'
import { add, format } from 'date-fns/fp'
import * as R from 'remeda'
import { ReactElement } from 'react'

import { render, screen, waitFor } from '../../../utils/testUtils'

import DatoSykmeldingenBleSkrevet from './DatoSykmeldingenBleSkrevet'

describe('DatoSykmeldingenBleSkrevet', () => {
    const DatoSykmeldingenBleSkrevetComp = (): ReactElement => {
        const form = useForm()
        return (
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(() => void 0)}>
                    <DatoSykmeldingenBleSkrevet />
                    <button type="submit">submit test</button>
                </form>
            </FormProvider>
        )
    }

    it('should type in date', async () => {
        render(<DatoSykmeldingenBleSkrevetComp />)

        const dateInput = screen.getByRole('textbox', { name: 'Datoen sykmeldingen ble skrevet' })

        await userEvent.type(dateInput, '02.11.2022')

        await waitFor(() => expect(dateInput).toHaveAttribute('value', '02.11.2022'))
    })

    describe('validation', () => {
        it('should not allow empty input', async () => {
            render(<DatoSykmeldingenBleSkrevetComp />)

            await userEvent.click(screen.getByRole('button', { name: 'submit test' }))

            expect(
                await screen.findByText('Du må fylle inn dato for når sykmeldingen ble skrevet.'),
            ).toBeInTheDocument()
        })

        it('should not allow dates after today', async () => {
            render(<DatoSykmeldingenBleSkrevetComp />)

            await userEvent.type(
                screen.getByRole('textbox', { name: 'Datoen sykmeldingen ble skrevet' }),
                R.pipe(new Date(), add({ days: 1 }), format('dd.MM.yyyy')),
            )
            await userEvent.click(screen.getByRole('button', { name: 'submit test' }))

            expect(
                await screen.findByText('Datoen sykmeldingen ble skrevet kan ikke være i fremtiden.'),
            ).toBeInTheDocument()
        })
    })
})
