import { PropsWithChildren } from 'react'
import { Heading } from '@navikt/ds-react'

export interface Props {
    id?: string
    title: string
    variant?: 'blue' | 'light'
}

function SykmeldingSection({ id, title, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <section className="mt-4 last-of-type:mb-8" aria-labelledby={id}>
            <SectionHeader headingId={id} title={title} />
            <div className="p-4">{children}</div>
        </section>
    )
}

interface SectionHeaderProps {
    headingId?: string
    title: string
}

export function SectionHeader({ headingId, title }: SectionHeaderProps): JSX.Element {
    return (
        <Heading
            level="2"
            size="xsmall"
            id={headingId}
            className="mb-2 flex h-14 items-center bg-bg-subtle pl-4 uppercase"
        >
            {title}
        </Heading>
    )
}

export default SykmeldingSection
