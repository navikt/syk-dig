import { logger } from '@navikt/next-logger'

import { raise } from '../../../utils/tsUtils'
import { pdf } from '../../../mocks/data/examplePdfbase64'

export async function mockedSmregData(request: Request, path: string): Promise<Response> {
    logger.info(`Mocking path: ${path}`)

    switch (path) {
        case 'POST /api/v1/proxy/oppgave/[id|hpr]/avvis':
            verifyHasEnhet(request)

            return new Response(null, { status: 204 })
        case 'GET /api/v1/proxy/pdf/[id|hpr]/[id|hpr]':
            return new Response(Buffer.from(pdf, 'base64'), {
                headers: { 'Content-Type': 'application/pdf' },
                status: 200,
            })
        default:
            raise(new Error(`Unknown path: ${path}`))
    }
}

function verifyHasEnhet(req: Request): void | never {
    if (!req.headers.get('x-nav-enhet')) {
        throw new Error('Missing X-Nav-Enhet header')
    }
}
