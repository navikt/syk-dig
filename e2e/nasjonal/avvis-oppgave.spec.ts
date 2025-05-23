import { test, expect } from '@playwright/test'

import { clickAndWait, waitForGraphQL } from '../utils/request'

test('should display modal with confirmation when clicking "avvis sykmeldingen"', async ({ page }) => {
    await page.goto('/nasjonal/123456789')

    await page.getByRole('button', { name: 'Avvis sykmeldingen' }).click()
    await expect(page.getByText('Er du sikker på at du vil avvise sykmeldingen?')).toBeVisible()

    const request = await clickAndWait(
        page.getByRole('button', { name: 'Avvis sykmelding', exact: true }).click(),
        waitForGraphQL(page, 'AvvisNasjonalOppgave'),
    )

    const dialog = page.getByRole('dialog', { name: 'Oppgaven ble ferdigstilt.' })
    await expect(dialog.getByRole('button', { name: 'Klikk her dersom du ikke blir videresendt...' })).toBeVisible()

    expect((await request.response())?.status()).toBe(200)
})
