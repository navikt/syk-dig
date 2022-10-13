import React, { PropsWithChildren } from 'react';
import { BodyLong, Heading, Modal } from '@navikt/ds-react';

import styles from './FeedbackModal.module.css';

interface Props {
    title: string;
    body?: string;
}

function FeedbackModal({ title, body, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <Modal
            open
            onClose={() => void 0}
            closeButton={false}
            aria-labelledby="feedback-modal-header"
            className={styles.modalRoot}
        >
            <Modal.Content>
                <Heading spacing level="2" size="medium">
                    {title}
                </Heading>
                <BodyLong spacing>{body}</BodyLong>
                {children && <div>{children}</div>}
            </Modal.Content>
        </Modal>
    );
}

export default FeedbackModal;
