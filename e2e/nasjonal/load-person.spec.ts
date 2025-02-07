import { test, expect } from '@playwright/test'

import { clickAndWait, waitForREST } from '../utils/request'

import { fillPasientOpplysningerSection } from './user-actions'

test('should search for name of pasient when typing 11 digits in pasientFnr input field', async ({ page }) => {
    await page.goto('/nasjonal/000000000')

    const request = await clickAndWait(
        fillPasientOpplysningerSection(page)('12345678910'),
        waitForREST(page)('/api/v1/proxy/pasient', 'GET'),
    )

    await expect(page.getByText('Per Anders Persson')).toBeVisible()
    expect((await request.response())?.status()).toBe(200)
})
