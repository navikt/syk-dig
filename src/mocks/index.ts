import { lazyNextleton } from 'nextleton'

import { MockSessionStore } from './MockSessionStore'
import { type MockEngine } from './MockEngine'
import { getSessionId } from './session'

const sessionRecord = lazyNextleton('mock-session-store', () => new MockSessionStore())

export async function mockEngineForSession(): Promise<MockEngine> {
    const sessionId = await getSessionId()
    if (sessionId == null) {
        throw new Error('Session ID is not set. Cannot access mock engine.')
    }

    return sessionRecord().get(sessionId)
}
