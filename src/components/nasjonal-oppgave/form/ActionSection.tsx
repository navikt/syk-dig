import React, { ReactElement, useState } from 'react'
import { Alert, BodyShort, Button, ConfirmationPanel, Heading, List } from '@navikt/ds-react'
import { MutationResult } from '@apollo/client'
import { ArrowLeftIcon } from '@navikt/aksel-icons'

import { MutationResultFeedback } from '../../Sykmelding/ActionSection/MutationFeedbackSection'
import FeedbackModal from '../../Sykmelding/ActionSection/FeedbackModal'
import { bundledEnv, isLocalOrDemo } from '../../../utils/env'
import styles from '../../Sykmelding/ActionSection/MutationFeedbackSection.module.css'
import { redirectTilGosys } from '../../../utils/gosys'
import { RuleHitErrors } from '../schema/RuleHitErrors'

import { useAvvisSykmeldingSmreg, useTilbakeTilGosysSmreg } from './useOtherSykmeldingActions'
import SendToGosysButton from './SendToGosysButton'
import AvvisButton from './AvvisButton'

type Props = {
    oppgaveId: string
    ferdigstilt: boolean
    submitResult: MutationResult
}

function ActionSection({ oppgaveId, ferdigstilt, submitResult }: Props): ReactElement {
    const [everythingGood, setEverythingGood] = useState(false)
    const [tilbakeTilGosys, tilbakeTilGosysResult] = useTilbakeTilGosysSmreg({
        onCompleted: () => {
            redirectTilGosys()
        },
    })
    const [avvisSykmelding, avvisSykmeldingResult] = useAvvisSykmeldingSmreg({
        onCompleted: () => {
            redirectTilGosys()
        },
    })

    return (
        <div className="flex flex-col gap-8 p-8 border-t-2 border-border-default">
            <OtherMutationsResult
                tilbakeTilGosysResult={tilbakeTilGosysResult}
                avvisSykmeldingResult={avvisSykmeldingResult}
            />
            <SubmitResult submitResult={submitResult} />
            <div className="flex flex-col gap-4">
                <ConfirmationPanel
                    checked={everythingGood}
                    disabled={submitResult.loading}
                    label="Feltene stemmer overens med opplysningene i papirsykmeldingen"
                    onChange={() => setEverythingGood((x) => !x)}
                />
                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!everythingGood || submitResult.loading}
                        loading={submitResult.loading}
                    >
                        {ferdigstilt ? 'Korriger' : 'Registrer'} sykmeldingen
                    </Button>
                </div>
            </div>
            {!ferdigstilt && (
                <div className="flex flex-col gap-3">
                    <Heading level="2" size="small">
                        Er det noe galt med sykmeldingen?
                    </Heading>
                    <div className="grid grid-cols-2 gap-3">
                        <SendToGosysButton
                            tilbakeTilGosys={async () => {
                                await tilbakeTilGosys({
                                    variables: { oppgaveId },
                                })
                            }}
                            tilbakeTilGosysResult={tilbakeTilGosysResult}
                        />
                        <AvvisButton
                            avvis={async (reason) => {
                                await avvisSykmelding({
                                    variables: { oppgaveId, input: { reason } },
                                })
                            }}
                            avvisResult={avvisSykmeldingResult}
                        />
                    </div>
                </div>
            )}
            <div>
                <Button
                    size="small"
                    variant="tertiary"
                    as="a"
                    href={ferdigstilt ? bundledEnv.NEXT_PUBLIC_MODIA_URL : bundledEnv.NEXT_PUBLIC_GOSYS_URL}
                    icon={<ArrowLeftIcon />}
                >
                    Tilbake til {ferdigstilt ? 'Modia' : 'GOSYS'}
                </Button>
            </div>
        </div>
    )
}

function SubmitResult({
    submitResult,
}: {
    submitResult: MutationResult<{ ruleHits: RuleHitErrors | null }>
}): ReactElement | null {
    const hasRuleHitErrors = submitResult.data?.ruleHits != null

    if (submitResult.error) {
        return (
            <Alert variant="error">
                <BodyShort>Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.</BodyShort>
            </Alert>
        )
    }

    if (hasRuleHitErrors) {
        return (
            <Alert variant="warning">
                <BodyShort>
                    Baksystemet fant ytterligere feil som må behandles. Rett feilene nedenfor, og forsøk å registrere
                    sykmeldingen på nytt.
                </BodyShort>
                <List>
                    {submitResult.data?.ruleHits?.ruleHits.map((ruleHit) => (
                        <List.Item key={ruleHit.ruleName}>{ruleHit.messageForSender}</List.Item>
                    ))}
                </List>
            </Alert>
        )
    }

    if (submitResult.called && submitResult.data != null) {
        return (
            <FeedbackModal title="Oppgaven ble ferdigstilt">
                {isLocalOrDemo && (
                    <Alert className={styles.demoWarning} variant="warning">
                        Dette er bare en demo, du kan ikke gå til gosys. Last siden på nytt for å fortsette demoen.
                    </Alert>
                )}
                <Alert variant="success" className={styles.saveSuccess}>
                    Oppgaven ble registrert
                </Alert>
                <Button variant="tertiary" as="a" href={bundledEnv.NEXT_PUBLIC_GOSYS_URL}>
                    Klikk her dersom du ikke blir videresendt...
                </Button>
            </FeedbackModal>
        )
    }

    return null
}

function OtherMutationsResult({
    tilbakeTilGosysResult,
    avvisSykmeldingResult,
}: {
    tilbakeTilGosysResult: MutationResult
    avvisSykmeldingResult: MutationResult
}): ReactElement | null {
    return (
        <>
            <MutationResultFeedback what="registrere" result={tilbakeTilGosysResult}>
                <FeedbackModal title="Oppgaven ble sendt tilbake til GOSYS.">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du kan ikke gå til gosys. Last siden på nytt for å fortsette demoen.
                        </Alert>
                    )}
                    <Alert variant="success" className={styles.saveSuccess}>
                        Oppgaven ble sendt tilbake til GOSYS, du blir automatisk videresendt...
                    </Alert>
                    <Button variant="tertiary" as="a" href={bundledEnv.NEXT_PUBLIC_GOSYS_URL}>
                        Klikk her dersom du ikke blir videresendt...
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>
            <MutationResultFeedback what="registrere" result={avvisSykmeldingResult}>
                <FeedbackModal title="Oppgaven ble ferdigstilt.">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du kan ikke gå til gosys. Last siden på nytt for å fortsette demoen.
                        </Alert>
                    )}
                    <Alert variant="success" className={styles.saveSuccess}>
                        Du blir automatisk videresendt tilbake til GOSYS...
                    </Alert>
                    <Button variant="tertiary" as="a" href={bundledEnv.NEXT_PUBLIC_GOSYS_URL}>
                        Klikk her dersom du ikke blir videresendt...
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>
        </>
    )
}

export default ActionSection
