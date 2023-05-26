import { lazyNextleton } from 'nextleton'

import { FakeMockDB } from './mockDb'

const getMockDb = lazyNextleton('mock-db', () => new FakeMockDB())

export default getMockDb
