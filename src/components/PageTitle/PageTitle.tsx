import { ReactElement } from 'react'
import { Heading, BodyLong } from '@navikt/ds-react'

import styles from './PageTitle.module.css'

interface Props {
    title: string
    titleId?: string
    ingress: string
    titleActions?: React.ReactNode
}

function PageTitle({ title, titleId, ingress, titleActions }: Props): ReactElement {
    return (
        <div className={styles.pageTitle}>
            <Heading id={titleId} size="xlarge">
                {title}
            </Heading>
            <BodyLong size="large">{ingress}</BodyLong>
            {titleActions && <div className={styles.titleActions}>{titleActions}</div>}
        </div>
    )
}

export default PageTitle
