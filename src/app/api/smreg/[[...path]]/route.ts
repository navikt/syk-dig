import { proxyRouteHandler } from '@navikt/next-api-proxy'
import { logger } from '@navikt/next-logger'
import { getToken, requestOboToken } from '@navikt/oasis'

import { getServerEnv, isLocalOrDemo } from '../../../../utils/env'
import { mockedSmregData } from '../../../../components/nasjonal-oppgave/mock/mock-handler'

import { allowedAPIs, cleanPath } from './config'

type RouteParams = {
    params: Promise<{ path: string[] }>
}

export const GET = smregProxy
export const POST = smregProxy

async function smregProxy(request: Request, { params }: RouteParams): Promise<Response> {
    const proxyPath = `/${(await params).path.join('/')}`
    const api = `${request.method} ${proxyPath}`

    if (!allowedAPIs.includes(cleanPath(api))) {
        logger.warn(`404 Unknown API: ${api}, clean path: ${cleanPath(api)}`)
        return Response.json({ message: 'Not found' }, { status: 404 })
    }

    if (isLocalOrDemo) {
        return await mockedSmregData(request, cleanPath(api))
    }

    const accessToken = getToken(request)
    if (!accessToken) {
        logger.error('No access token found in request')
        return new Response('Not logged in', { status: 401 })
    }

    const serverEnv = getServerEnv()
    const oboResult = await requestOboToken(accessToken, serverEnv.SYK_DIG_BACKEND_SCOPE)
    if (!oboResult.ok) {
        logger.error(new Error(`Unable to exchange OBO token: ${oboResult.error.message}`, { cause: oboResult.error }))
        return new Response('Not logged in', { status: 401 })
    }

    logger.info(`Proxying request for path ${serverEnv.SYK_DIG_BACKEND_HOST}${proxyPath}`)
    return await proxyRouteHandler(request, {
        hostname: serverEnv.SYK_DIG_BACKEND_HOST,
        path: proxyPath,
        https: false,
        bearerToken: oboResult.token,
    })
}
