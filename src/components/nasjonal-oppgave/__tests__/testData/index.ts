import { lazyNextleton } from 'nextleton'

import { FakeNasjonalMockDB } from './mockDb'

const getNasjonalMockDb = lazyNextleton('mock-db', () => new FakeNasjonalMockDB())

export default getNasjonalMockDb
