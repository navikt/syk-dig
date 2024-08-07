import { describe, beforeAll, it, expect } from 'vitest'
import mockRouter from 'next-router-mock'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'

import { createOppgave } from '../../mocks/data/dataCreators'
import { render, screen, within } from '../../utils/testUtils'
import {
    Avvisingsgrunn,
    AvvisOppgaveDocument,
    DigitaliseringsoppgaveStatusEnum,
    PeriodeType,
    SaveOppgaveDocument,
    SykmeldingUnderArbeidStatus,
} from '../../graphql/queries/graphql.generated'
import { createMock } from '../../utils/test/apolloTestUtils'
import { DiagnoseSystem } from '../FormComponents/DiagnosePicker/DiagnosePicker'

import SykmeldingForm from './SykmeldingForm'

describe('SykmeldingForm', () => {
    beforeAll(() => {
        mockRouter.setCurrentUrl('/oppgave/test-oppgave-id')
    })

    describe('when saving', () => {
        it('allow submit when saving draft', async () => {
            const oppgave = createOppgave()
            const expectedRequest = createMock({
                request: {
                    query: SaveOppgaveDocument,
                    variables: {
                        id: 'test-oppgave-id',
                        values: {
                            fnrPasient: 'fnr-pasient',
                            skrevetLand: null,
                            behandletTidspunkt: null,
                            hovedDiagnose: null,
                            biDiagnoser: [],
                            perioder: [],
                            folkeRegistertAdresseErBrakkeEllerTilsvarende: false,
                            erAdresseUtland: false,
                        },
                        status: SykmeldingUnderArbeidStatus.UnderArbeid,
                        enhetId: 'B17',
                    },
                },
                result: {
                    data: { __typename: 'Mutation', lagre: oppgave },
                },
            })

            render(<SykmeldingForm oppgave={oppgave} />, {
                mocks: [expectedRequest],
            })

            await userEvent.click(screen.getByRole('button', { name: 'Lagre og lukk' }))

            expect(screen.getByText(/Oppgaven ble lagret/)).toBeInTheDocument()
        })

        it('should correctly save a completely filled out form given a blank oppgave', async () => {
            const oppgave = createOppgave()
            const expectedRequest = createMock({
                request: {
                    query: SaveOppgaveDocument,
                    variables: {
                        id: 'test-oppgave-id',
                        values: {
                            fnrPasient: 'fnr-pasient',
                            skrevetLand: 'POL',
                            behandletTidspunkt: '2022-06-07',
                            hovedDiagnose: { kode: 'L815', system: 'ICD10' },
                            biDiagnoser: [{ kode: 'Y04', system: 'ICPC2' }],
                            perioder: [
                                { fom: '2022-02-02', tom: '2022-02-16', type: PeriodeType.Gradert, grad: 60 },
                                {
                                    fom: '2022-05-05',
                                    tom: '2022-05-19',
                                    type: PeriodeType.AktivitetIkkeMulig,
                                    grad: null,
                                },
                            ],
                            folkeRegistertAdresseErBrakkeEllerTilsvarende: false,
                            erAdresseUtland: false,
                        },
                        status: SykmeldingUnderArbeidStatus.Ferdigstilt,
                        enhetId: 'B17',
                    },
                },
                result: {
                    data: { __typename: 'Mutation', lagre: oppgave },
                },
            })

            const { container } = render(<SykmeldingForm oppgave={oppgave} />, {
                mocks: [expectedRequest],
            })

            await fillPasientOpplysningerSection({
                land: { type: 'Pol', click: 'Polen' },
            })

            await fillPeriodeSection([
                { fom: '02.02.2022', tom: '16.02.2022', option: 'Gradert sykmelding', grad: 60 },
                { fom: '05.05.2022', tom: '19.05.2022', option: '100% sykmeldt' },
            ])

            await fillDiagnoseSection([
                { system: 'ICD10', search: 'L81', click: 'L815' },
                { system: 'ICPC2', search: 'Y0', click: 'Y04' },
            ])

            await fillAndreOpplysningerSection({
                skrevetDato: '07.06.2022',
            })

            expect(
                await axe(container, {
                    // TODO: Remove once ds-datepicker fixes it's validations
                    rules: { 'aria-valid-attr-value': { enabled: false }, 'aria-dialog-name': { enabled: false } },
                }),
            ).toHaveNoViolations()

            await userEvent.click(screen.getByRole('button', { name: 'Registrer og send' }))

            const confirmationDialog = screen.getByRole('dialog', {
                name: 'Er du sikker på at du vil registrere og sende inn sykmeldingen?',
            })

            expect(confirmationDialog).toBeInTheDocument()

            await userEvent.click(within(confirmationDialog).getByRole('button', { name: 'Ja, jeg er sikker' }))

            expect(await screen.findByRole('dialog', { name: /Sykmeldingen er registrert/ })).toBeInTheDocument()
        }, 20000) // This tests fills out a very large form, so we can expect it to be long running,

        it('should fill one empty default periode even when perioder is an empty list instead of null', () => {
            const oppgave = createOppgave({
                values: {
                    __typename: 'OppgaveValues',
                    fnrPasient: 'fnr-pasient',
                    hoveddiagnose: null,
                    biDiagnoser: null,
                    behandletTidspunkt: null,
                    skrevetLand: null,
                    perioder: [],
                    folkeRegistertAdresseErBrakkeEllerTilsvarende: null,
                    erAdresseUtland: null,
                },
            })

            render(<SykmeldingForm oppgave={oppgave} />)

            const section = within(screen.getByRole('region', { name: 'Sykmeldingsperiode' }))

            expect(section.getAllByRole('combobox', { name: /Periode/ })).toHaveLength(1)
            expect(screen.getByRole('button', { name: 'Legg til periode' })).toBeInTheDocument()
        })
    })

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

async function fillPasientOpplysningerSection({ land }: { land: { type: string; click: string } }): Promise<void> {
    const section = within(screen.getByRole('region', { name: 'Pasientopplysninger' }))

    await section.findByPlaceholderText('Søk etter land')
    await userEvent.type(await section.findByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }), land.type)
    await userEvent.click(await section.findByRole('option', { name: land.click }))
}

async function fillAndreOpplysningerSection({ skrevetDato }: { skrevetDato: string }): Promise<void> {
    const section = within(screen.getByRole('region', { name: 'Andre opplysninger' }))

    await userEvent.type(section.getByRole('textbox', { name: 'Datoen sykmeldingen ble skrevet' }), skrevetDato)
    await userEvent.keyboard('{Escape}')
}

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

async function fillDiagnoseSection(
    diagnoser: { system: DiagnoseSystem; search: string; click: string }[],
): Promise<void> {
    const section = within(screen.getByRole('region', { name: 'Diagnose' }))

    let index = 0
    for (const diagnose of diagnoser) {
        await userEvent.selectOptions(section.getAllByRole('combobox', { name: 'Kodesystem' })[index], diagnose.system)

        const combobox = section.getAllByRole('combobox', { name: 'Diagnosekode' })[index]
        await userEvent.type(combobox, diagnose.search)
        await userEvent.click(await screen.findByRole('option', { name: diagnose.click }))

        if (index !== diagnoser.length - 1 && diagnoser.length > 1) {
            await userEvent.click(section.getByRole('button', { name: 'Legg til bidiagnose' }))
        }
        index++
    }
}
