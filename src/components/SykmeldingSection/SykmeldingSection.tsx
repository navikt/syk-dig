import { PropsWithChildren } from 'react';
import { Heading } from '@navikt/ds-react';
import { Calender } from '@navikt/ds-icons';
import cn from 'clsx';

import styles from './SykmeldingSection.module.css';

export interface Props {
    id?: string;
    Icon: typeof Calender;
    title: string;
    variant?: 'blue' | 'light';
}

function SykmeldingSection({ id, Icon, title, children, variant = 'blue' }: PropsWithChildren<Props>): JSX.Element {
    return (
        <section className={cn(styles.section, { [styles.lightSection]: variant === 'light' })} aria-labelledby={id}>
            <SectionHeader headingId={id} title={title} Icon={Icon} />
            {children}
        </section>
    );
}

interface SectionHeaderProps {
    headingId?: string;
    title: string;
    Icon: typeof Calender;
}

export function SectionHeader({ headingId, title, Icon }: SectionHeaderProps): JSX.Element {
    return (
        <div className={styles.heading}>
            <Icon aria-hidden />
            <Heading level="2" size="medium" id={headingId}>
                {title}
            </Heading>
        </div>
    );
}

export default SykmeldingSection;
