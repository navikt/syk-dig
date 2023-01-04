import React, { PropsWithChildren, ReactNode, useState } from 'react'
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react'
import { ButtonProps } from '@navikt/ds-react'

import styles from './ConfirmButton.module.css'

interface Props extends Pick<ButtonProps, 'variant' | 'icon'> {
    id: string
    preModalCheck?: () => Promise<boolean>
    confirmation: {
        title: string
        body: string[]
        feedback: ReactNode | undefined
        hide: boolean
        confirmButton: {
            text: string
        } & Pick<ButtonProps, 'onClick' | 'type' | 'form' | 'loading'>
        closeButton: Pick<ButtonProps, 'onClick'>
    }
}

function ConfirmButton({
    id,
    children,
    variant,
    icon,
    preModalCheck,
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
            <Modal open={showConfirm && !confirmation.hide} onClose={closeModal} aria-labelledby={id}>
                <Modal.Content className={styles.confirmationModalContent}>
                    <Heading id={id} spacing level="2" size="medium" className={styles.confirmationModalHeader}>
                        {confirmation.title}
                    </Heading>
                    {confirmation.body.map((paragraph) => (
                        <BodyShort key={paragraph} spacing>
                            {paragraph}
                        </BodyShort>
                    ))}
                    {confirmation.feedback}
                    <div className={styles.confirmationButtons}>
                        <Button
                            onClick={(event) => {
                                closeModal()
                                confirmation.closeButton?.onClick?.(event)
                            }}
                            type="button"
                            variant="secondary"
                        >
                            Avbryt
                        </Button>
                        <Button
                            onClick={confirmation.confirmButton.onClick}
                            type={confirmation.confirmButton.type}
                            form={confirmation.confirmButton.form}
                            variant="danger"
                            loading={confirmation.confirmButton.loading}
                        >
                            {confirmation.confirmButton.text}
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ConfirmButton
