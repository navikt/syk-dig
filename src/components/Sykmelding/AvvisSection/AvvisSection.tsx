import React, { useState } from 'react'
import { BodyShort, Button, Heading, Modal, Select } from '@navikt/ds-react'

interface Props {
    fnr: string
}

function AvvisSection({}: Props): JSX.Element {
    const [showAvvisModal, setShowAvvisModal] = useState(false)

    return (
        <div>
            <Button type="button" variant="danger" onClick={() => setShowAvvisModal(true)}>
                Avvis registreringen
            </Button>
            <Modal open={showAvvisModal} onClose={() => setShowAvvisModal(false)} aria-labelledby="avvis-modal-heading">
                <Modal.Content className="w-[32rem]">
                    <Heading id="avvis-modal-heading" spacing level="2" size="medium">
                        Avvis sykmeldingen
                    </Heading>
                    <BodyShort spacing>
                        Oppgaven vil sendes til benken for de som innhenter opplysningene som mangler.
                    </BodyShort>
                    <BodyShort>Er du sikker på at du vil avvise?</BodyShort>
                    <Select className="mt-8" label="Begrunnelse for avvisning">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Select>
                    <Button type="button" className="mt-8">
                        Ja, avvis sykmeldingen
                    </Button>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default AvvisSection
