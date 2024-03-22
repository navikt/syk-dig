import { NextApiResponse } from 'next'
import { logger } from '@navikt/next-logger'

import { raise } from '../../../utils/tsUtils'

import mockOppgave from './oppgave.json'
import mockSykmelder from './sykmelder.json'
import mockPasientNavn from './pasientNavn.json'

export async function mockedSmregData(res: NextApiResponse, path: string): Promise<void> {
    logger.info(`Mocking path: ${path}`)

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    switch (path) {
        case 'GET /api/v1/oppgave/[id|hpr]':
            res.status(200).json(mockOppgave)
            return
        case 'GET /api/v1/sykmelding/[uuid]/ferdigstilt':
            res.status(200).json(mockOppgave)
            return
        case 'POST /api/v1/oppgave/[id|hpr]/send':
            const shouldRuleHit = true
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
        case 'POST /api/v1/oppgave/[id|hpr]/avvis':
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
        case 'POST /api/v1/sykmelding/[uuid]':
            res.status(418).json({ message: 'TODO' })
            return
        default:
            raise(new Error(`Unknown path: ${path}`))
    }
}
