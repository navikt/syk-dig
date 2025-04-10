import { logger } from '@navikt/next-logger'

import { raise } from '../../../utils/tsUtils'
import { pdf } from '../../../mocks/data/examplePdfbase64'

export async function mockedSmregData(request: Request, path: string): Promise<Response> {
    logger.info(`Mocking path: ${path}`)

    switch (path) {
        case 'GET /api/v1/proxy/pdf/[id|hpr]/[id|hpr]':
            return new Response(Buffer.from(pdf, 'base64'), {
                headers: { 'Content-Type': 'application/pdf' },
                status: 200,
            })
        default:
            raise(new Error(`Unknown path: ${path}`))
    }
}
