import React from 'react'
import { Button } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'
import { Cancel } from '@navikt/ds-icons'

import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'
import { SykmeldingFormValues } from '../SykmeldingForm'
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated'
import ConfirmButton from '../../ConfirmButton/ConfirmButton'

import { useHandleSave } from './mutations/useHandleSave'
import { useHandleTilbakeTilGosys } from './mutations/useTilbakeTilGosys'
import MutationFeedbackSection from './MutationFeedbackSection'
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
            if (!isLocalOrDemo) {
                window.location.href = publicEnv.gosysUrl
            }
        },
    })
    const [tilbakeTilGosys, tilbakeTilGosysResult] = useHandleTilbakeTilGosys({
        onCompleted: () => {
            if (!isLocalOrDemo) {
                window.location.href = publicEnv.gosysUrl
            }
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
                    type="submit"
                    form="sykmelding-form"
                    loading={registerResult.loading}
                    preModalCheck={async () => {
                        // Only open modal if form validates
                        const formValid = await trigger()

                        if (!formValid) {
                            focusErrorSection()
                        }

                        return formValid
                    }}
                    confirmation={{
                        confirmButtonLabel: 'Registrer og send',
                        title: 'Er du sikker på at du vil registrere og sende inn sykmeldingen?',
                        body: ['Sykmeldingen vil bli registrert og sendt til Gosys'],
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
                    type="button"
                    icon={<Cancel role="img" aria-hidden />}
                    onConfirm={tilbakeTilGosys}
                    confirmation={{
                        confirmButtonLabel: 'Ja, dette er ikke en sykmelding',
                        title: 'Er du sikker på at dette ikke er en sykmelding?',
                        body: ['Dersom du er sikker på at dette ikke er en sykmelding, sendes den tilbake til Gosys.'],
                    }}
                >
                    Dette er ikke en sykmelding
                </ConfirmButton>
            </div>
        </div>
    )
}

export default ActionSection
