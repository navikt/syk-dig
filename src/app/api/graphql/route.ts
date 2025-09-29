import { proxyRouteHandler } from '@navikt/next-api-proxy'
import { logger } from '@navikt/next-logger'
import { getToken, requestOboToken } from '@navikt/oasis'
import { notFound } from 'next/navigation'

import { getServerEnv, isLocalOrDemo } from '../../../utils/env'
import { isValidToken } from '../../../auth/rsc'
import { createMockGraphQLHandler } from '../../../mocks/graphql-yoga'

interface NextContext {
    params: Promise<Record<string, string>>
}

export async function POST(request: Request, ctx: NextContext): Promise<Response> {
    if (isLocalOrDemo) {
        const mockGraphQLHandler = createMockGraphQLHandler()

        return mockGraphQLHandler(request, ctx)
    }

    logger.info('Proxying request to syk-dig GraphQL API')

    const userLoggedIn = await isValidToken()
    if (!userLoggedIn) {
        return Response.json({ reason: 'Not logged in' }, { status: 401 })
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
        return Response.json({ message: 'Authentication failed' }, { status: 401 })
    }

    try {
        return await proxyRouteHandler(request, {
            hostname: serverEnv.SYK_DIG_BACKEND_HOST,
            path: '/api/graphql',
            https: false,
            bearerToken: oboResult.token,
        })
    } catch (error: unknown) {
        logger.error(error)
        return Response.json({ message: 'Unable to proxy request' }, { status: 500 })
    }
}

export async function GET(request: Request, ctx: NextContext): Promise<Response> {
    if (isLocalOrDemo) {
        const mockGraphQLHandler = createMockGraphQLHandler()

        return mockGraphQLHandler(request, ctx)
    }

    notFound()
}
