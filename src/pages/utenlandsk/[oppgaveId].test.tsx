import mockRouter from 'next-router-mock'
import { GraphQLError } from 'graphql'

import { render, screen } from '../../utils/testUtils'
import { createMock } from '../../utils/test/apolloTestUtils'
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
import { createOppgave } from '../../mocks/data/dataCreators'

import Utenlandsk from './[oppgaveId].page'

describe('Utenlandsk page', () => {
    beforeAll(() => {
        mockRouter.setCurrentUrl('/utenlandsk/123')
    })

    it('should load form and PDF', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '123' } },
                    result: { data: { __typename: 'Query', oppgave: createOppgave() } },
                }),
            ],
        })

        expect(await screen.findByRole('button', { name: 'Registrere og send' })).toBeInTheDocument()
        expect(screen.getByTestId('pdf-embed').firstChild).toHaveAttribute('src', '/api/pdf?oppgaveId=123')
    })

    it('should show error message when it fails to load', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '123' } },
                    result: { data: null, errors: [new GraphQLError('Fake test error')] },
                }),
            ],
        })

        expect(await screen.findByText('Klarte ikke å laste oppgave med oppgave-id 123'))
    })
})
