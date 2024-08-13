import { NextApiRequest, NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'

import { raise } from '../../../utils/tsUtils'
import { pdf } from '../../../mocks/data/examplePdfbase64'
// import emptyOppgave from '../__tests__/testData/emptyOppgave.json'

import mockOppgave from './oppgave.json'
import mockSykmelder from './sykmelder.json'
import mockPasientNavn from './pasientNavn.json'

export async function mockedSmregData(req: NextApiRequest, res: NextApiResponse, path: string): Promise<void> {
    logger.info(`Mocking path: ${path}`)

    switch (path) {
        case 'GET /api/v1/oppgave/[id|hpr]':
            res.status(200).json(mockOppgave)
            return
        case 'GET /api/v1/sykmelding/[uuid]/ferdigstilt':
            res.status(200).json(mockOppgave)
            return
        case 'POST /api/v1/oppgave/[id|hpr]/send':
            verifyHasEnhet(req)

            const shouldRuleHit = false
            if (shouldRuleHit) {
                res.status(400).json({
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
                return
            }

            res.status(204).end()
            return
        case 'POST /api/v1/sykmelding/[uuid]':
            verifyHasEnhet(req)

            res.status(204).end()
            return
        case 'POST /api/v1/oppgave/[id|hpr]/avvis':
            verifyHasEnhet(req)

            res.status(204).end()
            return
        case 'POST /api/v1/oppgave/[id|hpr]/tilgosys':
            res.status(204).end()
            return
        case 'GET /api/v1/sykmelder/[id|hpr]':
            res.status(200).json(mockSykmelder)
            return
        case 'GET /api/v1/pasient':
            res.status(200).json(mockPasientNavn)
            return
        case 'GET /api/v1/pdf/[id|hpr]/[id|hpr]':
            res.status(200)
            res.setHeader('Content-Type', 'application/pdf')
            res.send(Buffer.from(pdf, 'base64'))
            return
        default:
            raise(new Error(`Unknown path: ${path}`))
    }
}

function verifyHasEnhet(req: NextApiRequest): void | never {
    if (!req.headers['x-nav-enhet']) {
        throw new Error('Missing X-Nav-Enhet header')
    }
}
