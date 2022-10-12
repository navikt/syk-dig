import { FormProvider, useForm } from 'react-hook-form';

import Errors from '../Errors/Errors';
import { OppgaveFragment } from '../../graphql/queries/graphql.generated';
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved';

import Pasientopplysninger from './Pasientopplysninger';
import Sykmeldingsperiode, { Periode } from './Sykmeldingsperiode';
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection';
import { createDefaultValues } from './formDataUtils';
import ActionSection, { ActionFormSectionValues } from './ActionSection/ActionSection';

export interface SykmeldingFormValues {
    diagnoser: DiagnoseFormSectionValues;
    fnr: string;
    land: string;
    periode: Array<Periode>;
    action: ActionFormSectionValues;
}

interface Props {
    oppgave: OppgaveFragment;
}

function SykmeldingForm({ oppgave }: Props): JSX.Element {
    const form = useForm<SykmeldingFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
        shouldFocusError: false,
    });
    const shouldWarn = form.formState.isDirty && !form.formState.isSubmitSuccessful;
    useWarnUnsavedPopup(shouldWarn);

    return (
        <FormProvider {...form}>
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
