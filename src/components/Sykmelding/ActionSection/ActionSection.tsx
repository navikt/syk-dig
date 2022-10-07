import React from 'react';
import { Button, Radio, RadioGroup } from '@navikt/ds-react';
import { Edit, Success } from '@navikt/ds-icons';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import SykmeldingSection, { SectionHeader } from '../../SykmeldingSection/SykmeldingSection';

import styles from './ActionSection.module.css';

function ActionSection(): JSX.Element {
    const { handleSubmit } = useFormContext<FormData>();

    const registerAndSubmit: SubmitHandler<FormData> = (data): void => {
        console.log('data register', data);
    };

    const saveAndClose: SubmitHandler<FormData> = (data): void => {
        console.log('data save', data);
    };

    return (
        <SykmeldingSection title="Registrer opplysningene" Icon={Success} variant="light">
            <RadioGroup
                className={styles.radioGroupInfo}
                legend="Er alle opplysningene korrekte?"
                hideLegend
                onChange={() => void 0}
                defaultValue="everything_ok"
            >
                <Radio value="everything_ok">Alle opplysningene fra sykmeldingen er lagt inn</Radio>
                <Radio value="some_missing">Sykmeldingen mangler opplysninger</Radio>
            </RadioGroup>
            <Button type="button" onClick={handleSubmit(registerAndSubmit)}>
                Registrere og send
            </Button>
            <section aria-labelledby="subsection-other-actions" className={styles.subActionSection}>
                <SectionHeader headingId="subsection-other-actions" title="Andre valg" Icon={Edit} />
                <div className={styles.otherActionButtons}>
                    <Button variant="secondary" type="button" onClick={handleSubmit(saveAndClose)}>
                        Lagre og lukk
                    </Button>
                    <Button variant="tertiary" as="a" href="#TODO-return-to-gosys-med-warning">
                        Avbryt
                    </Button>
                </div>
            </section>
        </SykmeldingSection>
    );
}

export default ActionSection;
