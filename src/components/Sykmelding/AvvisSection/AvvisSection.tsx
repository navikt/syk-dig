import React, { useRef, useState } from 'react'
import { Alert, BodyShort, Button, Heading, Modal, Select } from '@navikt/ds-react'
import { useMutation } from '@apollo/client'
import { useFormContext } from 'react-hook-form'

import { Avvisingsgrunn, AvvisOppgaveDocument } from '../../../graphql/queries/graphql.generated'
import { MutationResultFeedback } from '../ActionSection/MutationFeedbackSection'
import { getPublicEnv, isLocalOrDemo } from '../../../utils/env'
import styles from '../ActionSection/MutationFeedbackSection.module.css'
import FeedbackModal from '../ActionSection/FeedbackModal'
import { redirectTilGosys } from '../ActionSection/ActionSection'
import { Location, useParam } from '../../../utils/useParam'
import { SykmeldingFormValues } from '../SykmeldingForm'
import { useSelectedModiaEnhet } from '../../../graphql/localState/modia'

const publicEnv = getPublicEnv()

interface Props {
    fnr: string
}

function AvvisSection({}: Props): JSX.Element {
    const { reset } = useFormContext<SykmeldingFormValues>()
    const params = useParam(Location.Utenlansk)
    const enhetId = useSelectedModiaEnhet()
    const grunnRef = useRef<HTMLSelectElement>(null)
    const [showAvvisModal, setShowAvvisModal] = useState(false)
    const [selectError, setSelectError] = useState<string | null>(null)
    const [avvis, mutationResult] = useMutation(AvvisOppgaveDocument, {
        onCompleted: () => {
            setShowAvvisModal(false)
            redirectTilGosys()
        },
    })

    return (
        <div className="flex flex-col gap-3">
            <MutationResultFeedback what="avvise" result={mutationResult}>
                <FeedbackModal title="Sykmeldingen er avvist">
                    {isLocalOrDemo && (
                        <Alert className={styles.demoWarning} variant="warning">
                            Dette er bare en demo, du kan ikke gå til gosys. Last siden på nytt for å fortsette demoen.
                        </Alert>
                    )}
                    <Alert variant="success" className={styles.saveSuccess}>
                        Oppgaven ble avvist
                    </Alert>
                    <Button variant="tertiary" as="a" href={publicEnv.gosysUrl}>
                        Klikk her dersom du ikke blir videresendt...
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>
            <div>
                <Button type="button" variant="danger" onClick={() => setShowAvvisModal(true)}>
                    Avvis registreringen
                </Button>
            </div>
            <Modal open={showAvvisModal} onClose={() => setShowAvvisModal(false)} aria-labelledby="avvis-modal-heading">
                <Modal.Content className="w-[32rem]">
                    <Heading id="avvis-modal-heading" spacing level="2" size="medium">
                        Avvis sykmeldingen
                    </Heading>
                    <BodyShort spacing>
                        Oppgaven vil sendes til benken for de som innhenter opplysningene som mangler.
                    </BodyShort>
                    <BodyShort>Er du sikker på at du vil avvise?</BodyShort>
                    <Select
                        ref={grunnRef}
                        className="mt-8"
                        label="Begrunnelse for avvisning"
                        defaultValue={'none'}
                        error={selectError}
                    >
                        <option disabled hidden value="none">
                            Velg en grunn...
                        </option>
                        <option value={Avvisingsgrunn.ManglendeDiagnose}>Manglende diagnose</option>
                        <option value={Avvisingsgrunn.ManglendeOrginalSykmelding}>Manglende orginal sykmelding</option>
                        <option value={Avvisingsgrunn.ManglendePeriodeEllerSluttdato}>
                            Manglende periode eller slutt-dato
                        </option>
                        <option value={Avvisingsgrunn.ManglendeUnderskriftEllerStempelFraSykmelder}>
                            Manglende underskrift eller stempler fra sykmelder
                        </option>
                    </Select>
                    <MutationResultFeedback what="avvise" result={mutationResult}></MutationResultFeedback>
                    <Button
                        type="button"
                        className="mt-8"
                        loading={mutationResult.loading}
                        onClick={() => {
                            const value = grunnRef.current?.value
                            if (value === 'none') {
                                setSelectError('Du må velge en grunn')
                            } else {
                                setSelectError(null)
                                reset(undefined, { keepValues: true })
                                avvis({
                                    variables: {
                                        oppgaveId: params.oppgaveId,
                                        enhetId: enhetId,
                                        avvisningsgrunn: selectValueToAvvisingsgrunn(value),
                                    },
                                })
                            }
                        }}
                    >
                        Ja, avvis sykmeldingen
                    </Button>
                </Modal.Content>
            </Modal>
        </div>
    )
}

function selectValueToAvvisingsgrunn(value: string | null | undefined): Avvisingsgrunn {
    switch (value) {
        case Avvisingsgrunn.ManglendeDiagnose:
            return Avvisingsgrunn.ManglendeDiagnose
        case Avvisingsgrunn.ManglendeOrginalSykmelding:
            return Avvisingsgrunn.ManglendeOrginalSykmelding
        case Avvisingsgrunn.ManglendePeriodeEllerSluttdato:
            return Avvisingsgrunn.ManglendePeriodeEllerSluttdato
        case Avvisingsgrunn.ManglendeUnderskriftEllerStempelFraSykmelder:
            return Avvisingsgrunn.ManglendeUnderskriftEllerStempelFraSykmelder
        default:
            throw new Error('Ugyldig avvisingsgrunn. Er Select-komponenten brukt feil?')
    }
}

export default AvvisSection
