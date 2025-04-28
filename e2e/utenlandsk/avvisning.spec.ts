import test, { expect, Locator, Page } from '@playwright/test'

import { clickAndWait, waitForGraphQL } from '../utils/request'
import { Avvisingsgrunn } from '../../src/graphql/queries/graphql.generated'

test('should allow avvising sykmelding', async ({ page }) => {
    await page.goto('/oppgave/eksisterende')

    const avvisDialog = await avvisSykmelding(page, 'Manglende periode eller slutt-dato')

    const request = await clickAndWait(
        avvisDialog.getByRole('button', { name: 'Ja, avvis sykmeldingen' }).click(),
        waitForGraphQL(page, 'AvvisOppgave'),
    )
    await expect(page.getByRole('dialog', { name: /Sykmeldingen er avvist/ })).toBeVisible()
    expect(request.postDataJSON().variables).toEqual({
        oppgaveId: 'eksisterende',
        enhetId: '0312',
        avvisningsgrunn: Avvisingsgrunn.ManglendePeriodeEllerSluttdato,
        avvisningsgrunnAnnet: null,
    })
})

test('should allow avvising sykmelding with avvisningsgrunn Annet and require description', async ({ page }) => {
    await page.goto('/oppgave/eksisterende')

    const avvisDialog = await avvisSykmelding(page, 'Annet')
    await avvisDialog.getByRole('button', { name: 'Ja, avvis sykmeldingen' }).click()
    await expect(page.getByText('Du må fylle inn en grunn for Annet')).toBeVisible()
    await avvisDialog.getByRole('textbox', { name: 'Hva er grunn Annet?' }).fill('Feil info')

    const request = await clickAndWait(
        avvisDialog.getByRole('button', { name: 'Ja, avvis sykmeldingen' }).click(),
        waitForGraphQL(page, 'AvvisOppgave'),
    )
    await expect(page.getByRole('dialog', { name: /Sykmeldingen er avvist/ })).toBeVisible()
    expect(request.postDataJSON().variables).toEqual({
        oppgaveId: 'eksisterende',
        enhetId: '0312',
        avvisningsgrunn: Avvisingsgrunn.Annet,
        avvisningsgrunnAnnet: 'Feil info',
    })
})

async function avvisSykmelding(page: Page, grunn: string): Promise<Locator> {
    const section = page.getByRole('region', { name: /Mangelfull sykmelding/ })
    await section
        .getByRole('checkbox', {
            name: 'Sykmeldingen mangler viktige opplysninger som må innhentes før den kan registreres',
        })
        .click()

    await page.getByRole('button', { name: 'Avvis registreringen' }).click()

    const avvisDialog = page.getByRole('dialog', { name: 'Avvis sykmeldingen' })
    await avvisDialog.getByRole('combobox').selectOption(grunn)

    return avvisDialog
}
