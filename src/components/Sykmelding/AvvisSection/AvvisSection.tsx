import { ReactElement, useState } from 'react'
import { Alert, BodyShort, Button, Modal, Select, Textarea } from '@navikt/ds-react'
import { useMutation } from '@apollo/client'
import { useFormContext } from 'react-hook-form'

import { Avvisingsgrunn, AvvisOppgaveDocument } from '../../../graphql/queries/graphql.generated'
import { MutationResultFeedback } from '../ActionSection/MutationFeedbackSection'
import { bundledEnv, isLocalOrDemo } from '../../../utils/env'
import styles from '../ActionSection/MutationFeedbackSection.module.css'
import FeedbackModal from '../ActionSection/FeedbackModal'
import { Location, useParam } from '../../../utils/useParam'
import { UtenlanskFormValues } from '../SykmeldingForm'
import { redirectTilGosys } from '../../../utils/gosys'
import { useModiaContext } from '../../../modia/modia-context'
import { raise } from '../../../utils/tsUtils'

type Props = {
    disableUnsavedWarning: () => void
}

function AvvisSection({ disableUnsavedWarning }: Props): ReactElement {
    const { reset } = useFormContext<UtenlanskFormValues>()
    const params = useParam(Location.Utenlansk)
    const { selectedEnhetId } = useModiaContext()
    const [avvisningsgrunn, setAvvisningsgrunn] = useState<{ grunn: string | null; grunnAnnet?: string | null }>({
        grunn: null,
        grunnAnnet: null,
    })
    const [showAvvisModal, setShowAvvisModal] = useState(false)
    const [selectError, setSelectError] = useState<string | null>(null)
    const [textareaError, setTextareaError] = useState<string | null>(null)
    const [avvis, mutationResult] = useMutation(AvvisOppgaveDocument, {
        onCompleted: () => {
            setShowAvvisModal(false)
            redirectTilGosys()
        },
    })

    const isAnnet: boolean = avvisningsgrunn.grunn === Avvisingsgrunn.Annet
    const isGrunnAnnetMissing: boolean = isAnnet && !avvisningsgrunn.grunnAnnet
    const isGrunnAnnetWhitespace: boolean =
        isAnnet && !!avvisningsgrunn.grunnAnnet && avvisningsgrunn.grunnAnnet.trim().length === 0
    const isGrunnAnnetUnderMinLength: boolean =
        isAnnet && !!avvisningsgrunn.grunnAnnet && avvisningsgrunn.grunnAnnet.length < 6
    const isGrunnAnnetOverMaxLength: boolean =
        isAnnet && !!avvisningsgrunn.grunnAnnet && avvisningsgrunn.grunnAnnet.length > 25

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
                    <Button variant="tertiary" as="a" href={bundledEnv.NEXT_PUBLIC_GOSYS_URL}>
                        Klikk her dersom du ikke blir videresendt...
                    </Button>
                </FeedbackModal>
            </MutationResultFeedback>
            <Button type="button" variant="danger" onClick={() => setShowAvvisModal(true)} className="flex w-52">
                Avvis registreringen
            </Button>
            <Modal
                header={{
                    heading: 'Avvis sykmeldingen',
                    size: 'medium',
                }}
                open={showAvvisModal}
                onClose={() => {
                    if (avvisningsgrunn.grunn) {
                        setAvvisningsgrunn({
                            grunn: null,
                            grunnAnnet: null,
                        })
                    }
                    setSelectError(null)
                    setTextareaError(null)
                    setShowAvvisModal(false)
                }}
                className="w-[32rem]"
            >
                <Modal.Body>
                    <BodyShort spacing>
                        Oppgaven vil sendes til benken for de som innhenter opplysningene som mangler.
                    </BodyShort>
                    <BodyShort>Er du sikker på at du vil avvise?</BodyShort>
                    <Select
                        className="mt-8"
                        label="Begrunnelse for avvisning"
                        defaultValue=""
                        onChange={(event) => {
                            setAvvisningsgrunn({
                                grunn: event.target.value,
                                grunnAnnet: avvisningsgrunn.grunnAnnet,
                            })
                            if (selectError) {
                                setSelectError(null)
                            }
                        }}
                        error={selectError}
                    >
                        <option disabled hidden value="">
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
                        <option value={Avvisingsgrunn.ForLangPeriode}>Sykmeldingen har for lang periode</option>
                        <option value={Avvisingsgrunn.Risikosak}>Risikosak</option>
                        <option value={Avvisingsgrunn.TilbakedatertSykmelding}>Sykmeldingen er tilbakedatert</option>
                        <option value={Avvisingsgrunn.BasertPaaTelefonkontakt}>
                            Sykmelding basert på telefonkontakt
                        </option>
                        <option value={Avvisingsgrunn.VarsletISaken}>Varslet i saken - under vurdering</option>
                        <option value={Avvisingsgrunn.MaxdatoOppnaadd}>Maks dato oppnådd</option>
                        <option value={Avvisingsgrunn.LopendeAap}>Løpende AAP</option>
                        <option value={Avvisingsgrunn.Duplikat}>Duplikat</option>
                        <option value={Avvisingsgrunn.Annet}>Annet</option>
                    </Select>
                    {avvisningsgrunn.grunn === Avvisingsgrunn.Annet && (
                        <Textarea
                            className="mt-6"
                            label="Hva er grunn Annet?"
                            value={avvisningsgrunn.grunnAnnet ?? ''}
                            onChange={(event) => {
                                setAvvisningsgrunn({
                                    grunn: avvisningsgrunn.grunn,
                                    grunnAnnet: event.target.value,
                                })
                                if (textareaError) {
                                    setTextareaError(null)
                                }
                            }}
                            maxLength={25}
                            size="small"
                            error={textareaError}
                        />
                    )}
                    <MutationResultFeedback what="avvise" result={mutationResult}></MutationResultFeedback>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        loading={mutationResult.loading}
                        onClick={() => {
                            if (!avvisningsgrunn.grunn) {
                                setSelectError('Du må velge en grunn')
                            } else if (isGrunnAnnetMissing || isGrunnAnnetWhitespace) {
                                setTextareaError('Du må fylle inn en grunn for Annet')
                            } else if (isGrunnAnnetUnderMinLength) {
                                setTextareaError('Grunn må ha minst 6 tegn')
                            } else if (isGrunnAnnetOverMaxLength) {
                                setTextareaError('Grunn kan maks ha 25 tegn')
                            } else {
                                setSelectError(null)
                                setTextareaError(null)
                                reset(undefined, { keepValues: true })
                                disableUnsavedWarning()

                                avvis({
                                    variables: {
                                        oppgaveId: params.oppgaveId,
                                        enhetId: selectedEnhetId ?? raise('Oppgave kan ikke lagres uten valgt enhet'),
                                        avvisningsgrunn: selectValueToAvvisingsgrunn(avvisningsgrunn.grunn),
                                        avvisningsgrunnAnnet: avvisningsgrunn.grunnAnnet,
                                    },
                                })
                            }
                        }}
                    >
                        Ja, avvis sykmeldingen
                    </Button>
                </Modal.Footer>
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
        case Avvisingsgrunn.ForLangPeriode:
            return Avvisingsgrunn.ForLangPeriode
        case Avvisingsgrunn.Risikosak:
            return Avvisingsgrunn.Risikosak
        case Avvisingsgrunn.TilbakedatertSykmelding:
            return Avvisingsgrunn.TilbakedatertSykmelding
        case Avvisingsgrunn.BasertPaaTelefonkontakt:
            return Avvisingsgrunn.BasertPaaTelefonkontakt
        case Avvisingsgrunn.Annet:
            return Avvisingsgrunn.Annet
        default:
            throw new Error('Ugyldig avvisingsgrunn. Er Select-komponenten brukt feil?')
    }
}

export default AvvisSection
