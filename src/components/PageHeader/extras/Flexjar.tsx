'use client'

import { Button, BodyLong, Modal, Textarea, Alert, BodyShort } from '@navikt/ds-react'
import React, { ReactElement, useRef, useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { CheckmarkIcon, FaceFrownIcon, FaceIcon, FaceSmileIcon } from '@navikt/aksel-icons'

import { cn } from '../../../utils/tw-utils'

import { sendFlexjarFeedbackAction } from './flexjar-actions'

function Flexjar(): ReactElement {
    const ref = useRef<HTMLDialogElement>(null)
    const [selected, setSelected] = useState<'good' | 'meh' | 'bad' | null>(null)
    const [hasClickedSend, setHasClickedSend] = useState(false)
    const [text, setText] = useState<string | null>(null)
    const [feedbackState, sendFeedbackAction] = useFormState(sendFlexjarFeedbackAction, {
        id: null,
        completed: false,
        error: null,
    })

    useEffect(() => {
        if (feedbackState.completed) {
            ref.current?.close()
        }
    }, [feedbackState.completed])

    return (
        <div>
            <Button
                variant="tertiary-neutral"
                icon={feedbackState.completed ? <CheckmarkIcon /> : <FaceSmileIcon />}
                data-theme="dark"
                className="text-white hover:text-gray-300 grow-0"
                size="small"
                onClick={() => ref.current?.showModal()}
            >
                Tilbakemelding
            </Button>
            <Modal ref={ref} header={{ heading: 'Tilbakemelding' }} data-theme="light">
                <Modal.Body className="max-w-md flex flex-col gap-3">
                    <BodyLong>Hvordan opplever du digitalisering av sykmeldinger i dag?</BodyLong>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-3 gap-3">
                            <FeedbackButton
                                disabled={feedbackState.completed}
                                Icon={FaceFrownIcon}
                                text="Dårlig"
                                selected={selected === 'bad'}
                                onClick={() => {
                                    sendFeedbackAction({
                                        level: 'bad',
                                    })
                                    setSelected('bad')
                                }}
                            />
                            <FeedbackButton
                                disabled={feedbackState.completed}
                                Icon={FaceIcon}
                                text="Helt greit"
                                selected={selected === 'meh'}
                                onClick={() => {
                                    sendFeedbackAction({
                                        level: 'meh',
                                    })
                                    setSelected('meh')
                                }}
                            />
                            <FeedbackButton
                                disabled={feedbackState.completed}
                                Icon={FaceSmileIcon}
                                text="Veldig bra"
                                selected={selected === 'good'}
                                onClick={() => {
                                    sendFeedbackAction({
                                        level: 'good',
                                    })
                                    setSelected('good')
                                }}
                            />
                        </div>
                    </div>
                    {selected != null && !feedbackState.completed && (
                        <Textarea
                            className="mt-4"
                            value={text ?? ''}
                            disabled={feedbackState.completed}
                            onChange={(e) => setText(e.target.value)}
                            label="Fortell oss om din opplevelse (valgfritt)"
                            description={
                                <>
                                    <BodyShort spacing>
                                        Dette er en anonym tilbakemelding til oss. Du må ikke skrive inn noe
                                        personidentifiserende informasjon.
                                    </BodyShort>
                                    <BodyShort>
                                        Du kan alltids kontakte brukerstøtte dersom vil ha svar fra oss direkte.
                                    </BodyShort>
                                </>
                            }
                        />
                    )}
                    {hasClickedSend && feedbackState.error == null && (
                        <Alert variant="success" className="mt-4">
                            <BodyShort spacing={!feedbackState.completed}>Takk for din tilbakemelding!</BodyShort>
                            {!feedbackState.completed && (
                                <BodyShort>Du kan legge til en tekst dersom du kommer på noe. :)</BodyShort>
                            )}
                        </Alert>
                    )}
                    {feedbackState.error && <Alert variant="error">{feedbackState.error}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        disabled={feedbackState.completed}
                        onClick={async () => {
                            if (selected == null || !text || !text.trim()) {
                                ref.current?.close()
                                return
                            }

                            setHasClickedSend(true)
                            sendFeedbackAction({
                                level: selected,
                                text,
                            })
                        }}
                    >
                        Send tilbakemelding
                    </Button>
                    <Button type="button" variant="tertiary" onClick={() => ref.current?.close()}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

function FeedbackButton({
    Icon,
    text,
    selected,
    onClick,
    disabled,
}: {
    Icon: typeof FaceIcon
    text: string
    selected: boolean
    onClick: () => void
    disabled: boolean
}): ReactElement {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(
                'navds-button navds-button--tertiary-neutral flex flex-col grow justify-center items-center p-2 border-2 border-solid border-transparent',
                { 'border-border-action-selected': selected },
            )}
        >
            <Icon
                fontSize="3rem"
                className={cn('rounded-full', {
                    'bg-surface-selected': selected,
                })}
            />
            {text}
        </button>
    )
}

export default Flexjar
