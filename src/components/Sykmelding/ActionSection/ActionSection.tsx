import React from 'react'
import { Button } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'

import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'
import { SykmeldingFormValues } from '../SykmeldingForm'
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated'
import ConfirmButton from '../../ConfirmButton/ConfirmButton'

import { useHandleSave } from './mutations/useHandleSave'
import { useHandleTilbakeTilGosys } from './mutations/useTilbakeTilGosys'
import MutationFeedbackSection, { MutationResultFeedback } from './MutationFeedbackSection'
import styles from './ActionSection.module.css'

const publicEnv = getPublicEnv()

interface Props {
    fnr: string
    registerResult: MutationResult<SaveOppgaveMutation>
    focusErrorSection: () => void
}

function ActionSection({ fnr, registerResult, focusErrorSection }: Props): JSX.Element {
    const { getValues, reset, trigger } = useFormContext<SykmeldingFormValues>()
    const [saveAndClose, saveResult] = useHandleSave({
        fnr,
        onCompleted: () => {
            redirectTilGosys()
        },
    })
    const [tilbakeTilGosys, tilbakeTilGosysResult] = useHandleTilbakeTilGosys({
        onCompleted: () => {
            redirectTilGosys()
        },
    })

    return (
        <div className={styles.stickyActionSection}>
            <MutationFeedbackSection
                registerResult={registerResult}
                saveResult={saveResult}
                tilbakeTilGosysResult={tilbakeTilGosysResult}
            />

            <div className={styles.buttons}>
                <ConfirmButton
                    id="registrer-og-send"
                    preModalCheck={async () => {
                        // Only open modal if form validates
                        const formValid = await trigger()

                        if (!formValid) {
                            focusErrorSection()
                        }

                        return formValid
                    }}
                    confirmation={{
                        title: 'Er du sikker på at du vil registrere og sende inn sykmeldingen?',
                        body: ['Sykmeldingen vil bli sendt til den sykmeldte.'],
                        confirmButton: {
                            text: 'Ja, jeg er sikker',
                            type: 'submit',
                            form: 'sykmelding-form',
                            loading: registerResult.loading,
                        },
                        closeButton: {
                            onClick: () => {
                                registerResult.reset()
                            },
                        },
                        feedback: <MutationResultFeedback result={registerResult} what="registrere" />,
                        hide: isMutationSuccess(registerResult),
                    }}
                >
                    Registrer og send
                </ConfirmButton>
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
                    Lagre og lukk
                </Button>
                <ConfirmButton
                    id="tilbake-til-gosys"
                    variant="tertiary"
                    confirmation={{
                        title: 'Er du sikker på at dette ikke er en sykmelding?',
                        body: [
                            'Dersom du er sikker på at dette ikke er en utenlandsk sykmelding kan du sende den tilbake til Gosys for journalføring der.',
                        ],
                        confirmButton: {
                            text: 'Ja, jeg er sikker',
                            type: 'button',
                            onClick: tilbakeTilGosys,
                            loading: tilbakeTilGosysResult.loading,
                        },
                        closeButton: {
                            onClick: () => {
                                tilbakeTilGosysResult.reset()
                            },
                        },
                        feedback: <MutationResultFeedback result={tilbakeTilGosysResult} what="sende tilbake" />,
                        hide: isMutationSuccess(tilbakeTilGosysResult),
                    }}
                >
                    Ikke en sykmelding?
                </ConfirmButton>
            </div>
        </div>
    )
}

function isMutationSuccess(result: MutationResult): boolean {
    return result.called && !result.loading && !result.error
}

export function redirectTilGosys(): void {
    if (!isLocalOrDemo) {
        window.location.href = publicEnv.gosysUrl
    }
}

export default ActionSection
