import React from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import {
    DigitaliseringsoppgaveStatusEnum,
    DigitaliseringsoppgaveStatusFragment,
} from '../../graphql/queries/graphql.generated'

import styles from './OppgaveStatus.module.css'

interface Props {
    oppgave: DigitaliseringsoppgaveStatusFragment
}

function OppgaveStatus({ oppgave }: Props): JSX.Element {
    switch (oppgave.status) {
        case DigitaliseringsoppgaveStatusEnum.Avvist:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Oppgaven er avvist
                    </Heading>
                    <BodyShort spacing>Dersom dette ikke dette stemmer, kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case DigitaliseringsoppgaveStatusEnum.Ferdigstilt:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Oppgaven er allerede ferdigstilt
                    </Heading>
                    <BodyShort spacing>
                        Dersom du kom hit fra Gosys kan du prøve å oppfriske Gosys og prøve igjen.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case DigitaliseringsoppgaveStatusEnum.IkkeEnSykmelding:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Oppgaven har blitt sendt tilbake til Gosys fordi det ikke var en sykmelding
                    </Heading>
                    <BodyShort spacing>
                        Dersom du kom hit fra Gosys kan du prøve å oppfriske Gosys og prøve igjen.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case DigitaliseringsoppgaveStatusEnum.FinnesIkke:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Vi klarte ikke å finne oppgaven
                    </Heading>
                    <BodyShort spacing>
                        Oppgaven med oppgave-id: {oppgave.oppgaveId} finnes ikke i våre systemer.
                    </BodyShort>
                    <BodyShort spacing>
                        Dersom du kom hit fra Gosys kan du prøve å oppfriske Gosys og prøve igjen.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
    }
}

export default OppgaveStatus
