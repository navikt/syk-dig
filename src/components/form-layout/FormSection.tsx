import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { Heading } from '@navikt/ds-react'

import { SmallHeadingSkeleton } from '../skeleton/Skeletons'
import { cn } from '../../utils/tw-utils'

export interface Props {
    id?: string
    className?: string
    title: string
    variant?: 'blue' | 'light'
}

function FormSection({ id, className, title, children }: PropsWithChildren<Props>): ReactElement {
    return (
        <section className="mt-4 last-of-type:mb-8" aria-labelledby={id}>
            <SectionHeader headingId={id} title={title} />
            <div className={cn('p-4', className)}>{children}</div>
        </section>
    )
}

interface SectionHeaderProps {
    headingId?: string
    title: string | ReactNode
}

export function SectionHeader({ headingId, title }: SectionHeaderProps): ReactElement {
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

export function FormSectionSkeleton({ children }: PropsWithChildren<Omit<Props, 'id' | 'title'>>): ReactElement {
    return (
        <div className="mt-4 last-of-type:mb-8">
            <SectionHeader title={<SmallHeadingSkeleton />} />
            <div className="p-4">{children}</div>
        </div>
    )
}

export default FormSection
