import { FormProvider, useForm } from 'react-hook-form'
import { ReactElement, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Errors, { useErrorSection } from '../Errors/Errors'
import { OppgaveValues, Person } from '../../graphql/queries/graphql.generated'
import useWarnUnsavedPopup from '../../hooks/useWarnUnsaved'
import { redirectTilGosys } from '../../utils/gosys'

import Pasientopplysninger from './Pasientopplysninger'
import Sykmeldingsperiode, { PeriodeFormValue } from './Sykmeldingsperiode'
import DiagnoseFormSection, { DiagnoseFormSectionValues } from './DiagnoseFormSection'
import { createDefaultValues } from './formDataUtils'
import ActionSection from './ActionSection/ActionSection'
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
    values: OppgaveValues
    person: Person
}

function SykmeldingForm({ values, person }: Props): ReactElement {
    const router = useRouter()
    const params = useSearchParams()
    const [errorRef, focusErrorSection] = useErrorSection()

    const [onSave, result] = useHandleRegister({
        fnr: values.fnrPasient,
        onCompleted: () => {
            // TODO: Better solution to this hacky implementation of a delay:
            // Necessary to let RHF re-render with isSubmitSuccessful before we redirect to Gosys
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
        defaultValues: createDefaultValues(values),
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
                <Pasientopplysninger fnr={values.fnrPasient} person={person} />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <AndreOpplysninger />
                <MangelfullSykmelding />
                <Errors ref={errorRef} />
                <div className="bottom-0 z-10 border-t-2 border-border-default bg-bg-default p-4">
                    {shouldShowAvvisActions ? (
                        <AvvisSection disableUnsavedWarning={() => setDisableWarnUnsaved(true)} />
                    ) : (
                        <ActionSection
                            fnr={values.fnrPasient}
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
