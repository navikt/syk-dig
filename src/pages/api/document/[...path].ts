import { logger } from '@navikt/next-logger'
import { proxyApiRouteRequest } from '@navikt/next-api-proxy'
import { requestOboToken } from '@navikt/oasis'

import { withAuthenticatedApi } from '../../../auth/pages'
import { getServerEnv, isLocalOrDemo } from '../../../utils/env'
import { pdf, alternativeDocumentPdf } from '../../../mocks/data/examplePdfbase64'

const handler = withAuthenticatedApi<Buffer>(async (req, res, accessToken) => {
    logger.info('Proxying document request to syk-dig-backend')

    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not supported' })
        return
    }

    if (isLocalOrDemo) {
        logger.warn(`Running with mock, mocking PDF for local and demo for ${req.url}`)
        res.setHeader('Content-Type', 'application/pdf')
        res.status(200).send(Buffer.from(req.url?.endsWith('primary') ? pdf : alternativeDocumentPdf, 'base64'))
        return
    }

    const serverEnv = getServerEnv()
    const oboResult = await requestOboToken(accessToken, serverEnv.SYK_DIG_BACKEND_SCOPE)
    if (!oboResult.ok) {
        logger.error(new Error(`Unable to exchange OBO token: ${oboResult.error.message}`, { cause: oboResult.error }))
        res.status(401).json({ message: 'Authentication failed' })
        return
    }

    await proxyApiRouteRequest({
        hostname: serverEnv.SYK_DIG_BACKEND_HOST,
        path: req.url ?? '',
        req,
        res,
        bearerToken: oboResult.token,
        https: false,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
        responseLimit: false,
    },
}

export default handler
