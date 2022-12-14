import { MutationResult } from '@apollo/client'
import { Alert, Button } from '@navikt/ds-react'
import React, { PropsWithChildren } from 'react'

import { SaveOppgaveMutation, TilbakeTilGosysMutation } from '../../../graphql/queries/graphql.generated'
import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'

import FeedbackModal from './FeedbackModal'
import styles from './MutationFeedbackSection.module.css'

const publicEnv = getPublicEnv()

type Props = {
    registerResult: MutationResult<SaveOppgaveMutation>
    saveResult: MutationResult<SaveOppgaveMutation>
    tilbakeTilGosysResult: MutationResult<TilbakeTilGosysMutation>
}

function MutationFeedbackSection({ registerResult, saveResult, tilbakeTilGosysResult }: Props): JSX.Element {
    return (
        <div>
            <MutationResultFeedback what="registrere" result={registerResult}>
                <FeedbackModal title="Sykmeldingen er registrert">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du kan ikke gå til gosys. Last siden på nytt for å fortsette demoen.
                        </Alert>
                    )}
                    <Alert variant="success" className={styles.saveSuccess}>
                        Oppgaven ble registrert
                    </Alert>
                    <Button variant="tertiary" as="a" href={publicEnv.gosysUrl}>
                        Klikk her dersom du ikke blir videresendt...
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
            <MutationResultFeedback what="sende tilbake" result={tilbakeTilGosysResult}>
                <FeedbackModal title="Sykmeldingen ble sendt tilbake til Gosys">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du blir ikke sendt tilbake til GOSYS
                        </Alert>
                    )}
                    <Alert variant="success" className={styles.saveSuccess}>
                        Sykmeldingen ble sendt tilbake til Gosys, sender deg tilbake til GOSYS...
                    </Alert>
                    <Button variant="tertiary" as="a" href={publicEnv.gosysUrl}>
                        Klikk her dersom du ikke blir videresendt...
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>
        </div>
    )
}

export function MutationResultFeedback({
    what,
    result,
    children,
}: PropsWithChildren<{
    what: 'lagre' | 'registrere' | 'sende tilbake'
    result: MutationResult
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

export default MutationFeedbackSection
