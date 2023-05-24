/* eslint-disable testing-library/no-node-access */
import mockRouter from 'next-router-mock'
import { GraphQLError } from 'graphql'
import userEvent from '@testing-library/user-event'

import { render, screen } from '../../utils/testUtils'
import { createMock } from '../../utils/test/apolloTestUtils'
import { NavngiDokumentDocument, OppgaveByIdDocument } from '../../graphql/queries/graphql.generated'
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

    it('should load the second document (without unmounting the first) when second tab is clicked', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
                    result: { data: { __typename: 'Query', oppgave: createOppgave({ oppgaveId: '987654321' }) } },
                }),
            ],
        })

        expect(await screen.findByRole('button', { name: 'Registrer og send' })).toBeInTheDocument()

        // Assert first document loaded
        expect(screen.getByTestId('pdf-embed').firstChild).toHaveAttribute('src', '/api/document/987654321/some-doc')
        await userEvent.click(screen.getByRole('tab', { name: 'more-doc.pdf' }))

        const embeds = screen.getAllByTestId('pdf-embed')

        // First should be hidden
        expect(embeds.at(0)).toHaveClass('hidden')
        // Second should be visible
        expect(embeds.at(1)).not.toHaveClass('hidden')
        // The now visible one should have correct URL
        expect(embeds.at(1)?.firstChild).toHaveAttribute('src', '/api/document/987654321/more-doc.pdf')
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

        expect(await screen.findByRole('heading', { name: 'En uventet feil oppsto' })).toBeInTheDocument()
    })

    it('should rename dokument', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
                    result: {
                        data: {
                            __typename: 'Query',
                            oppgave: createOppgave({
                                oppgaveId: '987654321',
                                documents: [
                                    {
                                        __typename: 'Document',
                                        tittel: 'redigerdokument.pdf',
                                        dokumentInfoId: `some-doc`,
                                    },
                                ],
                            }),
                        },
                    },
                }),
                createMock({
                    request: {
                        query: NavngiDokumentDocument,
                        variables: { oppgaveId: '987654321', dokumentInfoId: `some-doc`, tittel: 'nytt navn' },
                    },
                    result: {
                        data: {
                            __typename: 'Mutation',
                            dokument: {
                                __typename: 'Document',
                                dokumentInfoId: 'some-doc',
                                tittel: 'nytt navn',
                            },
                        },
                    },
                }),
            ],
        })

        expect(await screen.findByRole('button', { name: 'Registrer og send' })).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Rediger dokumentnavn' }))
        expect(screen.getByRole('dialog', { name: 'Endre navn på dokument' }))

        const textbox = await screen.findByRole('textbox', { name: 'Dokument tittel' })
        await userEvent
            .click(textbox)
            .then(() => userEvent.clear(textbox))
            .then(() => userEvent.type(textbox, 'nytt navn'))
            .then(() => expect(textbox).toHaveValue('nytt navn'))

        expect(screen.getByRole('tab', { name: 'redigerdokument.pdf' })).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Lagre' }))
        expect(await screen.findByRole('tab', { name: 'nytt navn' })).toBeInTheDocument()
    })
    it('should not rename dokument on avbryt', async () => {
        render(<Utenlandsk />, {
            mocks: [
                createMock({
                    request: { query: OppgaveByIdDocument, variables: { oppgaveId: '987654321' } },
                    result: {
                        data: {
                            __typename: 'Query',
                            oppgave: createOppgave({
                                oppgaveId: '987654321',
                                documents: [
                                    {
                                        __typename: 'Document',
                                        tittel: 'redigerdokument.pdf',
                                        dokumentInfoId: `some-doc`,
                                    },
                                ],
                            }),
                        },
                    },
                }),
            ],
        })

        expect(await screen.findByRole('button', { name: 'Registrer og send' })).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Rediger dokumentnavn' }))
        expect(screen.getByRole('dialog', { name: 'Endre navn på dokument' }))

        const textbox = await screen.findByRole('textbox', { name: 'Dokument tittel' })
        await userEvent
            .click(textbox)
            .then(() => userEvent.clear(textbox))
            .then(() => userEvent.type(textbox, 'nytt navn'))
            .then(() => expect(textbox).toHaveValue('nytt navn'))

        expect(screen.getByRole('tab', { name: 'redigerdokument.pdf' })).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }))
        expect(screen.queryByRole('tab', { name: 'nytt navn' })).not.toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'redigerdokument.pdf' })).toBeInTheDocument()
    })
})
