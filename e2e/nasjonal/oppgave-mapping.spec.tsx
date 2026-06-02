import test, { expect } from '@playwright/test'

import { formatsmregDateShorthand } from '../../src/components/nasjonal-oppgave/smregDateUtils'

test('Should map all fields when "nasjonalOppgave.nasjonalSykmelding" is completely filled out', async ({ page }) => {
    await page.goto('/nasjonal/123456789')

    await expect(page.getByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeVisible()

    await test.step('Pasientopplysninger', async () => {
        await expect(page.getByLabel('1.2 Fødselsnummer (11 siffer)')).toHaveValue('20026900817')
        await expect(page.getByText('Per Anders Persson')).toBeVisible()
    })

    await test.step('Arbeidsgiver', async () => {
        await expect(page.getByRole('combobox', { name: '2.1 Pasienten har' })).toHaveValue('EN_ARBEIDSGIVER')
        await expect(page.getByLabel('2.2 Arbeidsgiver for denne sykmeldingen')).toHaveValue(
            'Langtvekkistan politidistrikt',
        )
        await expect(page.getByLabel('2.3 Yrke/stilling for dette arbeidsforholdet')).toHaveValue('Politi')
        await expect(page.getByLabel('2.4 Stillingsprosent')).toHaveValue('100')
    })

    await test.step('Diagnoser', async () => {
        await expect(
            page.getByRole('region', { name: '3.1 Hoveddiagnose' }).getByText('Main diagnosis text'),
        ).toHaveCount(1)
        const bidiagnoseSection = page.getByRole('region', { name: '3.2 Bidiagnose' })
        await expect(bidiagnoseSection.getByText('Secondary diagnosis text')).toHaveCount(1)
        await expect(page.getByRole('checkbox', { name: /Annen lovfestet fraværsgrunn/ })).toBeChecked()
        await expect(page.getByRole('checkbox', { name: /Når vedkommende er under behandling/ })).toBeChecked()
        await expect(
            page.getByRole('checkbox', { name: /Når vedkommende er til nødvendig kontrollundersøkelse/ }),
        ).toBeChecked()
        await expect(page.getByRole('checkbox', { name: /Når vedkommende er under behandling/ })).toBeChecked()
        await expect(page.getByLabel('3.3.2 Beskriv fravær (valgfritt)')).toHaveValue('Dette er årsaken')
        await expect(page.getByRole('checkbox', { name: /Sykdommen er svangerskapsrelatert/ })).toBeChecked()
        await expect(page.getByRole('checkbox', { name: /Sykmeldingen kan skyldes en yrkesskade/ })).toBeChecked()
        await expect(page.getByRole('textbox', { name: '3.6 Eventuell skadedato' })).toHaveValue(
            formatsmregDateShorthand('2020-03-05'),
        )
        await expect(page.getByRole('checkbox', { name: /nødvendig å skjerme pasienten/ })).not.toBeChecked()
    })

    await test.step('Muligheter for arbeid (aktivitet)', async () => {
        const mulighetForArbeid = page.getByRole('region', { name: '4 Mulighet for arbeid' })
        const periode1 = mulighetForArbeid.getByRole('region', { name: 'Periode 1' })
        await expect(periode1).toBeVisible()
        await expect(periode1.getByRole('combobox', { name: 'Periodetype' })).toHaveValue('avventende')
        await expect(periode1.getByRole('textbox', { name: 'F.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-01-01'),
        )
        await expect(periode1.getByRole('textbox', { name: 'T.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-01-15'),
        )
        await expect(periode1.getByLabel('Andre innspill til arbeidsgiver')).toHaveValue('Må avvente')

        const periode2 = page.getByRole('region', { name: 'Periode 2' })
        await expect(periode2).toBeVisible()
        await expect(periode2.getByRole('combobox', { name: 'Periodetype' })).toHaveValue('gradert')
        await expect(periode2.getByRole('textbox', { name: 'F.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-01-16'),
        )
        await expect(periode2.getByRole('textbox', { name: 'T.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-01-30'),
        )
        await expect(periode2.getByLabel('Oppgi grad')).toHaveValue('80')
        await expect(periode2.getByRole('checkbox', { name: /Pasienten kan være delvis i arbeid/ })).toBeChecked()

        const periode3 = page.getByRole('region', { name: 'Periode 3' })
        await expect(periode3).toBeVisible()
        await expect(periode3.getByRole('combobox', { name: 'Periodetype' })).toHaveValue('aktivitetIkkeMulig')
        await expect(periode3.getByRole('textbox', { name: 'F.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-02-01'),
        )
        await expect(periode3.getByRole('textbox', { name: 'T.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-02-15'),
        )
        await expect(
            periode3.getByRole('checkbox', { name: 'Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet' }),
        ).toBeChecked()
        await expect(
            periode3.getByRole('checkbox', { name: 'Aktivitet vil hindre/forsinke bedring av helsetilstanden' }),
        ).toBeChecked()
        await expect(
            periode3.getByRole('checkbox', {
                name: 'Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet',
            }),
        ).toBeChecked()
        await expect(
            periode3.getByRole('checkbox', { name: 'Manglende tilrettelegging på arbeidsplassen' }),
        ).toBeChecked()
        await expect(periode3.getByRole('textbox', { name: 'Beskrivelse' }).nth(1)).toHaveValue(
            'Dette er beskrivelsen på den arbeidsrelaterte årsaken',
        )

        const periode4 = page.getByRole('region', { name: 'Periode 4' })
        await expect(periode4).toBeVisible()
        await expect(periode4.getByRole('combobox', { name: 'Periodetype' })).toHaveValue('behandlingsdager')
        await expect(periode4.getByRole('textbox', { name: 'F.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-02-16'),
        )
        await expect(periode4.getByRole('textbox', { name: 'T.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-02-28'),
        )
        await expect(page.getByLabel('Oppgi antall dager i perioden')).toHaveValue('13')

        const periode5 = page.getByRole('region', { name: 'Periode 5' })
        await expect(periode5).toBeVisible()
        await expect(periode5.getByRole('combobox', { name: 'Periodetype' })).toHaveValue('reisetilskudd')
        await expect(periode5.getByRole('textbox', { name: 'F.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-03-01'),
        )
        await expect(periode5.getByRole('textbox', { name: 'T.o.m' })).toHaveValue(
            formatsmregDateShorthand('2025-03-15'),
        )
    })

    await test.step('Utdypende opplysninger', async () => {
        await expect(page.getByRole('checkbox', { name: /Sykmeldingen har utdypende opplysninger/ })).not.toBeChecked()
    })

    await test.step('Melding til NAV', async () => {
        await expect(page.getByRole('checkbox', { name: /Ønskes bistand fra NAV nå?/ })).toBeChecked()
        await expect(page.getByLabel('Begrunn nærmere')).toHaveValue('Dette er en beskrivelse av bistand')
    })

    await test.step('Melding til arbeidsgiveren', async () => {
        await expect(page.getByLabel('9.1 Andre innspill til arbeidsgiveren')).toHaveValue('Melding til arbeidsgiver')
    })

    await test.step('Tilbakedatering', async () => {
        const tilbakedatering = page.getByRole('region', { name: '10 Tilbakedatering' })
        await expect(tilbakedatering.getByRole('checkbox', { name: /Er sykmeldingen tilbakedatert?/ })).toBeChecked()
        await expect(tilbakedatering.getByLabel('Oppgi dato for dokumenterbar kontakt med pasienten')).toHaveValue(
            formatsmregDateShorthand('2025-01-10'),
        )
        await expect(
            tilbakedatering.getByRole('checkbox', { name: /Pasienten har ikke kunnet ivareta egne interesser/ }),
        ).toBeChecked()
        await expect(tilbakedatering.getByLabel('Begrunn')).toHaveValue('Pasienten kunne ikke bevege seg')
    })

    await test.step('Behandler', async () => {
        await expect(page.getByLabel('12.1 Behandletdato')).toHaveValue(formatsmregDateShorthand('2025-01-14'))
    })
})

test('Should show status for nasjonalOppgave AVVIST', async ({ page }) => {
    await page.goto('/nasjonal/avvist')

    await expect(page.getByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Oppgaven er avvist' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Registrer sykmeldingen' })).not.toBeVisible()
})

test('Should show status for nasjonalOppgave FERDIGSTILT', async ({ page }) => {
    await page.goto('/nasjonal/ferdigstilt')

    await expect(page.getByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Oppgaven er allerede ferdigstilt' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Registrer sykmeldingen' })).not.toBeVisible()
})

test('Should show status for nasjonalOppgave IKKE_EN_SYKMELDING', async ({ page }) => {
    await page.goto('/nasjonal/ikkeensykmelding')

    await expect(page.getByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeVisible()
    await expect(
        page.getByRole('heading', {
            name: 'Oppgaven har blitt sendt tilbake til Gosys fordi det ikke var en sykmelding',
        }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: 'Registrer sykmeldingen' })).not.toBeVisible()
})

test('Should show status for nasjonalOppgave FINNES_IKKE', async ({ page }) => {
    await page.goto('/nasjonal/finnesikke')

    await expect(page.getByRole('heading', { name: 'Nasjonal papirsykmelding' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Vi klarte ikke å finne oppgaven' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Registrer sykmeldingen' })).not.toBeVisible()
})
