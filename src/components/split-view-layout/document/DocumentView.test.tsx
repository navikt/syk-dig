import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { createMock } from '../../../utils/test/apolloTestUtils'
import { NavngiDokumentDocument } from '../../../graphql/queries/graphql.generated'
import { render, screen, within } from '../../../utils/testUtils'

import DocumentsViewer from './DocumentView'

describe('DocumentView', () => {
    it('should rename dokument', async () => {
        const mutationMock = vi.fn()
        const mock = [
            createMock({
                request: {
                    query: NavngiDokumentDocument,
                    variables: { oppgaveId: '987654321', dokumentInfoId: `some-doc`, tittel: 'nytt navn' },
                },
                result: () => {
                    mutationMock()

                    return {
                        data: {
                            __typename: 'Mutation' as const,
                            dokument: {
                                __typename: 'Document' as const,
                                dokumentInfoId: 'some-doc',
                                tittel: 'nytt navn',
                            },
                        },
                    }
                },
            }),
        ]
        render(
            <DocumentsViewer
                oppgaveId="987654321"
                documents={[{ tittel: 'redigerdokument.pdf', dokumentInfoId: `some-doc` }]}
                edit
            />,
            {
                mocks: mock,
            },
        )

        // Er tabben på plass?
        expect(screen.getByRole('tab', { name: 'redigerdokument.pdf' })).toBeInTheDocument()

        // Åpne modalen
        await userEvent.click(screen.getByRole('button', { name: 'Rediger dokumentnavn' }))
        expect(screen.getByRole('dialog', { name: 'Endre navn på dokument' }))

        // Rediger navn
        const textbox = screen.getByRole('textbox', { name: 'Dokument tittel' })
        await userEvent.click(textbox)
        await userEvent.clear(textbox)
        await userEvent.type(textbox, 'nytt navn')
        expect(textbox).toHaveValue('nytt navn')

        // Lagre
        await userEvent.click(screen.getByRole('button', { name: 'Lagre' }))
        expect(mutationMock).toHaveBeenCalledTimes(1)
    })

    it('should load the second document (without unmounting the first) when second tab is clicked', async () => {
        render(
            <DocumentsViewer
                oppgaveId="987654321"
                documents={[
                    { tittel: 'annet_dokument.pdf', dokumentInfoId: `some-doc` },
                    { tittel: 'more-doc.pdf', dokumentInfoId: 'more-doc.pdf' },
                ]}
                edit
            />,
        )

        // Assert first document loaded, but JSDOM doesn't support embeds so we assert on the fallback link
        expect(within(screen.getByTestId('pdf-embed')).getByRole('link')).toHaveAttribute(
            'href',
            '/api/document/987654321/some-doc',
        )
        await userEvent.click(screen.getByRole('tab', { name: 'more-doc.pdf' }))

        const embeds = screen.getAllByTestId('pdf-embed')

        // First should be hidden
        expect(embeds.at(0)).toHaveClass('hidden')
        // Second should be visible
        expect(embeds.at(1)).not.toHaveClass('hidden')
        // The now visible one should have correct URL
        expect(within(embeds[1]).getByRole('link')).toHaveAttribute('href', '/api/document/987654321/more-doc.pdf')
    })

    it('should not rename dokument on avbryt', async () => {
        render(
            <DocumentsViewer
                oppgaveId="987654321"
                documents={[{ tittel: 'redigerdokument.pdf', dokumentInfoId: `some-doc` }]}
                edit
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Rediger dokumentnavn' }))
        expect(screen.getByRole('dialog', { name: 'Endre navn på dokument' }))

        const textbox = screen.getByRole('textbox', { name: 'Dokument tittel' })
        await userEvent.click(textbox)
        await userEvent.clear(textbox)
        await userEvent.type(textbox, 'nytt navn')
        expect(textbox).toHaveValue('nytt navn')

        expect(screen.getByRole('tab', { name: 'redigerdokument.pdf' })).toBeInTheDocument()
        await userEvent.click(screen.getByRole('button', { name: 'Avbryt' }))
        expect(screen.queryByRole('tab', { name: 'nytt navn' })).not.toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'redigerdokument.pdf' })).toBeInTheDocument()
    })
})
