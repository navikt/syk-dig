import { logger } from '@navikt/next-logger'

import { MockEngine } from './MockEngine'

/**
 * Keeps track of the mock "database" for each session by session id. Should only have a single instance per server.
 */
export class MockSessionStore {
    private sessionRecord: Record<string, MockEngine> = {}

    get(sessionId: string): MockEngine {
        if (this.sessionRecord[sessionId] == null) {
            logger.info(`No session found for ${sessionId}, initalizing new MockEngine`)
            this.sessionRecord[sessionId] = new MockEngine()
        }

        return this.sessionRecord[sessionId]
    }

    set(sessionId: string): void {
        logger.info(`Resetting scenario for session ${sessionId}`)
        this.sessionRecord[sessionId] = new MockEngine()
    }
}
