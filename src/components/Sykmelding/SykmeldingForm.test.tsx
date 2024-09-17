import { describe, beforeAll, it, expect } from 'vitest'
import mockRouter from 'next-router-mock'
import userEvent from '@testing-library/user-event'

import { createOppgave } from '../../mocks/data/dataCreators'
import { render, screen, within } from '../../utils/testUtils'
import {
    Avvisingsgrunn,
    AvvisOppgaveDocument,
    DigitaliseringsoppgaveStatusEnum,
} from '../../graphql/queries/graphql.generated'
import { createMock } from '../../utils/test/apolloTestUtils'

import SykmeldingForm from './SykmeldingForm'

describe('SykmeldingForm', () => {
    beforeAll(() => {
        mockRouter.setCurrentUrl('/oppgave/test-oppgave-id')
    })

    // TODO: e2e
    describe('when avvising', () => {
        it('should allow avvising sykmelding', async () => {
            const oppgave = createOppgave()
            const expectedRequest = createMock({
                request: {
                    query: AvvisOppgaveDocument,
                    variables: {
                        oppgaveId: 'test-oppgave-id',
                        enhetId: 'B17',
                        avvisningsgrunn: Avvisingsgrunn.ManglendePeriodeEllerSluttdato,
                        avvisningsgrunnAnnet: null,
                    },
                },
                result: {
                    data: {
                        __typename: 'Mutation',
                        avvis: {
                            __typename: 'DigitaliseringsoppgaveStatus',
                            oppgaveId: 'test-oppgave-id',
                            status: DigitaliseringsoppgaveStatusEnum.Avvist,
                        },
                    },
                },
            })

            render(<SykmeldingForm oppgave={oppgave} />, {
                mocks: [expectedRequest],
            })

            const section = within(screen.getByRole('region', { name: /Mangelfull sykmelding/ }))
            await userEvent.click(
                section.getByRole('checkbox', {
                    name: 'Sykmeldingen mangler viktige opplysninger som må innhentes før den kan registreres',
                }),
            )
            await userEvent.click(screen.getByRole('button', { name: 'Avvis registreringen' }))

            const avvisDialog = within(screen.getByRole('dialog', { name: 'Avvis sykmeldingen' }))

            await userEvent.selectOptions(avvisDialog.getByRole('combobox'), 'Manglende periode eller slutt-dato')
            await userEvent.click(avvisDialog.getByRole('button', { name: 'Ja, avvis sykmeldingen' }))

            expect(screen.getByRole('dialog', { name: /Sykmeldingen er avvist/ })).toBeInTheDocument()
        })

        it('should allow avvising sykmelding with avvisningsgrunn Annet and require description', async () => {
            const oppgave = createOppgave()
            const expectedRequest = createMock({
                request: {
                    query: AvvisOppgaveDocument,
                    variables: {
                        oppgaveId: 'test-oppgave-id',
                        enhetId: 'B17',
                        avvisningsgrunn: Avvisingsgrunn.Annet,
                        avvisningsgrunnAnnet: 'Feil info',
                    },
                },
                result: {
                    data: {
                        __typename: 'Mutation',
                        avvis: {
                            __typename: 'DigitaliseringsoppgaveStatus',
                            oppgaveId: 'test-oppgave-id',
                            status: DigitaliseringsoppgaveStatusEnum.Avvist,
                        },
                    },
                },
            })

            render(<SykmeldingForm oppgave={oppgave} />, {
                mocks: [expectedRequest],
            })

            const section = within(screen.getByRole('region', { name: /Mangelfull sykmelding/ }))
            await userEvent.click(
                section.getByRole('checkbox', {
                    name: 'Sykmeldingen mangler viktige opplysninger som må innhentes før den kan registreres',
                }),
            )
            await userEvent.click(screen.getByRole('button', { name: 'Avvis registreringen' }))

            const avvisDialog = within(screen.getByRole('dialog', { name: 'Avvis sykmeldingen' }))

            await userEvent.selectOptions(avvisDialog.getByRole('combobox'), 'Annet')
            await userEvent.click(avvisDialog.getByRole('button', { name: 'Ja, avvis sykmeldingen' }))

            expect(screen.getByText('Du må fylle inn en grunn for Annet')).toBeInTheDocument()

            await userEvent.type(avvisDialog.getByRole('textbox', { name: 'Hva er grunn Annet?' }), 'Feil info')
            await userEvent.click(avvisDialog.getByRole('button', { name: 'Ja, avvis sykmeldingen' }))

            expect(screen.getByRole('dialog', { name: /Sykmeldingen er avvist/ })).toBeInTheDocument()
        })
    })

    // TODO: e2e
    describe('Error summary', () => {
        it('should show validation errors when registering a sykmelding with missing fields', async () => {
            const oppgave = createOppgave()
            render(<SykmeldingForm oppgave={oppgave} />)

            await userEvent.click(screen.getByRole('button', { name: 'Registrer og send' }))

            const errorSection = within(
                screen.getByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen',
                }),
            )

            expect(errorSection.getByRole('link', { name: 'Du må velge et land' })).toBeInTheDocument()
            expect(
                errorSection.getByRole('link', { name: 'Du må velge en diagnosekode for hoveddiagnose' }),
            ).toBeInTheDocument()
        })

        it('should show validation errors for all errors, even deep down in the state tree', async () => {
            const oppgave = createOppgave()
            render(<SykmeldingForm oppgave={oppgave} />)

            await userEvent.click(screen.getByRole('button', { name: 'Legg til bidiagnose' }))
            await userEvent.click(screen.getByRole('button', { name: 'Registrer og send' }))

            const errorSection = within(
                screen.getByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen',
                }),
            )

            expect(errorSection.getByRole('link', { name: 'Du må velge et land' })).toBeInTheDocument()
            expect(errorSection.getByRole('link', { name: 'Du må fylle inn fra dato' })).toBeInTheDocument()
            expect(errorSection.getByRole('link', { name: 'Du må fylle inn til dato' })).toBeInTheDocument()
            expect(
                errorSection.getByRole('link', { name: 'Du må velge en diagnosekode for hoveddiagnose' }),
            ).toBeInTheDocument()
            expect(
                errorSection.getByRole('link', { name: 'Du må velge en diagnosekode for bidiagnose' }),
            ).toBeInTheDocument()
            expect(
                errorSection.getByRole('link', { name: 'Du må fylle inn dato for når sykmeldingen ble skrevet' }),
            ).toBeInTheDocument()
        })

        it('should show validation error if fom is before previous tom', async () => {
            const oppgave = createOppgave()
            render(<SykmeldingForm oppgave={oppgave} />)

            await fillPeriodeSection([
                { fom: '09.03.2023', tom: '22.03.2023', option: '100% sykmeldt' },
                { fom: '18.03.2023', tom: '28.03.2023', option: 'Gradert sykmelding', grad: 80 },
            ])

            await userEvent.click(screen.getByRole('button', { name: 'Registrer og send' }))

            const errorSection = within(
                screen.getByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen',
                }),
            )

            expect(
                errorSection.getByRole('link', {
                    name: 'Fra kan ikke være tidligere eller samme dag som forrige periode',
                }),
            ).toBeInTheDocument()
        })

        it('should show validation error if fom is the same day as previous tom', async () => {
            const oppgave = createOppgave()
            render(<SykmeldingForm oppgave={oppgave} />)

            await fillPeriodeSection([
                { fom: '09.03.2023', tom: '22.03.2023', option: '100% sykmeldt' },
                { fom: '22.03.2023', tom: '28.03.2023', option: '100% sykmeldt' },
            ])

            await userEvent.click(screen.getByRole('button', { name: 'Registrer og send' }))

            const errorSection = within(
                screen.getByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen',
                }),
            )

            expect(
                errorSection.getByRole('link', {
                    name: 'Fra kan ikke være tidligere eller samme dag som forrige periode',
                }),
            ).toBeInTheDocument()
        })

        it('should show validation error if fom is more than 30 days after behandletTidspunkt', async () => {
            const oppgave = createOppgave({
                values: {
                    __typename: 'OppgaveValues',
                    fnrPasient: '09870011223',
                    behandletTidspunkt: '2023-03-01',
                },
            })
            render(<SykmeldingForm oppgave={oppgave} />)

            await fillPeriodeSection([{ fom: '04.04.2023', tom: '10.04.2023', option: '100% sykmeldt' }])

            await userEvent.click(screen.getByRole('button', { name: 'Registrer og send' }))

            const errorSection = within(
                screen.getByRole('region', {
                    name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen',
                }),
            )

            expect(
                errorSection.getByRole('link', {
                    name: 'Fra kan ikke være mer enn 30 dager etter datoen sykmeldingen ble skrevet',
                }),
            ).toBeInTheDocument()
        })
    })
})

async function fillPeriodeSection(
    perioder: { option: string; grad?: number; fom: string; tom: string }[],
): Promise<void> {
    const section = within(screen.getByRole('region', { name: 'Sykmeldingsperiode' }))

    let index = 0
    for (const periode of perioder) {
        await userEvent.selectOptions(section.getAllByRole('combobox', { name: /Periode/ })[index], periode.option)
        if (periode.grad) {
            await userEvent.type(await section.findByRole('spinbutton', { name: 'Oppgi grad' }), `${periode.grad}`)
        }
        await userEvent.type(section.getAllByRole('textbox', { name: 'Fra' })[index], periode.fom)
        await userEvent.type(section.getAllByRole('textbox', { name: 'Til' })[index], periode.tom)

        if (index !== perioder.length - 1 && perioder.length > 1) {
            await userEvent.click(screen.getByRole('button', { name: 'Legg til periode' }))
        }
        index++
    }
}
