import React, { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

type Props = {
    title: string | ReactNode
    className?: string
    headingLeave?: '1' | '2' | '3' | '4' | '5' | '6' | undefined
}

function FormInfo({ title, className, children, headingLeave = '3' }: PropsWithChildren<Props>): ReactElement {
    return (
        <div className={className}>
            <Heading level={headingLeave} size="xsmall">
                {title}
            </Heading>
            {typeof children === 'string' ? <BodyShort>{children}</BodyShort> : children}
        </div>
    )
}

export default FormInfo
