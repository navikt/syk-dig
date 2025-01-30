import { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import { NasjonalOppgaveStatusEnum, NasjonalOppgaveStatusFragment } from '../../../graphql/queries/graphql.generated'
import styles from '../../utenlandsk-oppgave/status/OppgaveStatus.module.css'

interface Props {
    oppgave: NasjonalOppgaveStatusFragment
}

function NasjonalOppgaveStatus({ oppgave }: Props): ReactElement | null {
    switch (oppgave.status) {
        case NasjonalOppgaveStatusEnum.Avvist:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Oppgaven er avvist
                    </Heading>
                    <BodyShort spacing>Dersom dette ikke dette stemmer, kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case NasjonalOppgaveStatusEnum.Ferdigstilt:
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
        case NasjonalOppgaveStatusEnum.IkkeEnSykmelding:
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
        case NasjonalOppgaveStatusEnum.FinnesIkke:
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
        default:
            return null
    }
}

export default NasjonalOppgaveStatus
