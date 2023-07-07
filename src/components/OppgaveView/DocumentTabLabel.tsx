import { ReactElement, useState } from 'react'
import { Alert, Button, Heading, Modal, TextField, Tabs } from '@navikt/ds-react'
import { PencilIcon } from '@navikt/aksel-icons'
import { useMutation } from '@apollo/client'

import { NavngiDokumentDocument } from '../../graphql/queries/graphql.generated'

interface Props {
    document: { tittel: string; dokumentInfoId: string }
    oppdaveId: string
}

function DocumentTabLabel({ document, oppdaveId }: Props): ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Tabs.Tab value={document.dokumentInfoId} label={document.tittel} className="pr-12" />
            <Button
                className="-ml-10 mt-2 h-8 w-8"
                variant="tertiary"
                icon={<PencilIcon title="Rediger dokumentnavn" />}
                size="small"
                onClick={() => {
                    setIsModalOpen(true)
                }}
            />
            <EditDocumentModal
                document={document}
                oppdaveId={oppdaveId}
                isModalOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
            />
        </>
    )
}

function EditDocumentModal({
    document,
    oppdaveId,
    isModalOpen,
    close,
}: {
    document: { tittel: string; dokumentInfoId: string }
    oppdaveId: string
    isModalOpen: boolean
    close: () => void
}): ReactElement {
    const [newTitle, setNewTitle] = useState(document.tittel)
    const [mutate, result] = useMutation(NavngiDokumentDocument)
    const handleSave = async (): Promise<void> => {
        if (newTitle === document.tittel) {
            close()
        } else {
            await mutate({
                variables: { oppgaveId: oppdaveId, tittel: newTitle, dokumentInfoId: document.dokumentInfoId },
            })
            close()
        }
    }

    return (
        <Modal
            open={isModalOpen}
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
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            handleSave()
                        }
                    }}
                />
                {result.error != null && (
                    <Alert variant="error" className="mt-4">
                        Klarte ikke å oppdatere dokument, prøv igjen senere.
                    </Alert>
                )}
                <div className="mt-4 flex justify-end gap-3">
                    <Button variant="secondary" onClick={close}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={handleSave} loading={result.loading}>
                        Lagre
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    )
}

export default DocumentTabLabel
