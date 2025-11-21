import { test, expect } from '@playwright/test'

import { fillPasientOpplysningerSection } from './user-actions'

test('should search for name of pasient when typing 11 digits in pasientFnr input field', async ({ page }) => {
    await page.goto('/nasjonal/000000000')

    await fillPasientOpplysningerSection(page)('12345678910')

    await expect(page.getByText('Per Anders Persson')).toBeVisible()
})

test('should not show name of pasient if fnr is longer than 11 digits', async ({ page }) => {
    await page.goto('/nasjonal/000000000')

    await fillPasientOpplysningerSection(page)('12345678910000')

    await expect(page.getByText('Per Anders Persson')).not.toBeVisible()
})

test('should show error when loading of person fails', async ({ page }) => {
    await page.goto('/nasjonal/000000000')

    await fillPasientOpplysningerSection(page)('should-fail')

    await expect(
        page.getByText('En feil oppsto ved henting av pasient info. Ta kontakt dersom feilen vedvarer.'),
    ).toBeVisible()
})
