import React, { PropsWithChildren, ReactElement, ReactNode } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

type Props = {
    title: string | ReactNode
    className?: string
}

function FormInfo({ title, className, children }: PropsWithChildren<Props>): ReactElement {
    return (
        <div className={className}>
            <Heading level="3" size="xsmall">
                {title}
            </Heading>
            {typeof children === 'string' ? <BodyShort>{children}</BodyShort> : children}
        </div>
    )
}

export default FormInfo
