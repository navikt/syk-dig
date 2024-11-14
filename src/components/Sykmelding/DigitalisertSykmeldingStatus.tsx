'use client'

import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import { ReactElement } from 'react'

import {
    DigitalisertSykmeldingResult_OppdatertSykmeldingStatus_Fragment,
    OppdatertSykmeldingStatusEnum,
} from '../../graphql/queries/graphql.generated'
import styles from '../utenlandsk-oppgave/status/OppgaveStatus.module.css'

interface Props {
    sykmeldingStatus: DigitalisertSykmeldingResult_OppdatertSykmeldingStatus_Fragment
}

function DigitalisertSykmeldingStatus({ sykmeldingStatus }: Props): ReactElement {
    switch (sykmeldingStatus.status) {
        case OppdatertSykmeldingStatusEnum.IkkeEnSykmelding:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Dette er ikke en sykmelding
                    </Heading>
                    <BodyShort spacing>
                        Dersom du kom hit fra modia, sjekk at dette er en utenlandsk sykmelding.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case OppdatertSykmeldingStatusEnum.Avvist:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Sykmeldingen er avvist
                    </Heading>
                    <BodyShort spacing>Dersom dette ikke dette stemmer, kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case OppdatertSykmeldingStatusEnum.IkkeFerdigstilt:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Sykmeldingen er ikke ferdigstilt
                    </Heading>
                    <BodyShort spacing>
                        Denne sykmeldingen er ikke ferdig registrert i syk-dig, prøv å start oppgaven på nytt fra gosys.
                    </BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
        case OppdatertSykmeldingStatusEnum.FinnesIkke:
            return (
                <Alert variant="warning" className={styles.alert}>
                    <Heading size="medium" spacing>
                        Vi klarte ikke å finne oppgaven
                    </Heading>
                    <BodyShort spacing>
                        Sykmelding med sykmelding-id: {sykmeldingStatus.sykmeldingId} finnes ikke i våre systemer.
                    </BodyShort>
                    <BodyShort spacing>Dersom du kom hit fra Gosys eller modia kan du prøve å oppfriske.</BodyShort>
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
                        Sykmelding med sykmelding-id: {sykmeldingStatus.sykmeldingId} finnes ikke i våre systemer.
                    </BodyShort>
                    <BodyShort spacing>Dersom du kom hit fra Gosys eller modia kan du prøve å oppfriske.</BodyShort>
                    <BodyShort spacing>Dersom problemet vedvarer kan du ta kontakt med brukerstøtte.</BodyShort>
                </Alert>
            )
    }
}

export default DigitalisertSykmeldingStatus
