import { logger } from '@navikt/next-logger'
import { getToken, requestOboToken } from '@navikt/oasis'
import { proxyRouteHandler } from '@navikt/next-api-proxy'

import { getServerEnv, isLocalOrDemo } from '../../../../utils/env'
import { alternativeDocumentPdf, pdf } from '../../../../mocks/data/examplePdfbase64'

type RouteParams = {
    params: { path: string[] }
}

export async function GET(request: Request, { params }: RouteParams): Promise<Response> {
    const serverEnv = getServerEnv()

    if (isLocalOrDemo) {
        logger.warn(`Running with mock, mocking PDF for local and demo for ${params.path.join('/')}`)
        return new Response(Buffer.from(params.path.includes('primary') ? pdf : alternativeDocumentPdf, 'base64'), {
            headers: { 'Content-Type': 'application/pdf' },
            status: 200,
        })
    }

    const accessToken = getToken(request)
    if (!accessToken) {
        logger.error('No access token found in request')
        return new Response('Not logged in', { status: 401 })
    }

    const oboResult = await requestOboToken(accessToken, serverEnv.SYK_DIG_BACKEND_SCOPE)
    if (!oboResult.ok) {
        logger.error(new Error(`Unable to exchange OBO token: ${oboResult.error.message}`, { cause: oboResult.error }))
        return new Response('Not logged in', { status: 401 })
    }

    const proxyPath = `/api/document/${params.path.join('/')}`
    logger.info(`Proxying document request to syk-dig-backend to ${proxyPath}`)
    return proxyRouteHandler(request, {
        hostname: serverEnv.SYK_DIG_BACKEND_HOST,
        path: proxyPath,
        https: false,
        bearerToken: oboResult.token,
    })
}
