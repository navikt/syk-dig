import { describe, it, vi, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'

import { render, screen, waitFor } from '../../../../utils/testUtils'

import CountryCombobox from './CountryCombobox'

describe('CountryTypeahead', () => {
    it('should have no a11y issues', async () => {
        const mockSelect = vi.fn()
        const { container } = render(
            <CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />,
        )

        await waitForPickerToBeLoaded()
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'Zim')
        await userEvent.click(screen.getByRole('option', { name: 'Zimbabwe' }))

        expect(await axe(container)).toHaveNoViolations()
    })

    it('should search and select a country', async () => {
        const mockSelect = vi.fn()
        render(<CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />)

        await waitForPickerToBeLoaded()
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'Zim')
        await userEvent.click(screen.getByRole('option', { name: 'Zimbabwe' }))

        expect(mockSelect).toHaveBeenCalledWith('ZWE')
    })

    it('should search and select a country with multiple hits', async () => {
        const mockSelect = vi.fn()
        render(<CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />)

        await waitForPickerToBeLoaded()
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'No')
        const results = screen.getAllByRole('option')

        expect(results).toHaveLength(4)
        expect(results[0]).toHaveTextContent('Nord-Korea')
        expect(results[1]).toHaveTextContent('Norge')
        expect(results[2]).toHaveTextContent('Libanon')
        expect(results[3]).toHaveTextContent('San Marino')

        await userEvent.click(results[1])

        expect(mockSelect).toHaveBeenCalledWith('NOR')
    })

    it('should correctly set initial value without invoking onSelect', async () => {
        const mockSelect = vi.fn()
        render(<CountryCombobox onSelect={mockSelect} initialValue="NOR" onChange={() => void 0} />)

        await waitForPickerToBeLoaded()
        await waitFor(() =>
            expect(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' })).toHaveValue('Norge'),
        )
        expect(mockSelect).not.toHaveBeenCalled()
    })

    it('should display no results', async () => {
        const mockSelect = vi.fn()
        render(<CountryCombobox onSelect={mockSelect} initialValue={null} onChange={() => void 0} />)

        await waitForPickerToBeLoaded()
        await userEvent.type(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), 'IkkeEtLand')

        expect(screen.getByText('Ingen treff')).toBeInTheDocument()
        expect(mockSelect).not.toHaveBeenCalled()
    })
})

async function waitForPickerToBeLoaded(): Promise<void> {
    await waitFor(() =>
        expect(screen.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' })).not.toBeDisabled(),
    )
}
