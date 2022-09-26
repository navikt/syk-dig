import { FormProvider, useForm } from 'react-hook-form';
import { axe } from 'jest-axe';

import { render } from '../../utils/testUtils';

import Sykmeldingsperiode from './Sykmeldingsperiode';

describe('Sykmeldingsperiode', () => {
    const SykmeldingsperiodeComp = (): JSX.Element => {
        const methods = useForm();
        return (
            <FormProvider {...methods}>
                <Sykmeldingsperiode />
            </FormProvider>
        );
    };

    it('should have no a11y issues', async () => {
        const { container } = render(<SykmeldingsperiodeComp />);

        expect(await axe(container)).toHaveNoViolations();
    });
});
