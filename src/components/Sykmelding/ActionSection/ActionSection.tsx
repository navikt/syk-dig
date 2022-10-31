import React, { PropsWithChildren } from 'react'
import { Alert, Button, Radio, RadioGroup } from '@navikt/ds-react'
import { Edit, Success } from '@navikt/ds-icons'
import { useFormContext } from 'react-hook-form'
import { MutationResult } from '@apollo/client'

import SykmeldingSection, { SectionHeader } from '../../SykmeldingSection/SykmeldingSection'
import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'
import { SykmeldingFormValues } from '../SykmeldingForm'
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated'

import FeedbackModal from './FeedbackModal'
import { useHandleSave } from './useHandleSave'
import styles from './ActionSection.module.css'

const publicEnv = getPublicEnv()

export interface ActionFormSectionValues {
    registerOppgaveStatus: 'everything_ok' | 'some_missing'
}

interface Props {
    registerResult: MutationResult<SaveOppgaveMutation>
}

function ActionSection({ registerResult }: Props): JSX.Element {
    const { register, getValues, reset } = useFormContext<SykmeldingFormValues>()
    const [saveAndClose, saveResult] = useHandleSave({
        onCompleted: () => {
            if (!isLocalOrDemo) {
                window.location.href = publicEnv.gosysUrl
            }
        },
    })

    return (
        <SykmeldingSection title="Registrer opplysningene" Icon={Success} variant="light">
            <RadioGroup
                {...register('action.registerOppgaveStatus')}
                className={styles.radioGroupInfo}
                legend="Er alle opplysningene korrekte?"
                hideLegend
                onChange={() => void 0}
                defaultValue="everything_ok"
            >
                <Radio value="everything_ok">Alle opplysningene fra sykmeldingen er lagt inn</Radio>
                <Radio value="some_missing">Sykmeldingen mangler opplysninger</Radio>
            </RadioGroup>
            <Button type="submit" loading={registerResult.loading}>
                Registrere og send
            </Button>
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
            <section aria-labelledby="subsection-other-actions" className={styles.subActionSection}>
                <SectionHeader headingId="subsection-other-actions" title="Andre valg" Icon={Edit} />
                <div className={styles.otherActionButtons}>
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
                <MutationResultFeedback what="lagre" result={saveResult}>
                    <Alert variant="success">Oppgaven ble lagret, sender deg tilbake til GOSYS...</Alert>
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du blir ikke sendt tilbake til GOSYS
                        </Alert>
                    )}
                </MutationResultFeedback>
            </section>
        </SykmeldingSection>
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
