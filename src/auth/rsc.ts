import { logger } from '@navikt/next-logger'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateAzureToken } from '@navikt/next-auth-wonderwall'

import { isLocalOrDemo } from '../utils/env'

export async function verifyAPIAuthenticated(): Promise<boolean> {
    if (isLocalOrDemo) return true

    const requestHeaders = headers()
    const bearerToken: string | null | undefined = requestHeaders.get('authorization')

    if (!bearerToken) {
        return false
    }

    const validationResult = await validateAzureToken(bearerToken)

    return validationResult === 'valid'
}

export async function verifyUserLoggedIn(): Promise<{
    accessToken: string
}> {
    const requestHeaders = headers()

    if (isLocalOrDemo) {
        logger.warn('Is running locally, skipping RSC auth')
        return {
            accessToken: 'fake-local-token',
        }
    }

    const redirectPath = requestHeaders.get('x-path')
    if (!redirectPath == null) {
        logger.warn("Missing 'x-path' header, is middleware middlewaring?")
    }
    logger.info(`Redirect path is ${redirectPath}`)

    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        logger.info('Found no token, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateAzureToken(bearerToken)
    if (validationResult !== 'valid') {
        if (validationResult.errorType !== 'EXPIRED') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
        }

        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    return {
        accessToken: bearerToken.replace('Bearer ', ''),
    }
}
