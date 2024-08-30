import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { PropsWithChildren, ReactElement } from 'react'

import { render, screen } from '../../utils/testUtils'
import { ModiaProvider } from '../../modia/modia-context'

import PageHeader from './PageHeader'

describe('PageHeader', () => {
    it('should render modia details', () => {
        render(
            <TestModiaContext aktivEnhet="2345">
                <PageHeader />
            </TestModiaContext>,
        )

        expect(screen.getByText('Kari Testson'))
        expect(screen.getByText('Enhet: 2345'))
    })

    it('should default to first enhet if no aktiveEnhet from modia', () => {
        render(
            <TestModiaContext aktivEnhet={null}>
                <PageHeader />
            </TestModiaContext>,
        )

        expect(screen.getByText('Kari Testson'))
        expect(screen.getByText('Enhet: 1234'))
    })

    it('should change unit', async () => {
        render(
            <TestModiaContext aktivEnhet="2345">
                <PageHeader />
            </TestModiaContext>,
        )

        expect(screen.getByText('Enhet: 2345'))
        await userEvent.selectOptions(screen.getByRole('combobox'), '1234')

        expect(await screen.findByText('Enhet: 1234'))
    })
})

function TestModiaContext({ children, aktivEnhet }: PropsWithChildren<{ aktivEnhet: string | null }>): ReactElement {
    return (
        <ModiaProvider
            modiaContext={{
                ident: 'Z999999',
                fornavn: 'Kari',
                etternavn: 'Testson',
                enheter: [
                    { navn: 'NAV Test', enhetId: '1234' },
                    { navn: 'NAV Fest', enhetId: '2345' },
                ],
                aktivEnhet,
            }}
        >
            {children}
        </ModiaProvider>
    )
}
