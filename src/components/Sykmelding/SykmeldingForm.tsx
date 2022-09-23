import { Button } from '@navikt/ds-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Errors from '../Errors/Errors';

import Pasientopplysninger from './Pasientopplysninger';
import Sykmeldingsperiode, { Periode } from './Sykmeldingsperiode';
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection';

export interface SykmeldingFormValues {
    diagnoser: DiagnoseFormSectionValues;
    fnr: string;
    periode: Array<Periode>;
}

function SykmeldingForm(): JSX.Element {
    const methods = useForm<SykmeldingFormValues>({
        defaultValues: {
            diagnoser: {
                hoveddiagnose: {
                    system: 'ICD10',
                    code: undefined,
                    text: undefined,
                },
            },
            periode: [
                {
                    grad: '',
                },
            ],
        },
        shouldFocusError: false,
    });

    const onSubmit: SubmitHandler<SykmeldingFormValues> = (data) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Pasientopplysninger />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <Errors />
                <Button type="submit">Registrere og send</Button>
            </form>
        </FormProvider>
    );
}

export default SykmeldingForm;
