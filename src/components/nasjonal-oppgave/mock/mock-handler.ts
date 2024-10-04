import { logger } from '@navikt/next-logger'

import { raise } from '../../../utils/tsUtils'
import { pdf } from '../../../mocks/data/examplePdfbase64'
// import emptyOppgave from '../__tests__/testData/emptyOppgave.json'

import mockOppgave from './oppgave.json'
import mockSykmelder from './sykmelder.json'
import mockPasientNavn from './pasientNavn.json'

export async function mockedSmregData(request: Request, path: string): Promise<Response> {
    logger.info(`Mocking path: ${path}`)

    switch (path) {
        case 'GET /api/v1/proxy/oppgave/[id|hpr]':
            return Response.json(mockOppgave, { status: 200 })
        case 'GET /api/v1/proxy/sykmelding/[uuid]/ferdigstilt':
            return Response.json(mockOppgave, { status: 200 })
        case 'POST /api/v1/proxy/oppgave/[id|hpr]/send':
            verifyHasEnhet(request)

            const shouldRuleHit = false
            if (shouldRuleHit) {
                return Response.json({
                    status: 'INVALID',
                    ruleHits: [
                        {
                            ruleName: 'RULE_NUMBER_ONE',
                            ruleStatus: 'INVALID',
                            messageForSender: 'Dont break the rules, please',
                            messageForUser: 'message for user',
                        },
                    ],
                })
            }

            return new Response(null, { status: 204 })
        case 'POST /api/v1/proxy/sykmelding/[uuid]':
            verifyHasEnhet(request)

            return new Response(null, { status: 204 })
        case 'POST /api/v1/proxy/oppgave/[id|hpr]/avvis':
            verifyHasEnhet(request)

            return new Response(null, { status: 204 })
        case 'POST /api/v1/proxy/oppgave/[id|hpr]/tilgosys':
            return new Response(null, { status: 204 })
        case 'GET /api/v1/proxy/sykmelder/[id|hpr]':
            return Response.json(mockSykmelder, { status: 200 })
        case 'GET /api/v1/proxy/pasient':
            return Response.json(mockPasientNavn, { status: 200 })
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
