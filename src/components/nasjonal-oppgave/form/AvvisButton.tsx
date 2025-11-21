import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { BodyShort, Button, Modal, Select } from '@navikt/ds-react'
import { useMutation } from '@apollo/client/react'

type Props = {
    avvis: (reason: string | null) => Promise<void>
    avvisResult: useMutation.Result
}

function AvvisButton({ avvis, avvisResult }: PropsWithChildren<Props>): ReactElement {
    const [showConfirm, setShowConfirm] = useState(false)
    const closeModal = (): void => setShowConfirm(false)
    const [grunn, setGrunn] = useState<string | null>(null)
    const mutationHasSucceeded = avvisResult.called && !avvisResult.error

    return (
        <>
            <Button
                onClick={async () => {
                    setShowConfirm(true)
                }}
                type="button"
            >
                Avvis sykmeldingen
            </Button>
            <Modal
                header={{
                    heading: 'Er du sikker på at du vil avvise sykmeldingen?',
                    size: 'medium',
                }}
                open={showConfirm && !mutationHasSucceeded}
                onClose={closeModal}
                className="max-w-lg"
            >
                <Modal.Body className="min-h-[fit-content]">
                    <BodyShort spacing>
                        Dette vil ferdigstille oppgaven. Sykmeldingen blir ikke registrert i infotrygd. Behandler og
                        pasient blir ikke varslet.
                    </BodyShort>
                    <Select
                        id="avvisningsgrunn-select"
                        className="cancelmodal__avvisningsgrunn"
                        name="avvisningsgrunn"
                        label="Hvorfor avvises sykmeldingen?"
                        onChange={(event) => {
                            setGrunn(event.currentTarget.value || null)
                        }}
                    >
                        <option value="">Velg avvisningsgrunn (valgfritt)</option>
                        <option value="Avventende periode mangler tekst">Avventende periode mangler tekst</option>
                        <option value="Avventende periode over 16 dager">Avventende periode over 16 dager</option>
                        <option value="Manglende utfylling av periode">Manglende utfylling av periode</option>
                        <option value="Manglende utfylling av grad">Manglende utfylling av grad</option>
                        <option value="Manglende utfylling av diagnosekode">Manglende utfylling av diagnosekode</option>
                        <option value="Antall behandlingsdager mangler">Antall behandlingsdager mangler</option>
                        <option value="Behandler mangler autorisasjon til å sykmelde">
                            Behandler mangler autorisasjon til å sykmelde
                        </option>
                        <option value="HPR-nummer er ikke angitt">HPR-nummer er ikke angitt</option>
                        <option value="Behandler mangler fødselsnummer i HPR-registeret">
                            Behandler mangler fødselsnummer i HPR-registeret
                        </option>
                        <option value="Sykefraværet overstiger 12 uker og sykmelder er kiropraktor/fysioterapeut">
                            Sykefraværet overstiger 12 uker og sykmelder er kiropraktor/fysioterapeut
                        </option>
                        <option value="Pasienten er over 70 år">Pasienten er over 70 år</option>
                        <option value="Sykmeldingen mangler sider">Sykmeldingen mangler sider</option>
                        <option value="Skjema er ikke mulig å tolke/lese">Skjema er ikke mulig å tolke/lese</option>
                        <option value="Dato for behandling mangler">Dato for behandling mangler</option>
                    </Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={async () => {
                            await avvis(grunn)
                        }}
                        type="button"
                        variant="danger"
                        loading={avvisResult.loading}
                    >
                        Avvis sykmelding
                    </Button>
                    <Button
                        onClick={() => {
                            closeModal()
                        }}
                        type="button"
                        variant="secondary"
                    >
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AvvisButton
