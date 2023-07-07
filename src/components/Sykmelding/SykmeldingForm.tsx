import { FormProvider, useForm } from 'react-hook-form'
import { ReactElement, useRef } from 'react'

import Errors from '../Errors/Errors'
import { OppgaveFragment } from '../../graphql/queries/graphql.generated'
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved'

import Pasientopplysninger from './Pasientopplysninger'
import Sykmeldingsperiode, { PeriodeFormValue } from './Sykmeldingsperiode'
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection'
import { createDefaultValues } from './formDataUtils'
import ActionSection, { redirectTilGosys } from './ActionSection/ActionSection'
import { useHandleRegister } from './ActionSection/mutations/useHandleSave'
import AndreOpplysninger from './AndreOpplysninger'
import MangelfullSykmelding from './MangelfullSykmelding'
import AvvisSection from './AvvisSection/AvvisSection'

export interface SykmeldingFormValues {
    diagnoser: DiagnoseFormSectionValues
    behandletTidspunkt: Date | string | null
    land: string | null
    periode: Array<PeriodeFormValue>
    mangelfullSykmelding: boolean
    folkeRegistertAdresseErBrakkeEllerTilsvarende: boolean
    avvisningsgrunnAnnet?: string
}

interface Props {
    oppgave: OppgaveFragment
}

function SykmeldingForm({ oppgave }: Props): ReactElement {
    const errorSectionRef = useRef<HTMLDivElement>(null)
    const focusErrorSection = (): void => {
        requestAnimationFrame(() => {
            errorSectionRef.current?.focus()
        })
    }

    const [onSave, result] = useHandleRegister({
        fnr: oppgave.values.fnrPasient,
        onCompleted: () => {
            // TODO: Better solution to this hacky implementation of a delay:
            // Necessary to let RHF re-render with isSubmitSuccessful before we redirect to GOSYS
            setTimeout(() => {
                redirectTilGosys()
            }, 100)
        },
    })

    const form = useForm<SykmeldingFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
        shouldFocusError: false,
    })
    const shouldShowAvvisActions = form.watch('mangelfullSykmelding') === true

    useWarnUnsavedPopup(form.formState.isDirty && !form.formState.isSubmitSuccessful)

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSave, focusErrorSection)} id="sykmelding-form">
                <Pasientopplysninger fnr={oppgave.values.fnrPasient} person={oppgave.person} />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <AndreOpplysninger />
                <MangelfullSykmelding />
                <Errors ref={errorSectionRef} />
                <div className="sticky bottom-0 z-10 border-t-2 border-border-default bg-bg-default p-4">
                    {shouldShowAvvisActions ? (
                        <AvvisSection />
                    ) : (
                        <ActionSection
                            fnr={oppgave.values.fnrPasient}
                            registerResult={result}
                            focusErrorSection={focusErrorSection}
                        />
                    )}
                </div>
            </form>
        </FormProvider>
    )
}

export default SykmeldingForm
