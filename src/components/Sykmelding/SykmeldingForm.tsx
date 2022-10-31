import { FormProvider, useForm } from 'react-hook-form'

import Errors from '../Errors/Errors'
import { OppgaveFragment } from '../../graphql/queries/graphql.generated'
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved'

import Pasientopplysninger from './Pasientopplysninger'
import Sykmeldingsperiode, { PeriodeFormValue } from './Sykmeldingsperiode'
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection'
import { createDefaultValues } from './formDataUtils'
import ActionSection, { ActionFormSectionValues } from './ActionSection/ActionSection'
import { useHandleRegister } from './ActionSection/useHandleSave'
import AndreOpplysninger from './AndreOpplysninger'

export interface SykmeldingFormValues {
    diagnoser: DiagnoseFormSectionValues
    fnr: string
    behandletTidspunkt: Date | string | null
    land: string
    periode: Array<PeriodeFormValue>
    action: ActionFormSectionValues
    harAndreRelevanteOpplysninger: boolean
}

interface Props {
    oppgave: OppgaveFragment
}

function SykmeldingForm({ oppgave }: Props): JSX.Element {
    const [onSave, result] = useHandleRegister()
    const form = useForm<SykmeldingFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
        shouldFocusError: false,
    })
    const shouldWarn = form.formState.isDirty && !form.formState.isSubmitSuccessful
    useWarnUnsavedPopup(shouldWarn)

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSave)}>
                <Pasientopplysninger person={oppgave.person} />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <AndreOpplysninger />
                <Errors />
                <ActionSection registerResult={result} />
            </form>
        </FormProvider>
    )
}

export default SykmeldingForm
