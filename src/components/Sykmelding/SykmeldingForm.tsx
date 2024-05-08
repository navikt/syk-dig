import { FormProvider, useForm } from 'react-hook-form'
import { ReactElement, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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

export interface UtenlanskFormValues {
    diagnoser: DiagnoseFormSectionValues
    behandletTidspunkt: Date | string | null
    land: string | null
    periode: Array<PeriodeFormValue>
    mangelfullSykmelding: boolean
    erAdresseUtland: boolean | null
    avvisningsgrunnAnnet?: string
}

interface Props {
    oppgave: OppgaveFragment
}

function SykmeldingForm({ oppgave }: Props): ReactElement {
    const router = useRouter()
    const params = useSearchParams()

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
                if (params?.get('source') === 'registrer-sykmelding') {
                    router.push('/registrer-sykmelding')
                } else {
                    redirectTilGosys()
                }
            }, 100)
        },
    })

    const form = useForm<UtenlanskFormValues>({
        defaultValues: createDefaultValues(oppgave.values),
        shouldFocusError: false,
    })
    const shouldShowAvvisActions = form.watch('mangelfullSykmelding') === true

    // RHF has a weird interaction with "reset" where the form is set to dirty, but is then immediately
    // re-rendered as dirty. I can't figure out why, so let's explicitly disable the warn manually when required to save.
    const [disableWarnUnsaved, setDisableWarnUnsaved] = useState(false)
    useWarnUnsavedPopup(!disableWarnUnsaved && form.formState.isDirty && !form.formState.isSubmitSuccessful)

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
                        <AvvisSection disableUnsavedWarning={() => setDisableWarnUnsaved(true)} />
                    ) : (
                        <ActionSection
                            fnr={oppgave.values.fnrPasient}
                            registerResult={result}
                            focusErrorSection={focusErrorSection}
                            disableUnsavedWarning={() => setDisableWarnUnsaved(true)}
                        />
                    )}
                </div>
            </form>
        </FormProvider>
    )
}

export default SykmeldingForm
