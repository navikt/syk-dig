import React, { ReactElement } from 'react'
import { Alert, Button } from '@navikt/ds-react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useMutation } from '@apollo/client/react'
import { ArrowLeftIcon } from '@navikt/aksel-icons'

import { OppgaveValues, Person } from '../../graphql/queries/graphql.generated'
import Errors, { useErrorSection } from '../Errors/Errors'
import { bundledEnv, isLocalOrDemo } from '../../utils/env'
import ConfirmButton from '../ConfirmButton/ConfirmButton'
import { redirectTilModia } from '../../utils/modia'

import { useHandleUpdateSykmelding } from './ActionSection/mutations/useHandleSave'
import { UtenlanskFormValues } from './SykmeldingForm'
import { createDefaultValues } from './formDataUtils'
import Pasientopplysninger from './Pasientopplysninger'
import Sykmeldingsperiode from './Sykmeldingsperiode'
import DiagnoseFormSection from './DiagnoseFormSection'
import AndreOpplysninger from './AndreOpplysninger'
import { MutationResultFeedback } from './ActionSection/MutationFeedbackSection'
import FeedbackModal from './ActionSection/FeedbackModal'
import styles from './ActionSection/MutationFeedbackSection.module.css'

interface Props {
    values: OppgaveValues
    person: Person
}

export function UpdateSykmeldingForm({ values, person }: Props): ReactElement {
    const [errorRef, focusErrorSection] = useErrorSection()
    const [onUpdate, result] = useHandleUpdateSykmelding({
        fnr: values.fnrPasient,
        onCompleted: () => {
            // TODO: Better solution to this hacky implementation of a delay:
            // Necessary to let RHF re-render with isSubmitSuccessful before we redirect to Gosys
            setTimeout(() => {
                redirectTilModia()
            }, 1000)
        },
    })

    const form = useForm<UtenlanskFormValues>({
        defaultValues: createDefaultValues(values),
        shouldFocusError: false,
    })

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onUpdate, focusErrorSection)} id="update-sykmelding-form">
                <Pasientopplysninger fnr={values.fnrPasient} person={person} />
                <Sykmeldingsperiode />
                <DiagnoseFormSection />
                <AndreOpplysninger />
                <Errors ref={errorRef} />
                <UpdateSykmeldingAction submitResult={result} />
            </form>
        </FormProvider>
    )
}

interface UpdateSykmeldingActionProps {
    submitResult: useMutation.Result
}

function isMutationSuccess(result: useMutation.Result): boolean {
    return result.called && !result.loading && !result.error
}

function UpdateSykmeldingAction({ submitResult }: UpdateSykmeldingActionProps): ReactElement {
    const { trigger } = useFormContext<UtenlanskFormValues>()

    return (
        <div className="flex flex-col gap-8 p-8 border-t-2 border-border-default">
            <MutationFeedback submitResult={submitResult} />
            <ConfirmButton
                preModalCheck={async () => {
                    // Only open modal if form validates
                    return await trigger()
                }}
                confirmation={{
                    title: 'Er du sikker på at du vil oppdatere sykmeldingen?',
                    body: [
                        'Sykmeldingen vil da bli oppdatert, oppdatert sykmelding vises for den sykmeldte på nav.no under "Ditt sykefravær". Er sykmeldingen sendt til arbeidsgiver vil den ikke bli sendt på nytt',
                        'Det kan ta litt tid før sykmeldingen blir oppdatert i modia',
                    ],
                    confirmButton: {
                        text: 'Ja, jeg er sikker',
                        type: 'submit',
                        form: 'update-sykmelding-form',
                        loading: submitResult.loading,
                    },
                    closeButton: {
                        onClick: () => {
                            submitResult.reset()
                        },
                    },
                    feedback: <MutationResultFeedback result={submitResult} what="lagre" />,
                    hide: isMutationSuccess(submitResult),
                }}
            >
                Korriger og oppdater sykmelding
            </ConfirmButton>
            <div>
                <Button
                    size="small"
                    variant="tertiary"
                    as="a"
                    href={bundledEnv.NEXT_PUBLIC_MODIA_URL}
                    icon={<ArrowLeftIcon />}
                >
                    Tilbake til Modia
                </Button>
            </div>
        </div>
    )
}

function MutationFeedback({ submitResult }: UpdateSykmeldingActionProps): ReactElement {
    return (
        <MutationResultFeedback what="oppdatere" result={submitResult}>
            <FeedbackModal title="Sykmeldingen ble lagret">
                {isLocalOrDemo && (
                    <Alert className={styles.demoWarning} variant="warning">
                        Dette er bare en demo, du blir ikke sendt tilbake til Modia
                    </Alert>
                )}
                <Alert variant="success" className={styles.saveSuccess}>
                    Sykmeldingen ble oppdatert, sender deg tilbake til Modia...
                </Alert>
                <Button variant="tertiary" as="a" href={bundledEnv.NEXT_PUBLIC_MODIA_URL}>
                    Klikk her dersom du ikke blir videresendt...
                </Button>
            </FeedbackModal>
        </MutationResultFeedback>
    )
}
