import {describe, it, expect, beforeEach} from 'vitest'
import userEvent from '@testing-library/user-event'
import {graphql, http, HttpResponse} from 'msw'

import {createMock, render, screen} from '../../../utils/testUtils'
import {server} from '../../../mocks/server'
import {apiUrl} from '../smreg/api'
import mockSykmelder from '../mock/sykmelder.json'

import fullOppgave from './testData/fullOppgave.json'
import {
    mockBehandlerinfo,
    mockPasientinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'
import {
    NasjonalOppgaveByIdDocument, NasjonalOppgaveStatusEnum
} from "../../../graphql/queries/graphql.generated";
import React from "react";
import {MockedProvider} from "@apollo/client/testing";
import {InMemoryCache} from "@apollo/client";

describe('Registration api errors', async () => {
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
    })


    it('Should show received body error message when status code is 400', async () => {
        const mocks = [
            createMock({
                request: {
                    query: NasjonalOppgaveByIdDocument,
                    variables: { oppgaveId: '12345'},
                },
                result: {
                    data: {
                        __typename: 'Query',
                        nasjonalOppgave:
                            {
                                __typename: "NasjonalOppgave",
                                oppgaveId: "12345",
                                documents: [{
                                    __typename: 'Document',
                                    dokumentInfoId: "ex-doc-1",
                                    tittel: "Papirsykmelding"
                                }],
                                nasjonalSykmelding: {
                                    __typename: 'NasjonalSykmelding',
                                    sykmeldingId: null,
                                    fnr: null,
                                    journalpostId: "123",
                                    datoOpprettet: null,
                                    syketilfelleStartDato: null,
                                    behandletTidspunkt: null,
                                    skjermesForPasient: null,
                                    meldingTilArbeidsgiver: null,
                                    arbeidsgiver: null,
                                    behandler: null,
                                    perioder: [{
                                        __typename: 'Periode',
                                        fom: '2020-01-01',
                                        tom: '2020-01-15',
                                    }],
                                    meldingTilNAV: null,
                                    kontaktMedPasient: null,
                                }
                            }
                    },
                },
            }),
        ];
        console.log(JSON.stringify(mocks, null, 2));
        console.log("NS:" + JSON.stringify(NasjonalOppgaveByIdDocument, null, 2));
        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={true} cache={new InMemoryCache()}>
                <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                    oppgaveId={`${fullOppgave.nasjonalOppgave.oppgaveId}`}
                />
            </MockedProvider>,
            {
                useRestLink: true,
            },
        )

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {name: 'Registrer sykmeldingen'})
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.'),
        ).toBeInTheDocument()
    }, 10_000)

    it.skip('Should show generic error message when status code is 500', async () => {
        server.use(
            http.get(apiUrl(`/proxy/sykmelder/${fullOppgave.papirSmRegistering.behandler.hpr}`), () =>
                HttpResponse.json(mockSykmelder),
            ),
            http.get(apiUrl(`/proxy/oppgave/${fullOppgave.oppgaveid}`), () => HttpResponse.json(fullOppgave)),
            http.post(apiUrl(`/proxy/oppgave/${fullOppgave.oppgaveid}/send`), () =>
                HttpResponse.text('This is an error', {status: 500}),
            ),
        )

        render(
            <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                oppgaveId={`${fullOppgave.oppgaveid}`}
            />,
            {
                useRestLink: true,
            },
        )

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {name: 'Registrer sykmeldingen'})
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(
            await screen.findByText('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.'),
        ).toBeInTheDocument()
    })

    it.skip('Should show list of validation rulehits when content-type is application/json and status code is 400', async () => {
        server.use(
            http.get(apiUrl(`/proxy/sykmelder/${fullOppgave.papirSmRegistering.behandler.hpr}`), () =>
                HttpResponse.json(mockSykmelder),
            ),
            http.get(apiUrl(`/proxy/oppgave/${fullOppgave.oppgaveid}`), () => HttpResponse.json(fullOppgave)),
            http.post(apiUrl(`/proxy/oppgave/${fullOppgave.oppgaveid}/send`), () =>
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
                    {status: 400},
                ),
            ),
        )

        render(
            <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                oppgaveId={`${fullOppgave.oppgaveid}`}
            />,
            {
                useRestLink: true,
            },
        )

        await userEvent.click(await screen.findByText(/Feltene stemmer overens/))

        const registerButton = await screen.findByRole('button', {name: 'Registrer sykmeldingen'})
        expect(registerButton).not.toBeDisabled()
        await userEvent.click(registerButton)

        expect(await screen.findByText(/Baksystemet fant ytterligere feil som må behandles/)).toBeInTheDocument()
        expect(await screen.findByText('Dont break the rules, please')).toBeInTheDocument()
    })
})
