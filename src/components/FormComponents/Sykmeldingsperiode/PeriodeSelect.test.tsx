import { FormProvider, useForm } from 'react-hook-form'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../../utils/testUtils'

import PeriodeSelect from './PeriodeSelect'

describe('PeriodeSelect', () => {
    const PeriodeSelectComp = (): JSX.Element => {
        const methods = useForm()
        return (
            <FormProvider {...methods}>
                <PeriodeSelect name={`periode.${0}.sykmeldingstype`} index={0} />
            </FormProvider>
        )
    }

    it('should have no a11y issues', async () => {
        const { container } = render(<PeriodeSelectComp />)

        expect(await axe(container)).toHaveNoViolations()
    })

    it('should have periodetype AKTIVITET_IKKE_MULIG as default', async () => {
        render(<PeriodeSelectComp />)

        const select = screen.getByRole('combobox', { name: 'Periode 1' })
        const options = screen.getAllByRole('option')

        expect(options).toHaveLength(2)
        expect(select).toHaveValue('AKTIVITET_IKKE_MULIG')
    })

    it('should select periodetype GRADERT', async () => {
        render(<PeriodeSelectComp />)

        const select = screen.getByRole('combobox', { name: 'Periode 1' })
        const options = screen.getAllByRole('option')

        expect(options).toHaveLength(2)
        await userEvent.selectOptions(screen.getByRole('combobox'), 'Gradert sykmelding')

        expect(select).toHaveValue('GRADERT')
    })
})
