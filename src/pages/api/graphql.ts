import { proxyApiRouteRequest } from '@navikt/next-api-proxy'
import { logger } from '@navikt/next-logger'
import { requestOboToken } from '@navikt/oasis'

import { withAuthenticatedApi } from '../../auth/pages'
import { getServerEnv, isLocalOrDemo } from '../../utils/env'

const handler = withAuthenticatedApi(async (req, res, accessToken) => {
    logger.info('Proxying request to syk-dig GraphQL API')

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not supported' })
        return
    }

    if (isLocalOrDemo) {
        res.status(418).json({ message: 'Not supported in local or demo, why are you not mocking?' })
        return
    }

    const serverEnv = getServerEnv()
    const oboResult = await requestOboToken(accessToken, serverEnv.SYK_DIG_BACKEND_SCOPE)
    if (!oboResult.ok) {
        logger.error(new Error(`Unable to exchange OBO token: ${oboResult.error.message}`, { cause: oboResult.error }))
        res.status(401).json({ message: 'Authentication failed' })
        return
    }

    try {
        await proxyApiRouteRequest({
            hostname: serverEnv.SYK_DIG_BACKEND_HOST,
            path: '/api/graphql',
            https: false,
            req,
            res,
            bearerToken: oboResult.token,
        })
    } catch (error: unknown) {
        logger.error(error)
        res.status(500).json({ message: 'Unable to proxy request' })
    }
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
