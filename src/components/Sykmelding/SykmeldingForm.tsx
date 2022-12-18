import { FormProvider, useForm } from 'react-hook-form'
import { useRef } from 'react'

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
    const errorSectionRef = useRef<HTMLDivElement>(null)
    const [onSave, result] = useHandleRegister({ fnr: oppgave.values.fnrPasient })
    const form = useForm<SykmeldingFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
        shouldFocusError: false,
    })
    const focusErrorSection = (): void => {
        requestAnimationFrame(() => {
            errorSectionRef.current?.focus()
        })
    }
    const shouldWarn = form.formState.isDirty && !form.formState.isSubmitSuccessful
    useWarnUnsavedPopup(shouldWarn)

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSave, focusErrorSection)} id="sykmelding-form">
                <Pasientopplysninger fnr={oppgave.values.fnrPasient} person={oppgave.person} />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <AndreOpplysninger />
                <Errors ref={errorSectionRef} />
                <ActionSection
                    fnr={oppgave.values.fnrPasient}
                    registerResult={result}
                    focusErrorSection={focusErrorSection}
                />
            </form>
        </FormProvider>
    )
}

export default SykmeldingForm
