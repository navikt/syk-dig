import React, { PropsWithChildren, useState } from 'react'
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import { ButtonProps } from '@navikt/ds-react'

import styles from './ConfirmButton.module.css'

interface Props extends Pick<ButtonProps, 'variant' | 'type' | 'icon' | 'loading' | 'form'> {
    id: string
    preModalCheck?: () => Promise<boolean>
    onConfirm?: ButtonProps['onClick']
    confirmation: {
        title: string
        body: string[]
        confirmButtonLabel: string
    }
}

function ConfirmButton({
    id,
    children,
    variant,
    form,
    type,
    icon,
    loading,
    preModalCheck,
    onConfirm,
    confirmation,
}: PropsWithChildren<Props>): JSX.Element {
    const [showConfirm, setShowConfirm] = useState(false)
    const closeModal = (): void => setShowConfirm(false)

    return (
        <>
            <Button
                onClick={async () => {
                    if ((await preModalCheck?.()) ?? true) {
                        setShowConfirm(true)
                    }
                }}
                type="button"
                icon={icon}
                variant={variant}
            >
                {children}
            </Button>
            <Modal open={showConfirm} onClose={closeModal} aria-labelledby={id}>
                <Modal.Content className={styles.confirmationModalContent}>
                    <Heading id={id} spacing level="2" size="medium" className={styles.confirmationModalHeader}>
                        {confirmation.title}
                    </Heading>
                    {confirmation.body.map((paragraph) => (
                        <BodyShort key={paragraph}>{paragraph}</BodyShort>
                    ))}
                    <div className={styles.confirmationButtons}>
                        <Button onClick={onConfirm} type={type} form={form} variant="danger" loading={loading}>
                            {confirmation.confirmButtonLabel}
                        </Button>
                        <Button onClick={closeModal} type="button" variant="tertiary">
                            Avbryt
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ConfirmButton
