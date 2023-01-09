import { logger } from '@navikt/next-logger'
import { proxyApiRouteRequest } from '@navikt/next-api-proxy'
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { withAuthenticatedApi } from '../../auth/withAuth'
import { getServerEnv } from '../../utils/env'
import { pdf } from '../../mocks/data/examplePdfbase64'

const env = getServerEnv()

const handler = withAuthenticatedApi<Buffer>(async (req, res, accessToken) => {
    logger.info('Proxying request to syk-dig pdf')

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not supported' })
        return
    }

    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        logger.warn(`Running with mock, mocking PDF for local and demo for ${req.url}`)
        res.setHeader('Content-Type', 'application/pdf')
        res.status(200).send(Buffer.from(pdf, 'base64'))
        return
    }

    const bearerToken = await grantAzureOboToken(accessToken, env.SYK_DIG_BACKEND_SCOPE)
    if (isInvalidTokenSet(bearerToken)) {
        if (bearerToken.error instanceof Error) {
            logger.error(new Error(bearerToken.message, { cause: bearerToken.error }))
        } else {
            logger.error(`${bearerToken.errorType}: ${bearerToken.message}`)
        }
        res.status(401).json({ message: 'Authentication failed' })
        return
    }

    await proxyApiRouteRequest({
        hostname: env.SYK_DIG_BACKEND_HOST,
        path: req.url ?? '',
        req,
        res,
        bearerToken,
        https: false,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
