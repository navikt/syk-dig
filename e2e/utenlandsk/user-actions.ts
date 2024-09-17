import { Page } from '@playwright/test'

export function fillPasientOpplysningerSection(page: Page) {
    return async ({ land }: { land: { type: string; click: string } }): Promise<void> => {
        const section = page.getByRole('region', { name: 'Pasientopplysninger' })
        await section.getByRole('combobox', { name: 'Landet sykmeldingen ble skrevet' }).fill(land.type)
        await section.getByRole('option', { name: land.click }).click()
    }
}

export function fillPeriodeSection(page: Page) {
    return async (perioder: { option: string; grad?: number; fom: string; tom: string }[]): Promise<void> => {
        const section = page.getByRole('region', { name: 'Sykmeldingsperiode' })

        let index = 0
        for (const periode of perioder) {
            await section
                .getByRole('combobox', { name: /Periode/ })
                .nth(index)
                .selectOption(periode.option)
            if (periode.grad) {
                await section.getByRole('spinbutton', { name: 'Oppgi grad' }).fill(`${periode.grad}`)
            }
            await section.getByRole('textbox', { name: 'Fra' }).nth(index).fill(periode.fom)
            await section.getByRole('textbox', { name: 'Til' }).nth(index).fill(periode.tom)

            if (index !== perioder.length - 1 && perioder.length > 1) {
                await section.getByRole('button', { name: 'Legg til periode' }).click()
            }
            index++
        }
    }
}

export function fillDiagnoseSection(page: Page) {
    return async (diagnoser: { system: 'ICD10' | 'ICPC2'; search: string; click: RegExp }[]): Promise<void> => {
        const section = page.getByRole('region', { name: 'Diagnose' })

        let index = 0
        for (const diagnose of diagnoser) {
            await section.getByRole('combobox', { name: 'Kodesystem' }).nth(index).selectOption(diagnose.system)

            const combobox = section.getByRole('combobox', { name: 'Diagnosekode' }).nth(index)
            await combobox.fill(diagnose.search)
            await page.getByRole('option', { name: diagnose.click }).click()

            if (index !== diagnoser.length - 1 && diagnoser.length > 1) {
                await section.getByRole('button', { name: 'Legg til bidiagnose' }).click()
            }
            index++
        }
    }
}

export function fillAndreOpplysningerSection(page: Page) {
    return async ({ skrevetDato }: { skrevetDato: string }): Promise<void> => {
        const section = page.getByRole('region', { name: 'Andre opplysninger' })
        await section.getByRole('textbox', { name: 'Datoen sykmeldingen ble skrevet' }).fill(skrevetDato)
        await page.keyboard.press('Escape')
    }
}
