import { describe, it, expect } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import { axe } from 'vitest-axe'
import { ReactElement } from 'react'

import { render } from '../../utils/testUtils'

import Sykmeldingsperiode from './Sykmeldingsperiode'

describe('Sykmeldingsperiode', () => {
    const SykmeldingsperiodeComp = (): ReactElement => {
        const methods = useForm()
        return (
            <FormProvider {...methods}>
                <Sykmeldingsperiode />
            </FormProvider>
        )
    }

    it('should have no a11y issues', async () => {
        const { container } = render(<SykmeldingsperiodeComp />)

        expect(await axe(container)).toHaveNoViolations()
    })
})
