import React from 'react'
import { Button } from '@navikt/ds-react'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'
import { Cancel } from '@navikt/ds-icons'

import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'
import { SykmeldingFormValues } from '../SykmeldingForm'
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated'

import { useHandleSave } from './mutations/useHandleSave'
import { useHandleTilbakeTilGosys } from './mutations/useTilbakeTilGosys'
import MutationFeedbackSection from './MutationFeedbackSection'
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
                <Button type="submit" loading={registerResult.loading}>
                    Registrer og send
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
                    Lagre og lukk
                </Button>
                <Button
                    variant="tertiary"
                    type="button"
                    icon={<Cancel role="img" aria-hidden />}
                    onClick={tilbakeTilGosys}
                >
                    Dette er ikke en sykmelding
                </Button>
            </div>
        </div>
    )
}

export default ActionSection
