import test, { expect } from '@playwright/test'

import { clickAndWait, waitForGraphQL } from '../utils/request'

test('Should display modal when clicking "Send til Gosys"', async ({ page }) => {
    await page.goto('/nasjonal/123456789')

    await page.getByRole('button', { name: 'Dette er ikke en sykmelding' }).click()

    const dialog = page.getByRole('dialog', { name: 'Send til Gosys?' })
    await expect(dialog).toBeVisible()

    const request = await clickAndWait(
        dialog.getByRole('button', { name: 'Send til Gosys' }).click(),
        waitForGraphQL(page, 'TilbakeTilGosysNasjonal'),
    )

    const confirmationDialog = page.getByRole('dialog', { name: 'Oppgaven ble sendt tilbake til Gosys.' })
    await expect(
        confirmationDialog.getByRole('button', { name: 'Klikk her dersom du ikke blir videresendt...' }),
    ).toBeVisible()

    expect((await request.response())?.status()).toBe(200)
})
