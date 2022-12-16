import { FormProvider, useForm } from 'react-hook-form'

import Errors from '../Errors/Errors'
import { OppgaveFragment } from '../../graphql/queries/graphql.generated'
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved'

import Pasientopplysninger from './Pasientopplysninger'
import Sykmeldingsperiode, { PeriodeFormValue } from './Sykmeldingsperiode'
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection'
import { createDefaultValues } from './formDataUtils'
import ActionSection from './ActionSection/ActionSection'
import { useHandleRegister } from './ActionSection/mutations/useHandleSave'
import AndreOpplysninger from './AndreOpplysninger'

export interface SykmeldingFormValues {
    diagnoser: DiagnoseFormSectionValues
    behandletTidspunkt: Date | string | null
    land: string
    periode: Array<PeriodeFormValue>
    harAndreRelevanteOpplysninger: boolean
}

interface Props {
    oppgave: OppgaveFragment
}

function SykmeldingForm({ oppgave }: Props): JSX.Element {
    const [onSave, result] = useHandleRegister({ fnr: oppgave.values.fnrPasient })
    const form = useForm<SykmeldingFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
        shouldFocusError: false,
    })
    const shouldWarn = form.formState.isDirty && !form.formState.isSubmitSuccessful
    useWarnUnsavedPopup(shouldWarn)

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSave)}>
                <Pasientopplysninger fnr={oppgave.values.fnrPasient} person={oppgave.person} />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <AndreOpplysninger />
                <Errors />
                <ActionSection fnr={oppgave.values.fnrPasient} registerResult={result} />
            </form>
        </FormProvider>
    )
}

export default SykmeldingForm
