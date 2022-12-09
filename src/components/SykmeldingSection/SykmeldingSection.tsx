import { PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'

import styles from './SykmeldingSection.module.css'

export interface Props {
    id?: string
    title: string
    variant?: 'blue' | 'light'
}

function SykmeldingSection({ id, title, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <section className={styles.section} aria-labelledby={id}>
            <SectionHeader headingId={id} title={title} />
            <div className={styles.content}>{children}</div>
        </section>
    )
}

interface SectionHeaderProps {
    headingId?: string
    title: string
}

export function SectionHeader({ headingId, title }: SectionHeaderProps): JSX.Element {
    return (
        <Heading level="2" size="xsmall" id={headingId} className={styles.heading}>
            {title}
        </Heading>
    )
}

export default SykmeldingSection
