import { describe, it, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { apiUrl } from '../smreg/api'
import { server } from '../../../mocks/server'
import {createMock, render, screen} from '../../../utils/testUtils'
import NasjonalOppgaveView from '../NasjonalOppgaveView'

import nullFnrOppgave from './testData/nullFnrOppgave.json'
import {
    mockBehandlerinfo,
    TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway,
} from './smregTestUtils'
import {NasjonalOppgaveByIdDocument} from "../../../graphql/queries/graphql.generated";
import {MockedProvider} from "@apollo/client/testing";

describe('Load pasientinfo', async () => {
    let mocks: any[]
    let testOppgaveId: string
    beforeEach(() => {
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

    it.skip('Should search for name of pasient when typing 11 digits in pasientFnr input field', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={true} showWarnings={true}>
            <TestOppgaveViewBecauseOfWeirdPaneBugButThisShouldBePlaywrightAnyway
                oppgaveId={`${nullFnrOppgave.oppgaveid}`}
            />
            </MockedProvider>,
            {
                useRestLink: true,
            },
        )

        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(await screen.findByText('Per Anders Persson')).toBeInTheDocument()
    })

    it.skip('Should display error when request fails', async () => {
        server.use(
            http.get(apiUrl(`/proxy/oppgave/${nullFnrOppgave.oppgaveid}`), () => HttpResponse.json(nullFnrOppgave)),
            http.get(apiUrl('/proxy/pasient'), () => HttpResponse.text('Internal server error', { status: 500 })),
        )

        render(<NasjonalOppgaveView oppgaveId={`${nullFnrOppgave.oppgaveid}`} layout={undefined} />, {
            useRestLink: true,
        })

        expect(await screen.findByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeInTheDocument()
        expect(screen.getByText('Vennligst legg inn opplysningene fra papirsykmeldingen')).toBeInTheDocument()

        await userEvent.type(await screen.findByText('1.2 Fødselsnummer (11 siffer)'), '12345678910')
        expect(
            await screen.findByText('En feil oppsto ved henting av pasient info. Ta kontakt dersom feilen vedvarer.'),
        ).toBeInTheDocument()
    })
})
