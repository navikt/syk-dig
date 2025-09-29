import { describe, it, vi, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { http, HttpResponse } from 'msw'

import { render, screen } from '../../../../utils/testUtils'
import { server } from '../../../../mocks/server'
import { searchSystem } from '../../../../app/api/diagnose/search-system'

import DiagnoseCombobox from './DiagnoseCombobox'
import { DiagnoseSystem } from './types'

describe('DiagnosePicker', () => {
    beforeEach(() => {
        server.use(
            http.get(
                '/api/diagnose',
                async ({ request }) => {
                    const url = new URL(request.url)
                    const system = url.searchParams.get('system')?.toLowerCase() as Lowercase<DiagnoseSystem>
                    const value = url.searchParams.get('value') as string

                    return HttpResponse.json({ suggestions: searchSystem(system, value) }, { status: 200 })
                },
                { once: false },
            ),
        )
    })

    it('should have no a11y issues', async () => {
        const onSelectMock = vi.fn()
        const { container } = render(
            <DiagnoseCombobox
                name="diagnoser.hoveddiagnose"
                system="ICD10"
                label="Diagnosekode"
                onSelect={onSelectMock}
                onChange={() => void 0}
                value={null}
            />,
        )

        const combobox = screen.getByRole('combobox', { name: 'Diagnosekode' })
        await userEvent.type(combobox, 'L81')
        await userEvent.click(screen.getByRole('option', { name: /L815/ }))

        expect(await axe(container)).toHaveNoViolations()
    }, 10000)

    it('should search and select value when seaching for specific code', async () => {
        const onSelectMock = vi.fn()
        render(
            <DiagnoseCombobox
                name="diagnoser.hoveddiagnose"
                system="ICD10"
                label="Diagnosekode"
                onSelect={onSelectMock}
                onChange={() => void 0}
                value={null}
            />,
        )

        const combobox = screen.getByRole('combobox', { name: 'Diagnosekode' })
        await userEvent.type(combobox, 'L81')
        await userEvent.click(screen.getByRole('option', { name: /L815/ }))

        expect(combobox).toHaveValue('L815')
        expect(onSelectMock).toHaveBeenCalledWith({
            code: 'L815',
            text: 'Leukodermi, ikke klassifisert annet sted',
        })
    })

    it('should inform that code does not exist', async () => {
        const onSelectMock = vi.fn()
        render(
            <DiagnoseCombobox
                name="diagnoser.hoveddiagnose"
                system="ICD10"
                label="Diagnosekode"
                onSelect={onSelectMock}
                onChange={() => void 0}
                value={null}
            />,
        )

        const combobox = screen.getByRole('combobox', { name: 'Diagnosekode' })
        await userEvent.type(combobox, 'XYZ')

        expect(onSelectMock).not.toHaveBeenCalled()
        expect(screen.getByText('Fant ingen diagnose med kode eller beskrivelse "XYZ"')).toBeInTheDocument()
    })
})
