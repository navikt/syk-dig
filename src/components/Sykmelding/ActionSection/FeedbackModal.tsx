import { PropsWithChildren, ReactElement } from 'react'
import { Modal } from '@navikt/ds-react'

import styles from './FeedbackModal.module.css'

interface Props {
    title: string
}

function FeedbackModal({ title, children }: PropsWithChildren<Props>): ReactElement {
    return (
        <Modal
            header={{
                heading: title,
                size: 'medium',
                closeButton: false,
            }}
            open
            onClose={() => void 0}
            className={styles.modalRoot}
        >
            <Modal.Body>{children && <div>{children}</div>}</Modal.Body>
        </Modal>
    )
}

export default FeedbackModal
