import { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, it, expect } from 'vitest'

import { PeriodeType } from '../../../graphql/queries/types.generated'
import { render, screen } from '../../../utils/testUtils'
import { UtenlanskFormValues } from '../../Sykmelding/SykmeldingForm'

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

    it('should show if sykmeldingstype is Gradert', async () => {
        render(<GradInputComp sykmeldingstype={PeriodeType.Gradert} />)

        expect(screen.getByRole('spinbutton', { name: 'Oppgi grad' })).toBeInTheDocument()
    })
})
