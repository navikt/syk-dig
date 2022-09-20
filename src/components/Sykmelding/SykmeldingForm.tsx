import { Button } from '@navikt/ds-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Errors from '../Errors/Errors';

import Pasientopplysninger from './Pasientopplysninger';
import Sykmeldingsperiode, { Periode } from './Sykmeldingsperiode';

export interface SykmeldingFormValues {
    fnr: string;
    periode: Array<Periode>;
}

function SykmeldingForm(): JSX.Element {
    const methods = useForm<SykmeldingFormValues>({
        defaultValues: {
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
                <Errors />
                <Button type="submit">Registrere og send</Button>
            </form>
        </FormProvider>
    );
}

export default SykmeldingForm;
