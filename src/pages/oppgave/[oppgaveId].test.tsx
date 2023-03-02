/* eslint-disable testing-library/no-node-access */
import mockRouter from 'next-router-mock'
import { GraphQLError } from 'graphql'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../utils/testUtils'
import { createMock } from '../../utils/test/apolloTestUtils'
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
import { createOppgave } from '../../mocks/data/dataCreators'

import Utenlandsk from './[oppgaveId].page'

describe('Utenlandsk page', () => {
    beforeAll(() => {
        mockRouter.setCurrentUrl('/oppgave/987654321')
    })

    it('should load form and PDF', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
                    result: { data: { __typename: 'Query', oppgave: createOppgave({ oppgaveId: '987654321' }) } },
                }),
            ],
        })

        expect(await screen.findByRole('button', { name: 'Registrer og send' })).toBeInTheDocument()
        expect(screen.getByTestId('pdf-embed').firstChild).toHaveAttribute('src', '/api/document/987654321/some-doc')
    })

    it('should load the second document when second tab is clicked', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
                    result: { data: { __typename: 'Query', oppgave: createOppgave({ oppgaveId: '987654321' }) } },
                }),
            ],
        })

        expect(await screen.findByRole('button', { name: 'Registrer og send' })).toBeInTheDocument()
        expect(screen.getByTestId('pdf-embed').firstChild).toHaveAttribute('src', '/api/document/987654321/some-doc')
        await userEvent.click(screen.getByRole('tab', { name: 'more-doc.pdf' }))
        expect(screen.getByTestId('pdf-embed').firstChild).toHaveAttribute(
            'src',
            '/api/document/987654321/more-doc.pdf',
        )
    })

    it('should show error message when it fails to load', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
                    result: { data: null, errors: [new GraphQLError('Fake test error')] },
                }),
            ],
        })

        expect(await screen.findByText('Klarte ikke å laste oppgave med oppgave-id 987654321'))
    })
})
