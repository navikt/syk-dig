import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { apiUrl } from '../smreg/api'
import { server } from '../../../mocks/server'
import { render, screen } from '../../../utils/testUtils'
import NasjonalOppgaveView from '../NasjonalOppgaveView'
import { NasjonalOppgaveByIdDocument, NasjonalOppgaveFragment } from '../../../graphql/queries/graphql.generated'
import { createMock } from '../../../utils/test/apolloTestUtils'

import { emptyNasjonalOppgave } from './testData/dataCreators'

describe('Load pasientinfo', async () => {
    it('Should display error when request fails', async () => {
        server.use(
            http.get(apiUrl('/proxy/pasient'), () => HttpResponse.text('Internal server error', { status: 500 })),
        )

        const nasjonalOppgave: NasjonalOppgaveFragment = emptyNasjonalOppgave({ oppgaveId: '000000000' })
        const mocks = createMock({
            request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: '000000000' } },
            result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgave } },
        })

        render(<NasjonalOppgaveView oppgaveId={nasjonalOppgave.oppgaveId} layout={undefined} />, {
            mocks: [mocks],
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(
            await screen.findByText('En feil oppsto ved henting av pasient info. Ta kontakt dersom feilen vedvarer.'),
        ).toBeInTheDocument()
    })
})
