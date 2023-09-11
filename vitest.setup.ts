import 'vitest-axe/extend-expect'
import 'vitest-dom/extend-expect'
import * as matchers from 'vitest-dom/matchers'
import * as vitestAxeMatchers from 'vitest-axe/matchers'
import { vi, beforeAll, afterEach, afterAll, expect } from 'vitest'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'
import { cleanup } from '@testing-library/react'

import { server } from './src/mocks/server'

expect.extend(matchers)
expect.extend(vitestAxeMatchers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dirtyGlobal = global as any
dirtyGlobal.TextEncoder = TextEncoder
dirtyGlobal.TextDecoder = TextDecoder
dirtyGlobal.ResizeObserver = vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
}))

dirtyGlobal.HTMLCanvasElement.prototype.getContext = vi.fn()

vi.mock('next/router', () => vi.importActual('next-router-mock'))

mockRouter.useParser(createDynamicRouteParser(['/oppgave/[oppgaveId]']))

afterEach(() => {
    cleanup()
})

process.env.DEBUG_PRINT_LIMIT = '50000'
