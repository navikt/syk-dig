import { PropsWithChildren } from 'react';
import { Heading } from '@navikt/ds-react';
import { Calender } from '@navikt/ds-icons';

import styles from './SykmeldingSection.module.css';

export interface Props {
    Icon: typeof Calender;
    ariaLabelIcon: string;
    title: string;
}

function SykmeldingSection({ Icon, ariaLabelIcon, title, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <section className={styles.section}>
            <div className={styles.heading}>
                <Icon aria-label={ariaLabelIcon} />
                <Heading level="2" size="medium">
                    {title}
                </Heading>
            </div>
            {children}
        </section>
    );
}

export default SykmeldingSection;
