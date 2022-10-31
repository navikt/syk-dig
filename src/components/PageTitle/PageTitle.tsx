import React from 'react'
import { Heading, Ingress } from '@navikt/ds-react'

import styles from './PageTitle.module.css'

interface Props {
    title: string
    titleId?: string
    ingress: string
    titleActions?: React.ReactNode
}

function PageTitle({ title, titleId, ingress, titleActions }: Props): JSX.Element {
    return (
        <div className={styles.pageTitle}>
            <Heading id={titleId} size="xlarge">
                {title}
            </Heading>
            <Ingress>{ingress}</Ingress>
            {titleActions && <div className={styles.titleActions}>{titleActions}</div>}
        </div>
    )
}

export default PageTitle
