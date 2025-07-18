import { ReactElement } from 'react'
import { Button } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'

import { UtenlanskFormValues } from '../SykmeldingForm'
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated'
import ConfirmButton from '../../ConfirmButton/ConfirmButton'
import { redirectTilGosys } from '../../../utils/gosys'

import { useHandleSave } from './mutations/useHandleSave'
import { useHandleTilbakeTilGosys } from './mutations/useTilbakeTilGosys'
import MutationFeedbackSection, { MutationResultFeedback } from './MutationFeedbackSection'
import styles from './ActionSection.module.css'

interface Props {
    fnr: string
    registerResult: MutationResult<SaveOppgaveMutation>
    focusErrorSection: () => void
    disableUnsavedWarning: () => void
}

function ActionSection({ fnr, registerResult, focusErrorSection, disableUnsavedWarning }: Props): ReactElement {
    const { getValues, reset, trigger } = useFormContext<UtenlanskFormValues>()
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
        <div>
            <MutationFeedbackSection
                registerResult={registerResult}
                saveResult={saveResult}
                tilbakeTilGosysResult={tilbakeTilGosysResult}
            />

            <div className={styles.buttons}>
                <ConfirmButton
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
                        body: [
                            'Sykmeldingen vil da bli digitalisert, og blir tilgjengelig for den sykmeldte på nav.no under "Ditt sykefravær".',
                        ],
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
                        disableUnsavedWarning()

                        saveAndClose(getValues())
                    }}
                    loading={saveResult.loading}
                >
                    Lagre og lukk
                </Button>
                <ConfirmButton
                    variant="tertiary"
                    confirmation={{
                        title: 'Er du sikker på at dette ikke er en sykmelding?',
                        body: [
                            'Dersom du er sikker på at dette ikke er en utenlandsk sykmelding kan du sende den tilbake til Gosys for journalføring der.',
                        ],
                        confirmButton: {
                            text: 'Ja, jeg er sikker',
                            type: 'button',
                            onClick: async () => {
                                reset(undefined, { keepValues: true })
                                disableUnsavedWarning()

                                tilbakeTilGosys()
                            },
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

export default ActionSection
