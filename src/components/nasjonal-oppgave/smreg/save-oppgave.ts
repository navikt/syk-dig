import { logger } from '@navikt/next-logger'

import { RuleHitErrors, RuleHitErrorsSchema } from '../schema/RuleHitErrors'
import { RegistrertSykmelding } from '../schema/sykmelding/RegistrertSykmelding'

import { apiUrl } from './api'

export async function postRegistrertSykmelding(
    oppgaveid: number,
    enhet: string,
    sykmelding: RegistrertSykmelding,
    isFerdigstilt: boolean,
    sykmeldingId: string | null,
): Promise<void> {
    const res = await fetch(apiUrl(getUrl(isFerdigstilt, oppgaveid, sykmeldingId)), {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-Nav-Enhet': enhet,
        },
        body: JSON.stringify(sykmelding),
    })

    if (res.ok) {
        logger.info(`Oppgave med oppgaveid: ${oppgaveid} ble registrert`)
        return
    } else if (res.status === 400 && res.headers.get('Content-Type')?.includes('application/json')) {
        logger.warn(`User encountered a ruleHit error. Oppgaveid: ${oppgaveid}`)
        const ruleHits = RuleHitErrorsSchema.safeParse(await res.json())
        if (ruleHits.success) {
            throw new RuleHitError(ruleHits.data)
        } else {
            throw new Error(`Det oppsto en valideringsfeil ved registrering av oppgave med id: ${oppgaveid}`)
        }
    } else if (res.status >= 400 && res.status < 500) {
        const text = await res.text()
        if (res.status === 404 || res.status === 401) {
            logger.warn(
                `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
            )
        } else {
            logger.error(
                `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
            )
        }
        throw new Error(text)
    } else {
        const text = await res.text()
        logger.error(
            `An error occurred while trying to register sykmelding. StatusCode: ${res.status}. Message: ${text}`,
        )
        throw new Error('Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere')
    }
}

/**
 * Different URL for ferdigstilt or not
 */
function getUrl(isFerdigstilt: boolean, oppgaveId: number, sykmeldingId: string | null): string {
    if (isFerdigstilt) {
        return sykmeldingId != null ? `/sykmelding/${sykmeldingId}` : `/oppgave/${oppgaveId}/endre`
    }

    return `/oppgave/${oppgaveId}/send`
}

/**
 * Custom error to be caught further up. This could be refactored into a more generic error handling
 */
export class RuleHitError extends Error {
    ruleHits: RuleHitErrors
    constructor(ruleHits: RuleHitErrors, message?: string) {
        super(message)
        this.ruleHits = ruleHits
    }
}
