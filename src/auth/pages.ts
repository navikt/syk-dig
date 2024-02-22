import { NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'
import { getToken, validateToken } from '@navikt/oasis'

import { isLocalOrDemo } from '../utils/env'

type ApiHandler<Response> = (
    req: NextApiRequest,
    res: NextApiResponse<Response>,
    accessToken: string,
) => void | Promise<unknown>

/**
 * Used to authenticate Next.JS pages API routes. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will deny requests if Wonderwall cookie is missing.
 */
export function withAuthenticatedApi<Response>(
    handler: ApiHandler<Response | { message: string }>,
): ApiHandler<Response | { message: string }> {
    return async function withBearerTokenHandler(req, res) {
        if (isLocalOrDemo) {
            logger.info('Is running locally or in demo, skipping authentication for API')
            return handler(req, res, 'fake-local-token')
        }

        const token = getToken(req)
        if (!token) {
            logger.error('Could not find any bearer token on the request. Denying request. This should not happen')
            res.status(401).json({ message: 'Access denied' })
            return
        }

        const validationResult = await validateToken(token)
        if (!validationResult.ok) {
            if (validationResult.errorType !== 'token expired') {
                logger.info(
                    `Invalid JWT token on API request for path ${req.url} (${validationResult.errorType} ${validationResult.error.message})`,
                )
            }
            res.status(401).json({ message: 'Access denied' })
            return
        }

        return handler(req, res, token)
    }
}
