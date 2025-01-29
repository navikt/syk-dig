import {describe, it, expect, beforeEach} from 'vitest'
import userEvent from '@testing-library/user-event'

import {createMock, render, screen} from '../../../utils/testUtils'
import {
    mockBehandlerinfo,
    mockPasientinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'
import {

    NasjonalOppgaveByIdDocument,
} from "../../../graphql/queries/graphql.generated";
import React from "react";
import {MockedProvider} from "@apollo/client/testing";

describe('Registration api errors', async () => {
    let mocks: any[]
    let testOppgaveId: string
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
        testOppgaveId = '12345'
        mocks = [
            {
                request: {
                    query: NasjonalOppgaveByIdDocument,
                    variables: {oppgaveId: testOppgaveId},
                },
                result: {
                    data: {
                        __typename: 'Query',
                        nasjonalOppgave:
                            {
                                __typename: 'NasjonalOppgave',
                                oppgaveId: testOppgaveId,
                                documents: [],
                                nasjonalSykmelding: {
                                    __typename: 'NasjonalSykmelding',
                                    sykmeldingId: '456',
                                    fnr: null,
                                    journalpostId: '123',
                                    datoOpprettet: null,
                                    syketilfelleStartDato: null,
                                    behandletTidspunkt: null,
                                    skjermesForPasient: null,
                                    meldingTilArbeidsgiver: null,
                                    arbeidsgiver: null,
                                    behandler: null,
                                    perioder: [],
                                    meldingTilNAV: null,
                                    medisinskVurdering: null,
                                    kontaktMedPasient: null,
                                }
                            }
                    },
                },
            },
        ];
    })

    it('Should show received body error message when status code is 400', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={true}
            >
                <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                    oppgaveId={`${testOppgaveId}`}
                />
            </MockedProvider>
        )

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen'
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.'),
        ).toBeInTheDocument()
    }, 10_000)

    it('Should show generic error message when status code is 500', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={true}
            >
                <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                    oppgaveId={`${testOppgaveId}`}
                />
            </MockedProvider>
        )

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen'
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.'),
        ).toBeInTheDocument()
    })

    it('Should show list of validation rulehits when content-type is application/json and status code is 400', async () => {
        mocks = [
            createMock({
                request: {
                    query: NasjonalOppgaveByIdDocument,
                    variables: {
                        oppgaveId: testOppgaveId
                    },
                },
                result: {
                    data: {
                    ruleHits: [
                        {
                            ruleName: 'RULE_NUMBER_ONE',
                            ruleStatus: 'INVALID',
                            messageForSender: 'Dont break the rules, please',
                            messageForUser: 'message for user',
                        },
                    ],
                }},
            }),
        ];

        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={
                true
            }>
                <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                    oppgaveId={
                        `${testOppgaveId}`
                    }
                />
            </MockedProvider>,
            {
                useRestLink: true,
            },
        )

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {
            name: 'Registrer sykmeldingen'
        })
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(await screen.findByText(/Baksystemet fant ytterligere feil som må behandles/)).toBeInTheDocument()
        expect(await screen.findByText('Dont break the rules, please')).toBeInTheDocument()
    })
})
