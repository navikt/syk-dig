import { describe, it, expect } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import { axe } from 'vitest-axe'
import { ReactElement } from 'react'

import { render, screen } from '../../../utils/testUtils'
import { UtenlanskFormValues } from '../../Sykmelding/SykmeldingForm'
import { PeriodeType } from '../../../graphql/queries/graphql.generated'

import GradInput from './GradInput'

describe('GradInput', () => {
    const GradInputComp = ({
        sykmeldingstype = PeriodeType.AktivitetIkkeMulig,
    }: {
        sykmeldingstype?: PeriodeType
    }): ReactElement => {
        const methods = useForm<UtenlanskFormValues>({
            defaultValues: {
                periode: [{ sykmeldingstype }],
            },
        })
        return (
            <FormProvider {...methods}>
                <GradInput name={`periode.${0}.grad`} />
            </FormProvider>
        )
    }

    it('should have no a11y issues', async () => {
        const { container } = render(<GradInputComp />)

        expect(await axe(container)).toHaveNoViolations()
    })

    it('should show if sykmeldingstype is Gradert', async () => {
        render(<GradInputComp sykmeldingstype={PeriodeType.Gradert} />)

        expect(screen.getByRole('spinbutton', { name: 'Oppgi grad' })).toBeInTheDocument()
    })
})
