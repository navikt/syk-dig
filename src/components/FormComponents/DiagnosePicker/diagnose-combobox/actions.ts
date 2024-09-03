'use server'

import { logger } from '@navikt/next-logger'

import { isUserLoggedIn } from '../../../../auth/rsc'

import { DiagnoseSuggestion, DiagnoseSystem } from './types'
import { searchSystem } from './search-system'

export async function getDiagnoseSuggestionsAction(
    system: DiagnoseSystem,
    value: unknown,
): Promise<{ suggestions: DiagnoseSuggestion[] } | { reason: string }> {
    const userLoggedIn = await isUserLoggedIn()
    if (!userLoggedIn) {
        return { reason: 'Not logged in' }
    }

    if (system !== 'ICD10' && system !== 'ICPC2') {
        logger.error(`Invalid system used for diagnose search: ${system}`)
        return { reason: `${system} is not a valid kodesystem` }
    }

    if (value == null || typeof value !== 'string') {
        logger.error(`Missing or invalid value used for diagnose search: "${value}"`)
        return { reason: `Invalid or missing search string` }
    }

    return {
        suggestions: searchSystem(system.toLowerCase() as Lowercase<DiagnoseSystem>, value),
    }
}
