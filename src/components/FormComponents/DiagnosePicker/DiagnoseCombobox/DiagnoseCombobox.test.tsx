import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'

import { render, screen } from '../../../../utils/testUtils'

import DiagnoseCombobox from './DiagnoseCombobox'

describe('DiagnosePicker', () => {
    it('should have no a11y issues', async () => {
        const onSelectMock = jest.fn()
        const { container } = render(
            <DiagnoseCombobox
                name="diagnoser.hoveddiagnose"
                system="ICD10"
                onSelect={onSelectMock}
                onChange={() => void 0}
                initialValue={null}
            />,
        )

        const combobox = screen.getByRole('combobox', { name: 'Diagnosekode' })
        await userEvent.type(combobox, 'L81')
        await userEvent.click(await screen.findByRole('option', { name: 'L815' }))

        expect(await axe(container)).toHaveNoViolations()
    })

    it('should search and select value when seaching for specific code', async () => {
        const onSelectMock = jest.fn()
        render(
            <DiagnoseCombobox
                name="diagnoser.hoveddiagnose"
                system="ICD10"
                onSelect={onSelectMock}
                onChange={() => void 0}
                initialValue={null}
            />,
        )

        const combobox = screen.getByRole('combobox', { name: 'Diagnosekode' })
        await userEvent.type(combobox, 'L81')
        await userEvent.click(await screen.findByRole('option', { name: 'L815' }))

        expect(combobox).toHaveLabel
        expect(combobox).toHaveValue('L815')
        expect(onSelectMock).toHaveBeenCalledWith({
            code: 'L815',
            text: 'Leukodermi, ikke klassifisert annet sted',
        })
    })

    it('should inform that code does not exist', async () => {
        const onSelectMock = jest.fn()
        render(
            <DiagnoseCombobox
                name="diagnoser.hoveddiagnose"
                system="ICD10"
                onSelect={onSelectMock}
                onChange={() => void 0}
                initialValue={null}
            />,
        )

        const combobox = screen.getByRole('combobox', { name: 'Diagnosekode' })
        await userEvent.type(combobox, 'XYZ')

        expect(onSelectMock).not.toHaveBeenCalled()
        expect(screen.getByText('Fant ingen diagnose med kode eller beskrivelse "XYZ"')).toBeInTheDocument()
    })
})
