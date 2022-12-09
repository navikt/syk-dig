import React, { PropsWithChildren } from 'react'
import { Alert, Button } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'

import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'
import { SykmeldingFormValues } from '../SykmeldingForm'
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated'

import FeedbackModal from './FeedbackModal'
import { useHandleSave } from './useHandleSave'
import styles from './ActionSection.module.css'

const publicEnv = getPublicEnv()

interface Props {
    fnr: string
    registerResult: MutationResult<SaveOppgaveMutation>
}

function ActionSection({ fnr, registerResult }: Props): JSX.Element {
    const { getValues, reset } = useFormContext<SykmeldingFormValues>()
    const [saveAndClose, saveResult] = useHandleSave({
        fnr,
        onCompleted: () => {
            if (!isLocalOrDemo) {
                window.location.href = publicEnv.gosysUrl
            }
        },
    })

    return (
        <div className={styles.stickyActionSection}>
            <MutationResultFeedback what="registrere" result={registerResult}>
                <FeedbackModal title="Sykmeldingen er registrert">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du kan ikke gå til gosys. Last siden på nytt for å fortsette demoen.
                        </Alert>
                    )}
                    <Button variant="secondary" as="a" href={publicEnv.gosysUrl}>
                        Tilbake til GOSYS
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>
            <MutationResultFeedback what="lagre" result={saveResult}>
                <FeedbackModal title="Sykmeldingen ble lagret">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du blir ikke sendt tilbake til GOSYS
                        </Alert>
                    )}
                    <Alert variant="success" className={styles.saveSuccess}>
                        Oppgaven ble lagret, sender deg tilbake til GOSYS...
                    </Alert>
                    <Button variant="tertiary" as="a" href={publicEnv.gosysUrl}>
                        Klikk her dersom du ikke blir videresendt...
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>

            <Button type="submit" loading={registerResult.loading}>
                Registrere og send
            </Button>
            <Button
                variant="secondary"
                type="button"
                onClick={() => {
                    /** Reset the form state, any invalid submits etc.,
                     * because we want to save the draft and leave */
                    reset(undefined, { keepValues: true })
                    return saveAndClose(getValues())
                }}
                loading={saveResult.loading}
            >
                Fortsett senere
            </Button>
            <Button variant="tertiary" as="a" href={publicEnv.gosysUrl}>
                Avbryt
            </Button>
        </div>
    )
}

function MutationResultFeedback({
    what,
    result,
    children,
}: PropsWithChildren<{
    what: 'lagre' | 'registrere'
    result: MutationResult<SaveOppgaveMutation>
}>): JSX.Element | null {
    if (!result.called || result.loading) return null

    return (
        <div className={styles.mutationResultFeedback}>
            {result.error ? (
                <Alert variant="error">
                    Kunne ikke {what} sykmeldingen. {result.error.message}
                </Alert>
            ) : (
                children
            )}
        </div>
    )
}

export { useHandleRegister } from './useHandleSave'

export default ActionSection
