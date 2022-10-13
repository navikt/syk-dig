import React, { PropsWithChildren } from 'react';
import { Alert, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Edit, Success } from '@navikt/ds-icons';
import { useFormContext } from 'react-hook-form';
import { MutationResult } from '@apollo/client';

import SykmeldingSection, { SectionHeader } from '../../SykmeldingSection/SykmeldingSection';
import { getPublicEnv } from '../../../utils/env';
import { SykmeldingFormValues } from '../SykmeldingForm';
import { SaveOppgaveMutation } from '../../../graphql/queries/graphql.generated';

import FeedbackModal from './FeedbackModal';
import { useHandleRegister, useHandleSave } from './useHandleSave';
import styles from './ActionSection.module.css';

const publicEnv = getPublicEnv();

export interface ActionFormSectionValues {
    registerOppgaveStatus: 'everything_ok' | 'some_missing';
}

function ActionSection(): JSX.Element {
    const { handleSubmit, register } = useFormContext<SykmeldingFormValues>();
    const [saveAndClose, saveResult] = useHandleSave({
        onCompleted: () => {
            window.location.href = publicEnv.gosysUrl;
        },
    });
    const [registerAndSubmit, registerResult] = useHandleRegister();

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
            <Button type="button" onClick={handleSubmit(registerAndSubmit)} loading={registerResult.loading}>
                Registrere og send
            </Button>
            <MutationResultFeedback result={registerResult}>
                <FeedbackModal title="Sykmeldingen er registrert">
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
                        onClick={handleSubmit(saveAndClose)}
                        loading={saveResult.loading}
                    >
                        Fortsett senere
                    </Button>
                    <Button variant="tertiary" as="a" href={publicEnv.gosysUrl}>
                        Avbryt
                    </Button>
                </div>
                <MutationResultFeedback result={saveResult}>
                    <Alert variant="success">Oppgaven ble lagret, sender deg tilbake til GOSYS...</Alert>
                </MutationResultFeedback>
            </section>
        </SykmeldingSection>
    );
}

function MutationResultFeedback({
    result,
    children,
}: PropsWithChildren<{ result: MutationResult<SaveOppgaveMutation> }>): JSX.Element | null {
    if (!result.called || result.loading) return null;

    return result.error ? <Alert variant="error">Kunne ikke registrere sykmeldingen</Alert> : <>{children}</>;
}

export default ActionSection;
