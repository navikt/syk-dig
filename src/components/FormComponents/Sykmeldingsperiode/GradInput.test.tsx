import { FormProvider, useForm } from 'react-hook-form';
import { axe } from 'jest-axe';

import { render, screen } from '../../../utils/testUtils';
import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';

import GradInput from './GradInput';
import { Periodetype } from './PeriodeSelect';

describe('GradInput', () => {
    const GradInputComp = ({
        sykmeldingstype = Periodetype.AktivitetIkkeMulig,
    }: {
        sykmeldingstype?: string;
    }): JSX.Element => {
        const methods = useForm<SykmeldingFormValues>({
            defaultValues: {
                periode: [
                    {
                        sykmeldingstype: sykmeldingstype,
                    },
                ],
            },
        });
        return (
            <FormProvider {...methods}>
                <GradInput index={0} name={`periode.${0}.grad`} />
            </FormProvider>
        );
    };

    it('should have no a11y issues', async () => {
        const { container } = render(<GradInputComp />);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('should show if sykmeldingstype is Gradert', async () => {
        render(<GradInputComp sykmeldingstype={Periodetype.Gradert} />);

        expect(screen.getByRole('spinbutton', { name: 'Oppgi grad' })).toBeInTheDocument();
    });
});
