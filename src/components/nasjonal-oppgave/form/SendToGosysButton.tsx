import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'
import { MutationResult } from '@apollo/client'

import { MutationResultFeedback } from '../../Sykmelding/ActionSection/MutationFeedbackSection'
import ConfirmButton from '../../ConfirmButton/ConfirmButton'

type Props = {
    tilbakeTilGosys: () => Promise<void>
    tilbakeTilGosysResult: MutationResult
}

function SendToGosysButton({ tilbakeTilGosys, tilbakeTilGosysResult }: Props): ReactElement {
    return (
        <ConfirmButton
            variant="secondary"
            confirmation={{
                title: 'Send til GOSYS?',
                body: [
                    'Dette vil ikke ferdigstille oppgaven, men gjør det mulig å journalføre dokumentet i GOSYS.',
                    <Alert key="gosys-info" className="mb-4" variant="info">
                        Send til GOSYS bruker du hvis pdf-en er noe annet enn en norsk sykmelding. Av og til sniker det
                        seg inn et annet dokument i bunken av sykmeldinger hos skannerleverandøren. Det kan være en
                        utenlandsk sykmelding, en søknad om yrkesskadeerstatning eller noe annet.
                    </Alert>,
                    <Alert key="gosys-warning" variant="warning">
                        <span className="font-bold">Obs!</span> Hvis en sykmelding feilaktig sendes til GOSYS kan den
                        aldri bli tilgjengelig for brukeren digitalt.
                    </Alert>,
                ],
                confirmButton: {
                    text: 'Send til GOSYS',
                    type: 'button',
                    onClick: async () => {
                        // TODO: handle form submit warning?
                        // reset(undefined, { keepValues: true })

                        await tilbakeTilGosys()
                    },
                    loading: tilbakeTilGosysResult.loading,
                },
                closeButton: {
                    onClick: () => {
                        tilbakeTilGosysResult.reset()
                    },
                },
                feedback: (
                    <MutationResultFeedback result={tilbakeTilGosysResult} what="sende tilbake">
                        <Alert variant="success">Oppgaven ble sendt tilbake til GOSYS</Alert>
                    </MutationResultFeedback>
                ),
                hide: isMutationSuccess(tilbakeTilGosysResult),
            }}
        >
            Dette er ikke en sykmelding
        </ConfirmButton>
    )
}

function isMutationSuccess(result: MutationResult): boolean {
    return result.called && !result.loading && !result.error
}

export default SendToGosysButton
