import { PropsWithChildren, ReactElement, ReactNode, useState } from 'react'
import { BodyShort, Button, Modal } from '@navikt/ds-react'
import { ButtonProps } from '@navikt/ds-react'

interface Props extends Pick<ButtonProps, 'variant' | 'icon'> {
    preModalCheck?: () => Promise<boolean>
    confirmation: {
        title: string
        body: (string | ReactNode)[]
        feedback: ReactNode | undefined
        hide: boolean
        confirmButton: {
            text: string
        } & Pick<ButtonProps, 'onClick' | 'type' | 'form' | 'loading'>
        closeButton: Pick<ButtonProps, 'onClick'>
    }
}

function ConfirmButton({
    children,
    variant,
    icon,
    preModalCheck,
    confirmation,
}: PropsWithChildren<Props>): ReactElement {
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
            <Modal
                header={{
                    heading: confirmation.title,
                    size: 'medium',
                }}
                open={showConfirm && !confirmation.hide}
                onClose={closeModal}
                className="max-w-lg"
            >
                <Modal.Body className="min-h-[fit-content]">
                    {confirmation.body.map((paragraph) =>
                        typeof paragraph === 'string' ? (
                            <BodyShort key={paragraph} spacing>
                                {paragraph}
                            </BodyShort>
                        ) : (
                            paragraph
                        ),
                    )}
                    {confirmation.feedback}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={confirmation.confirmButton.onClick}
                        type={confirmation.confirmButton.type}
                        form={confirmation.confirmButton.form}
                        variant="danger"
                        loading={confirmation.confirmButton.loading}
                    >
                        {confirmation.confirmButton.text}
                    </Button>
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
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmButton
