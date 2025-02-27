import { Page } from '@playwright/test'

export function fillPasientOpplysningerSection(page: Page) {
    return async (fnr: string): Promise<void> => {
        const personSection = page.getByRole('region', { name: 'Pasientopplysninger' })
        await personSection.getByRole('textbox', { name: '1.2 Fødselsnummer (11 siffer)' }).fill(fnr)
    }
}

export function fillArbeidsgiverSection(page: Page) {
    return async (arbeidsgiver: {
        pasientenHar: string
        arbeidsgiver: string
        yrke: string
        stillingsprosent: string
    }): Promise<void> => {
        const arbeidsgiverSection = page.getByRole('region', { name: '2 Arbeidsgiver' })
        await arbeidsgiverSection.getByLabel('2.1 Pasienten har').selectOption(arbeidsgiver.pasientenHar)
        await arbeidsgiverSection.getByLabel('2.2 Arbeidsgiver for denne sykmeldingen').fill(arbeidsgiver.arbeidsgiver)
        await arbeidsgiverSection.getByLabel('2.3 Yrke/stilling for dette arbeidsforholdet').fill(arbeidsgiver.yrke)
        await arbeidsgiverSection.getByLabel('2.4 Stillingsprosent').fill(arbeidsgiver.stillingsprosent)
    }
}

export function fillDiagnoseSection(page: Page) {
    return async (diagnoser: { system: 'ICD10' | 'ICPC2'; search: string; click: RegExp }[]): Promise<void> => {
        const section = page.getByRole('region', { name: 'Diagnose' })

        await section.getByRole('checkbox', { name: /Annen lovfestet fraværsgrunn/ }).check()
        await section
            .getByRole('checkbox', { name: /Når vedkommende er innlagt i en godkjent helseinstitusjon/ })
            .check()
        await section.getByLabel('3.3.2 Beskriv fravær (valgfritt)').fill('Dette er en beskrivelse av fraværet')
        await section.getByRole('checkbox', { name: /Sykdommen er svangerskapsrelatert/ }).check()
        await section.getByRole('checkbox', { name: /Sykmeldingen kan skyldes en yrkesskade/ }).check()
        await section.getByLabel('3.6 Eventuell skadedato').fill('010120')
        await section.getByRole('checkbox', { name: /nødvendig å skjerme pasienten/ }).check()

        let index = 0
        for (const diagnose of diagnoser) {
            await section.getByRole('combobox', { name: 'Kodesystem' }).nth(index).selectOption(diagnose.system)

            const combobox = section.getByRole('combobox', { name: `3.${index + 1}.2 Kode` })
            await combobox.fill(diagnose.search)
            await page.getByRole('option', { name: diagnose.click }).click()

            if (index !== diagnoser.length - 1 && diagnoser.length > 1) {
                await section.getByRole('button', { name: 'Legg til bidiagnose' }).click()
            }
            index++
        }
    }
}

export function fillMulighetForArbeidSection(page: Page) {
    return async (
        perioder: {
            periodeType: string
            fom: string
            tom: string
            innspill?: string
            grad?: string
            behandlingsdager?: string
        }[],
    ): Promise<void> => {
        const periodeSection = page.getByRole('region', { name: '4 Mulighet for arbeid' })

        let index = 0
        for (const periode of perioder) {
            await periodeSection.getByLabel('Periodetype').nth(index).selectOption(periode.periodeType)
            await periodeSection.getByLabel('F.o.m').nth(index).fill(periode.fom)
            await periodeSection.getByLabel('T.o.m').nth(index).fill(periode.tom)

            if (periode.innspill) {
                await periodeSection.getByLabel('Andre innspill til arbeidsgiver').fill(periode.innspill)
            }

            if (periode.grad) {
                await periodeSection.getByLabel('Oppgi grad').fill(periode.grad)
                await periodeSection.getByRole('checkbox', { name: /Pasienten kan være delvis i arbeid/ }).check()
            }

            if (periode.periodeType === '4.3 100% sykmelding') {
                await periodeSection.getByRole('checkbox', { name: /Det er medisinske årsaker/ }).check()
                await periodeSection
                    .getByRole('checkbox', { name: /Helsetilstanden hindrer pasienten i å være i aktivitet/ })
                    .check()
                await periodeSection.getByLabel('Beskrivelse').nth(0).fill('Medisinsk beskrivelse')
                await periodeSection
                    .getByRole('checkbox', {
                        name: /Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet/,
                    })
                    .click()
                await periodeSection
                    .getByRole('checkbox', { name: /Manglende tilrettelegging på arbeidsplassen/ })
                    .check()
                await periodeSection.getByLabel('Beskrivelse').nth(1).fill('Arbeidsrelatert beskrivelse')
            }

            if (periode.behandlingsdager) {
                await periodeSection.getByLabel('Oppgi antall dager i perioden').fill(periode.behandlingsdager)
            }

            if (index !== perioder.length - 1 && perioder.length > 1) {
                await periodeSection.getByRole('button', { name: 'Legg til periode' }).click()
            }
            index++
        }
    }
}
