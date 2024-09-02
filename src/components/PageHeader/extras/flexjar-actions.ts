'use server'

import { getToken } from '@navikt/oasis'
import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'

import { isLocalOrDemo } from '../../../utils/env'

import { createFeedback, updateFeedback } from './flexjar-service'

export async function sendFlexjarFeedbackAction(
    previousState: { id: string | null; completed: boolean },
    formData: {
        level: 'meh' | 'bad' | 'good'
        text?: string
    },
): Promise<{ id: string | null; completed: boolean; error: string | null }> {
    if (isLocalOrDemo) {
        const devMode = await flexjarDevMode(previousState, formData)
        return { ...devMode, error: null }
    }

    const token = getToken(headers())
    if (!token) {
        throw new Error('User not logged in')
    }

    try {
        if (previousState.id) {
            await updateFeedback(
                previousState.id,
                {
                    svar: levelToInt(formData.level),
                    feedback: formData.text ?? undefined,
                },
                token,
            )
            return { id: previousState.id, completed: formData.text != null, error: null }
        }

        const { id } = await createFeedback({ svar: levelToInt(formData.level) }, token)
        return { id, completed: false, error: null }
    } catch (error) {
        logger.error(error)
        return {
            id: previousState.id,
            completed: false,
            error: 'Klarte ikke å sende inn tilbakemelding :( Prøv gjerne igjen senere!',
        }
    }
}

function levelToInt(level: 'meh' | 'bad' | 'good'): string {
    switch (level) {
        case 'bad':
            return '1'
        case 'meh':
            return '3'
        case 'good':
            return '5'
    }
}

async function flexjarDevMode(
    previousState: { id: string | null; completed: boolean },
    formData: {
        level: 'meh' | 'bad' | 'good'
        text?: string
    },
): Promise<{ id: string | null; completed: boolean }> {
    if (previousState.id) {
        logger.info(`Fake updating flexjar, we have previous ID ${previousState.id}, got ${JSON.stringify(formData)}`)
        await new Promise((resolve) => setTimeout(resolve, 356))
        return { id: 'fake-flexjar-id', completed: formData.text != null }
    } else {
        logger.info(`Fake creating flexjar, got ${JSON.stringify(formData)}`)
        await new Promise((resolve) => setTimeout(resolve, 356))
        return { id: 'fake-flexjar-id', completed: false }
    }
}
