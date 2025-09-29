import { headers } from 'next/headers'
import { getToken, validateToken } from '@navikt/oasis'

import { isLocalOrDemo } from '../utils/env'

export async function isValidToken(): Promise<boolean> {
    if (isLocalOrDemo) return true

    const requestHeaders = await headers()
    const token = getToken(requestHeaders)
    if (!token) {
        return false
    }

    const validationResult = await validateToken(token)
    return validationResult.ok
}
