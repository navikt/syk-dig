import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/react'

import {createMock, render, screen} from '../../../utils/testUtils'
import {
    mockBehandlerinfo,
    mockPasientinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'
import {MockedProvider} from "@apollo/client/testing";
import {NasjonalOppgaveByIdDocument} from "../../../graphql/queries/graphql.generated";

describe('Avvis oppgave', async () => {
    let mocks: any[]
    let testOppgaveId: string
    beforeEach(() => {
        mockPasientinfo()
        mockBehandlerinfo()
        testOppgaveId = '12345'
        mocks = [
            createMock({
                request: {
                    query: NasjonalOppgaveByIdDocument,
                    variables: { oppgaveId: testOppgaveId},
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
                                    sykmeldingId: null,
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
            }),
        ];
    })


    it('Should display modal with confirmation when clicking "avvis sykmeldingen"', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={true}>
            <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                oppgaveId={`${testOppgaveId}`}
            />
            </MockedProvider>,
            {
                useRestLink: true,
            },
        )

        await userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmeldingen' }))
        expect(await screen.findByText('Er du sikker på at du vil avvise sykmeldingen?')).toBeInTheDocument()
        await userEvent.click(await screen.findByRole('button', { name: 'Avvis sykmelding' }))

        expect(
            within(await screen.findByRole('dialog', { name: 'Oppgaven ble ferdigstilt.' })).getByRole('button', {
                name: 'Klikk her dersom du ikke blir videresendt...',
            }),
        ).toBeInTheDocument()
    }, 25_000)
})
