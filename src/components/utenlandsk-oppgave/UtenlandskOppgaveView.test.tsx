import { describe, beforeAll, it, expect } from 'vitest'
import mockRouter from 'next-router-mock'
import { GraphQLError } from 'graphql'

import { render, screen, within } from '../../utils/testUtils'
import { createMock } from '../../utils/test/apolloTestUtils'
import { OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
import { createOppgave } from '../../mocks/data/dataCreators'

import UtenlandskOppgaveView from './UtenlandskOppgaveView'

describe('Utenlandsk page', () => {
    beforeAll(() => {
        mockRouter.setCurrentUrl('/oppgave/987654321')
    })

    it('should load form and PDF', async () => {
        const mock = createMock({
            request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
            result: { data: { __typename: 'Query', oppgave: createOppgave({ oppgaveId: '987654321' }) } },
        })
        render(<UtenlandskOppgaveView oppgaveId="987654321" layout={undefined} />, {
            mocks: [mock],
        })

        expect(await screen.findByRole('button', { name: 'Registrer og send' })).toBeInTheDocument()
        // JSDOM doesn't support embeds so we assert on the fallback link
        expect(within(screen.getByTestId('pdf-embed')).getByRole('link')).toHaveAttribute(
            'href',
            '/api/document/987654321/some-doc',
        )
    })

    it('should show error message when it fails to load', async () => {
        const mock = createMock({
            request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
            result: { data: null, errors: [new GraphQLError('Fake test error')] },
        })
        render(<UtenlandskOppgaveView oppgaveId="987654321" layout={undefined} />, {
            mocks: [mock],
        })

        expect(await screen.findByRole('heading', { name: 'En uventet feil oppsto' })).toBeInTheDocument()
    })
})
