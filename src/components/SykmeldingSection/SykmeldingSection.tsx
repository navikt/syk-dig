import { PropsWithChildren } from 'react';
import { Heading } from '@navikt/ds-react';
import { Calender } from '@navikt/ds-icons';

import styles from './SykmeldingSection.module.css';

export interface Props {
    id?: string;
    Icon: typeof Calender;
    title: string;
}

function SykmeldingSection({ id, Icon, title, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <section className={styles.section} aria-labelledby={id}>
            <div className={styles.heading}>
                <Icon aria-hidden />
                <Heading level="2" size="medium" id={id}>
                    {title}
                </Heading>
            </div>
            {children}
        </section>
    );
}

export default SykmeldingSection;
