import { FormProvider, useForm } from 'react-hook-form';
import { axe } from 'jest-axe';

import { render, screen } from '../../../utils/testUtils';
import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm';
import { PeriodeType } from '../../../graphql/queries/graphql.generated';

import GradInput from './GradInput';

describe('GradInput', () => {
    const GradInputComp = ({
        sykmeldingstype = PeriodeType.AktivitetIkkeMulig,
    }: {
        sykmeldingstype?: PeriodeType;
    }): JSX.Element => {
        const methods = useForm<SykmeldingFormValues>({
            defaultValues: {
                periode: [{ sykmeldingstype }],
            },
        });
        return (
            <FormProvider {...methods}>
                <GradInput name={`periode.${0}.grad`} />
            </FormProvider>
        );
    };

    it('should have no a11y issues', async () => {
        const { container } = render(<GradInputComp />);

        expect(await axe(container)).toHaveNoViolations();
    });

    it('should show if sykmeldingstype is Gradert', async () => {
        render(<GradInputComp sykmeldingstype={PeriodeType.Gradert} />);

        expect(screen.getByRole('spinbutton', { name: 'Oppgi grad' })).toBeInTheDocument();
    });
});
