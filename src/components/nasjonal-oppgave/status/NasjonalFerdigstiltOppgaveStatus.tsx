import { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import {
    NasjonalOppdatertSykmeldingStatusEnum,
    NasjonalSykmeldingStatusFragment,
} from '../../../graphql/queries/graphql.generated'
import styles from '../../utenlandsk-oppgave/status/OppgaveStatus.module.css'

interface Props {
    oppgave: NasjonalSykmeldingStatusFragment
}

function NasjonalFerdigstiltOppgaveStatus({ oppgave }: Props): ReactElement {
    switch (oppgave.status) {
        case NasjonalOppdatertSykmeldingStatusEnum.Avvist:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Oppgaven er avvist
                    </Heading>
                    <BodyShort spacing>Dersom dette ikke dette stemmer, kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case NasjonalOppdatertSykmeldingStatusEnum.IkkeEnSykmelding:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Sykmeldingen har blitt sendt tilbake til Gosys fordi det ikke var en sykmelding
                    </Heading>
                    <BodyShort spacing>
                        Dersom du kom hit fra Gosys kan du prøve å oppfriske Gosys og prøve igjen.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case NasjonalOppdatertSykmeldingStatusEnum.IkkeFerdigstilt:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Sykmeldingen er ikke ferdigstilt
                    </Heading>
                    <BodyShort spacing>
                        Dersom du kom hit fra Gosys kan du prøve å oppfriske Gosys og prøve igjen.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case NasjonalOppdatertSykmeldingStatusEnum.FinnesIkke:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Vi klarte ikke å finne sykmeldingen
                    </Heading>
                    <BodyShort spacing>
                        Sykmeldingen med sykmelding-id: {oppgave.sykmeldingId} finnes ikke i våre systemer.
                    </BodyShort>
                    <BodyShort spacing>
                        Dersom du kom hit fra Gosys kan du prøve å oppfriske Gosys og prøve igjen.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        default:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Vi klarte ikke å finne sykmeldingen eller noe annet gikk feil
                    </Heading>
                    <BodyShort spacing>
                        Sykmelding med sykmelding-id: {oppgave.sykmeldingId} finnes ikke i våre systemer.
                    </BodyShort>
                    <BodyShort spacing>Dersom du kom hit fra Gosys eller modia kan du prøve å oppfriske.</BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
    }
}

export default NasjonalFerdigstiltOppgaveStatus
