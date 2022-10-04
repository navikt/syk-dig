import { Button } from '@navikt/ds-react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Errors from '../Errors/Errors';
import { OppgaveFragment } from '../../graphql/queries/graphql.generated';

import Pasientopplysninger from './Pasientopplysninger';
import Sykmeldingsperiode, { Periode } from './Sykmeldingsperiode';
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection';
import { createDefaultValues } from './formDataUtils';

export interface SykmeldingFormValues {
    diagnoser: DiagnoseFormSectionValues;
    fnr: string | null;
    land: string | null;
    periode: Array<Periode>;
}

interface Props {
    oppgave: OppgaveFragment;
}

function SykmeldingForm({ oppgave }: Props): JSX.Element {
    const methods = useForm<SykmeldingFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
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
