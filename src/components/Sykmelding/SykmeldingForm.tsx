import { FormProvider, useForm } from 'react-hook-form';

import Errors from '../Errors/Errors';
import { OppgaveFragment } from '../../graphql/queries/graphql.generated';

import Pasientopplysninger from './Pasientopplysninger';
import Sykmeldingsperiode, { Periode } from './Sykmeldingsperiode';
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection';
import { createDefaultValues } from './formDataUtils';
import ActionSection from './ActionSection/ActionSection';

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

    return (
        <FormProvider {...methods}>
            <form>
                <Pasientopplysninger />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <Errors />
                <ActionSection />
            </form>
        </FormProvider>
    );
}

export default SykmeldingForm;
