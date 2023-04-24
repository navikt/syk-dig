import React, { useState } from 'react'
import { Button, Heading, Modal, TextField } from '@navikt/ds-react'
import { Edit } from '@navikt/ds-icons'
import { useMutation } from '@apollo/client'

import { NavngiDokumentDocument } from '../../graphql/queries/graphql.generated'

interface Props {
    document: { tittel: string; dokumentInfoId: string }
    oppdaveId: string
}

function DocumentTabLabel({ document, oppdaveId }: Props): JSX.Element {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className={'flex items-center'}>
                <div className={'mr-5'}> {document.tittel}</div>
                <Button
                    variant={'tertiary'}
                    icon={<Edit aria-hidden />}
                    size={'small'}
                    onClick={() => {
                        setShowModal(true)
                    }}
                />
            </div>
            {showModal && (
                <EditDocumentModal document={document} oppdaveId={oppdaveId} close={() => setShowModal(false)} />
            )}
        </>
    )
}

function EditDocumentModal({
    document,
    oppdaveId,
    close,
}: {
    document: { tittel: string; dokumentInfoId: string }
    oppdaveId: string
    close: () => void
}): JSX.Element {
    const [newTitle, setNewTitle] = useState(document.tittel)
    const [mutate] = useMutation(NavngiDokumentDocument)
    const handleSave = async (): Promise<void> => {
        if (newTitle === document.tittel) {
            return
        } else {
            try {
                await mutate({
                    variables: { oppgaveId: oppdaveId, tittel: newTitle, dokumentInfoId: document.dokumentInfoId },
                })
                close()
            } catch (e) {
                // Vise feilmeldirng
            }
        }
    }

    return (
        <Modal
            open
            onClose={() => {
                close()
            }}
            aria-labelledby={`edit-document-modal-${document.dokumentInfoId}`}
        >
            <Modal.Content className="w-[32rem]">
                <Heading id={`edit-document-modal-${document.dokumentInfoId}`} spacing level="2" size="medium">
                    Endre navn på dokument
                </Heading>
                <TextField
                    label="Dokument tittel"
                    value={newTitle}
                    onChange={(event) => {
                        setNewTitle(event.target.value)
                    }}
                />
                <div className={'mt-4 flex justify-end gap-3'}>
                    <Button variant="secondary" onClick={close}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Lagre
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    )
}

export default DocumentTabLabel
