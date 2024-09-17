import { test, expect } from '@playwright/test'

import { PeriodeType, SykmeldingUnderArbeidStatus } from '../../src/graphql/queries/graphql.generated'
import { clickAndWait, waitForGraphQL } from '../utils/request'

import {
    fillAndreOpplysningerSection,
    fillDiagnoseSection,
    fillPasientOpplysningerSection,
    fillPeriodeSection,
} from './user-actions'

test('oppgave should be able to be saved for later', async ({ page }) => {
    await page.goto('/oppgave/eksisterende')

    await page.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }).fill('Pole')
    await page.getByRole('option', { name: 'Polen' }).click()

    const request = await clickAndWait(
        page.getByRole('button', { name: 'Lagre og lukk' }).click(),
        waitForGraphQL(page),
    )

    await expect(page.getByText(/Oppgaven ble lagret/)).toBeVisible()
    expect(request.postDataJSON().variables).toEqual({
        id: 'eksisterende',
        enhetId: '0312',
        status: SykmeldingUnderArbeidStatus.UnderArbeid,
        values: {
            behandletTidspunkt: '2021-01-01',
            biDiagnoser: [
                { kode: 'EL8PV', system: 'ICD10' },
                { kode: 'GZF4', system: 'ICPC2' },
            ],
            folkeRegistertAdresseErBrakkeEllerTilsvarende: false,
            fnrPasient: '12345678910',
            skrevetLand: 'POL',
            hovedDiagnose: { kode: 'Z27', system: 'ICD10' },
            perioder: [
                {
                    fom: '2020-01-01',
                    tom: '2020-01-15',
                    type: 'AKTIVITET_IKKE_MULIG',
                    grad: null,
                },
            ],
            erAdresseUtland: false,
        },
    })
})

test('oppgave should be able to be filled out from empty state', async ({ page }) => {
    await page.goto('/oppgave/blank')

    await fillPasientOpplysningerSection(page)({
        land: { type: 'Pol', click: 'Polen' },
    })

    await fillPeriodeSection(page)([
        { fom: '02.02.2022', tom: '16.02.2022', option: 'Gradert sykmelding', grad: 60 },
        { fom: '05.05.2022', tom: '19.05.2022', option: '100% sykmeldt' },
    ])

    await fillDiagnoseSection(page)([
        { system: 'ICD10', search: 'L81', click: /L815/ },
        { system: 'ICPC2', search: 'Y0', click: /Y04/ },
    ])

    await fillAndreOpplysningerSection(page)({
        skrevetDato: '07.06.2022',
    })

    await page.getByRole('button', { name: 'Registrer og send' }).click()

    const confirmationDialog = page.getByRole('dialog', {
        name: 'Er du sikker på at du vil registrere og sende inn sykmeldingen?',
    })

    await expect(confirmationDialog).toBeVisible()
    const request = await clickAndWait(
        confirmationDialog.getByRole('button', { name: 'Ja, jeg er sikker' }).click(),
        waitForGraphQL(page),
    )

    await expect(page.getByRole('dialog', { name: /Sykmeldingen er registrert/ })).toBeVisible()

    expect(request.postDataJSON().variables).toEqual({
        id: 'blank',
        status: SykmeldingUnderArbeidStatus.Ferdigstilt,
        enhetId: '0312',
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
    })
})

test('should fill one empty default periode even when perioder is an empty list instead of null', async ({ page }) => {
    await page.goto('/oppgave/blank')

    const section = page.getByRole('region', { name: 'Sykmeldingsperiode' })

    await expect(section.getByRole('combobox', { name: /Periode/ })).toHaveCount(1)
    await expect(page.getByRole('button', { name: 'Legg til periode' })).toBeVisible()
})
