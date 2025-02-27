import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { render, screen } from '../../../utils/testUtils'
import { createMock } from '../../../utils/test/apolloTestUtils'
import { NasjonalOppgaveByIdDocument, NasjonalOppgaveFragment } from '../../../graphql/queries/graphql.generated'
import { server } from '../../../mocks/server'
import { apiUrl } from '../smreg/api'
import NasjonalOppgaveView from '../NasjonalOppgaveView'

import { mockBehandlerinfo, mockPasientinfo } from './smregTestUtils'
import { createNasjonalOppgave } from './testData/dataCreators'

//TODO: fix tests
describe('Registration api errors', async () => {
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })

    const nasjonalOppgave: NasjonalOppgaveFragment = createNasjonalOppgave({ oppgaveId: '123456789' })
    const mocks = createMock({
        request: { query: NasjonalOppgaveByIdDocument, variables: { oppgaveId: '123456789' } },
        result: { data: { __typename: 'Query', nasjonalOppgave: nasjonalOppgave } },
    })

    it.skip('Should show received body error message when status code is 400', async () => {
        server.use(
            http.post(apiUrl(`/proxy/oppgave/123456789/send`), () =>
                HttpResponse.text('This is an error', { status: 400 }),
            ),
        )

        render(<NasjonalOppgaveView oppgaveId={nasjonalOppgave.oppgaveId} layout={undefined} />, {
            mocks: [mocks],
        })

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen',
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.'),
        ).toBeInTheDocument()
    }, 10_000)

    it.skip('Should show generic error message when status code is 500', async () => {
        server.use(
            http.post(apiUrl(`/proxy/oppgave/123456789/send`), () =>
                HttpResponse.text('This is an error', { status: 400 }),
            ),
        )

        render(<NasjonalOppgaveView oppgaveId={nasjonalOppgave.oppgaveId} layout={undefined} />, {
            mocks: [mocks],
        })

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen',
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.'),
        ).toBeInTheDocument()
    })

    it.skip('Should show list of validation rulehits when content-type is application/json and status code is 400', async () => {
        server.use(
            http.post(apiUrl(`/proxy/oppgave/123456789/send`), () =>
                HttpResponse.json(
                    {
                        status: 'INVALID',
                        ruleHits: [
                            {
                                ruleName: 'RULE_NUMBER_ONE',
                                ruleStatus: 'INVALID',
                                messageForSender: 'Dont break the rules, please',
                                messageForUser: 'message for user',
                            },
                        ],
                    },
                    { status: 400 },
                ),
            ),
        )

        render(<NasjonalOppgaveView oppgaveId={nasjonalOppgave.oppgaveId} layout={undefined} />, {
            mocks: [mocks],
        })

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen',
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(await screen.findByText(/Baksystemet fant ytterligere feil som må behandles/)).toBeInTheDocument()
        expect(await screen.findByText('Dont break the rules, please')).toBeInTheDocument()
    })
})
