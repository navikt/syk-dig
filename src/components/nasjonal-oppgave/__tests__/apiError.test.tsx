import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../../utils/testUtils'
import { createMock } from '../../../utils/test/apolloTestUtils'
import {
    SaveOppgaveNasjonalDocument,
    Status,
    SykmeldingUnderArbeidStatus,
} from '../../../graphql/queries/graphql.generated'
import NasjonalOppgaveView from '../NasjonalOppgaveView'
import { mockDiagnoseEndpoint } from '../../../utils/test/restTestUtils'
import { createSykmeldingValues } from '../../../mocks/nasjonal/nasjonal-data-creators'

import { oppgaveMock, pasientNavnMock, sykmelderMock } from './testUtils'

describe('Registration api errors', async () => {
    it('Should show list of validation rulehits', async () => {
        mockDiagnoseEndpoint()

        const saveOppgaveMock = createMock({
            request: {
                query: SaveOppgaveNasjonalDocument,
                variables: {
                    oppgaveId: '123456789',
                    sykmeldingValues: createSykmeldingValues(),
                    sykmeldingStatus: SykmeldingUnderArbeidStatus.UnderArbeid,
                    navEnhet: 'B17',
                },
            },
            result: {
                data: {
                    __typename: 'Mutation',
                    lagreNasjonalOppgave: {
                        __typename: 'ValidationResult',
                        validationStatus: Status.Invalid,
                        ruleHits: [
                            {
                                __typename: 'RuleInfo',
                                ruleName: 'RULE_NUMBER_ONE',
                                ruleStatus: Status.Invalid,
                                messageForSender: 'Dont break the rules, please',
                                messageForUser: 'message for user',
                            },
                        ],
                    },
                },
            },
        })

        render(<NasjonalOppgaveView oppgaveId="123456789" layout={undefined} />, {
            mocks: [oppgaveMock, pasientNavnMock, saveOppgaveMock, sykmelderMock],
        })

        expect(await screen.findByText('Nasjonal papirsykmelding')).toBeInTheDocument()
        expect(await screen.findByText(/Feltene stemmer overens/)).toBeInTheDocument()

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen',
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(await screen.findByText(/Baksystemet fant ytterligere feil som må behandles/)).toBeInTheDocument()
        expect(await screen.findByText('Dont break the rules, please')).toBeInTheDocument()
    }, 10_000)
})
