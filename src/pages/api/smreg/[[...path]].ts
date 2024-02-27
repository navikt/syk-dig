import { proxyApiRouteRequest } from '@navikt/next-api-proxy'
import { logger } from '@navikt/next-logger'
import { requestOboToken } from '@navikt/oasis'

import { getServerEnv, isLocalOrDemo } from '../../../utils/env'
import { withAuthenticatedApi } from '../../../auth/pages'
import { mockedSmregData } from '../../../components/nasjonal-oppgave/mock/mock-handler'

const allowedAPIs = [
    'GET /api/v1/pasient',
    'GET /api/v1/oppgave/[id|hpr]',
    'GET /api/v1/sykmelder/[id|hpr]',
    'POST /api/v1/oppgave/[id|hpr]/tilgosys',
    'POST /api/v1/oppgave/[id|hpr]/avvis',
    'POST /api/v1/oppgave/[id|hpr]/send',
    'GET /api/v1/sykmelding/[uuid]/ferdigstilt',
    'POST /api/v1/sykmelding/[uuid]',
    'GET /api/v1/pdf/[id|hpr]/[id|hpr]',
]

const handler = withAuthenticatedApi(async (req, res, accessToken) => {
    const rewrittenPath = req.url!.replace(`/api/smreg`, '')
    const api = `${req.method} ${rewrittenPath}`
    if (!allowedAPIs.includes(cleanPath(api))) {
        logger.warn(`404 Unknown API: ${api}, clean path: ${cleanPath(api)}`)
        res.status(404)
        res.send(null)
        return
    }

    if (isLocalOrDemo) {
        await mockedSmregData(req, res, cleanPath(api))
        return
    }

    const serverEnv = getServerEnv()
    const oboResult = await requestOboToken(accessToken, serverEnv.SMREGISTRERING_BACKEND_SCOPE)
    if (!oboResult.ok) {
        logger.error(new Error(`Unable to exchange token: ${oboResult.error.message}`, { cause: oboResult.error }))
        res.status(500)
        res.send(null)
        return
    }

    logger.info(`Proxying request for path ${serverEnv.SMREGISTRERING_BACKEND_HOST}${rewrittenPath}`)
    await proxyApiRouteRequest({
        path: rewrittenPath,
        req,
        res,
        bearerToken: oboResult.token,
        hostname: serverEnv.SMREGISTRERING_BACKEND_HOST,
        https: false,
    })
})

const UUID = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g
const OPPGAVE_OR_HPR = /[0-9]{7,9}/g

export function cleanPath(value: string): string {
    return value?.replace(UUID, '[uuid]').replace(OPPGAVE_OR_HPR, '[id|hpr]')
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
