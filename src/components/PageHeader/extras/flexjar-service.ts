import { logger } from '@navikt/next-logger'
import { requestOboToken } from '@navikt/oasis'

import { getServerEnv } from '../../../utils/env'

export interface FlexjarFeedbackPaylad {
    feedbackId: string
    feedback: string | undefined
    svar: string | undefined
    app: string
}

export async function createFeedback(feedback: { svar: string }, token: string): Promise<{ id: string }> {
    logger.info(`Submitting feedback to flexjar-backend`)

    const response = await fetch(`http://flexjar-backend.flex/api/azure/v2/feedback`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${await getBearerToken(token)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...feedback,
            feedback: undefined,
            app: 'syk-dig',
            feedbackId: 'syk-dig-header',
        } satisfies FlexjarFeedbackPaylad),
    })

    if (response.ok) {
        logger.info('Submitted feedback OK')
        return response.json()
    }

    throw new Error(`Unable to submit feedback to flexjar-backend, status: ${response.status} ${response.statusText}`)
}

export async function updateFeedback(
    id: string,
    feedback: {
        svar: string
        feedback: string | undefined
    },
    token: string,
): Promise<{ id: string }> {
    logger.info(`Submitting feedback to flexjar-backend`)

    const response = await fetch(`http://flexjar-backend.flex/api/azure/v2/feedback/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${await getBearerToken(token)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            JSON.stringify({
                ...feedback,
                app: 'syk-dig',
                feedbackId: 'syk-dig-header',
            } satisfies FlexjarFeedbackPaylad),
        ),
    })

    if (response.ok) {
        logger.info('Submitted feedback OK')
        return response.json()
    }

    throw new Error(`Unable to submit feedback to flexjar-backend, status: ${response.status} ${response.statusText}`)
}

async function getBearerToken(token: string): Promise<string> {
    const serverEnv = getServerEnv()

    const flexjarScope = `api://${serverEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production' ? 'prod' : 'dev'}-gcp.flex.flexjar-backend/.default`
    const tokenResult = await requestOboToken(token, flexjarScope)

    if (!tokenResult.ok) {
        throw new Error(`Unable to exchange token for flexjar-backend token, reason: ${tokenResult.error.message}`, {
            cause: tokenResult.error,
        })
    }

    return tokenResult.token
}
