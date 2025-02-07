import { test, expect } from '@playwright/test'

import { clickAndWait, waitForREST } from '../utils/request'

import { fillMulighetForArbeidSection, fillPasientOpplysningerSection } from './user-actions'

test('should be able to delete periode without messing up other periods', async ({ page }) => {
    await page.goto('/nasjonal/111111111')

    await fillPasientOpplysningerSection(page)('12345678910')
    const periodeSection = page.getByRole('region', { name: '4 Mulighet for arbeid' })

    await expect(page.getByText('Periodetype')).toHaveCount(1)

    await fillMulighetForArbeidSection(page)([
        {
            periodeType: '4.1 Avventende sykmelding',
            fom: '010120',
            tom: '030120',
            innspill: 'Innspill til arbeidsgiver',
        },
        { periodeType: '4.2 Gradert sykmelding', fom: '010220', tom: '030220', grad: '80' },
        { periodeType: '4.3 100% sykmelding', fom: '010320', tom: '030320' },
    ])

    await expect(page.getByText('Periodetype')).toHaveCount(3)
    await periodeSection.getByRole('button', { name: 'Fjern periode' }).nth(1).click()
    await expect(page.getByText('Periodetype')).toHaveCount(2)

    await page.getByText('Feltene stemmer overens med').click()

    const request = await clickAndWait(
        page.getByRole('button', { name: 'Registrer sykmeldingen' }).click(),
        waitForREST(page)('/api/smreg/api/v1/proxy/oppgave/111111111/send', 'POST'),
    )

    await expect(page.getByText(/Oppgaven ble registrert/)).toBeVisible()

    expect((await request.response())?.status()).toBe(204)

    expect(request.postDataJSON().perioder).toEqual([
        {
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: 'Innspill til arbeidsgiver',
            behandlingsdager: null,
            fom: '2020-01-01',
            gradert: null,
            reisetilskudd: false,
            tom: '2020-01-03',
        },
        {
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            fom: '2020-02-01',
            gradert: { reisetilskudd: true, grad: 80 },
            reisetilskudd: false,
            tom: '2020-02-03',
        },
    ])
})
