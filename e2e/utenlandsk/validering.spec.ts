import test, { expect, Locator, Page } from '@playwright/test'

import { fillAndreOpplysningerSection, fillPeriodeSection } from './user-actions'

test.beforeEach(async ({ page }) => {
    await page.goto('/oppgave/blank')
})

test('validation errors when registering a sykmelding with missing fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Registrer og send' }).click()

    const expectValidation = expectHasValidationError(getErrorSection(page))
    await expectValidation('Du må velge et land')
    await expectValidation('Du må velge en diagnosekode for hoveddiagnose')
})

test('validation errors for all errors, even deep down in the state tree', async ({ page }) => {
    await page.getByRole('button', { name: 'Legg til bidiagnose' }).click()
    await page.getByRole('button', { name: 'Registrer og send' }).click()

    const expectValidation = expectHasValidationError(getErrorSection(page))
    await expectValidation('Du må velge et land')
    await expectValidation('Du må fylle inn fra dato')
    await expectValidation('Du må fylle inn til dato')
    await expectValidation('Du må velge en diagnosekode for hoveddiagnose')
    await expectValidation('Du må velge en diagnosekode for bidiagnose')
    await expectValidation('Du må fylle inn dato for når sykmeldingen ble skrevet')
})

test('validation error if fom is before previous tom', async ({ page }) => {
    await fillPeriodeSection(page)([
        { fom: '09.03.2023', tom: '22.03.2023', option: '100% sykmeldt' },
        { fom: '18.03.2023', tom: '28.03.2023', option: 'Gradert sykmelding', grad: 80 },
    ])

    await page.getByRole('button', { name: 'Registrer og send' }).click()

    const expectValidation = expectHasValidationError(getErrorSection(page))
    await expectValidation('Fra kan ikke være tidligere eller samme dag som forrige periode')
})

test('validation error if fom is the same day as previous tom', async ({ page }) => {
    await fillPeriodeSection(page)([
        { fom: '09.03.2023', tom: '22.03.2023', option: '100% sykmeldt' },
        { fom: '22.03.2023', tom: '28.03.2023', option: '100% sykmeldt' },
    ])

    await page.getByRole('button', { name: 'Registrer og send' }).click()

    const expectValidation = expectHasValidationError(getErrorSection(page))
    await expectValidation('Fra kan ikke være tidligere eller samme dag som forrige periode')
})

test('validation error if fom is more than 30 days after behandletTidspunkt', async ({ page }) => {
    await page.goto('/oppgave/blank')

    await fillAndreOpplysningerSection(page)({ skrevetDato: '01.01.2023' })
    await fillPeriodeSection(page)([{ fom: '04.04.2023', tom: '10.04.2023', option: '100% sykmeldt' }])

    await page.getByRole('button', { name: 'Registrer og send' }).click()

    const expectValidation = expectHasValidationError(getErrorSection(page))
    await expectValidation('Fra kan ikke være mer enn 30 dager etter datoen sykmeldingen ble skrevet')
})

function getErrorSection(page: Page): Locator {
    /**
     * Aksel fjernet section med accessible name, selectoren så sånn ut før:
     *
     * return page.getByRole('region', {
     *     name: 'Du må fylle ut disse feltene før du kan registrere sykmeldingen',
     * })
     *
     * Dersom aksel gjør om på endringen så kan vi gå tilbake til den, frem til da må vi jukse litt med locators:
     */
    return page.locator('text=Du må fylle ut disse feltene før du kan registrere sykmeldingen').locator('..')
}

function expectHasValidationError(errorSection: Locator) {
    return async (name: string) => {
        await expect(errorSection.getByRole('link', { name })).toBeVisible()
    }
}
