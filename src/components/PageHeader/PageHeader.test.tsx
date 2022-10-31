import userEvent from '@testing-library/user-event'

import { createInitialQuery, render, screen } from '../../utils/testUtils'
import { ModiaContextDocument } from '../../graphql/queries/graphql.generated'

import PageHeader from './PageHeader'

describe('PageHeader', () => {
    it('should render modia details', () => {
        render(<PageHeader />, {
            initialState: [initialModiaQuery],
        })

        expect(screen.getByText('Kari Testson'))
        expect(screen.getByText('Enhet: 2345'))
    })

    it('should change unit', async () => {
        render(<PageHeader />, {
            initialState: [initialModiaQuery],
        })

        expect(screen.getByText('Enhet: 2345'))
        await userEvent.selectOptions(screen.getByRole('combobox'), '1234')

        expect(await screen.findByText('Enhet: 1234'))
    })
})

const initialModiaQuery = createInitialQuery(ModiaContextDocument, {
    __typename: 'Query',
    modia: {
        __typename: 'ModiaContext',
        ident: 'Z999999',
        navn: 'Kari Testson',
        enheter: [
            { __typename: 'ModiaEnhet', navn: 'NAV Test', enhetId: '1234' },
            { __typename: 'ModiaEnhet', navn: 'NAV Fest', enhetId: '2345' },
        ],
        aktivEnhet: '2345',
    },
})
