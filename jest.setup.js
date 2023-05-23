import 'next'
import '@testing-library/jest-dom/extend-expect'

import { TextDecoder, TextEncoder } from 'node:util'

import { toHaveNoViolations } from 'jest-axe'
import { Modal } from '@navikt/ds-react'
import mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'

import { server } from './src/mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('@navikt/next-auth-wonderwall', () => ({
    validateAzureToken: () => Promise.resolve(true),
}))

window.TextEncoder = TextEncoder
window.TextDecoder = TextDecoder
window.ResizeObserver = jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
}))

const url = 'http://example.com'
Object.defineProperty(window, 'location', {
    value: {
        href: url,
    },
})

Modal.setAppElement(document.createElement('div'))

mockRouter.useParser(createDynamicRouteParser(['/oppgave/[oppgaveId]']))

expect.extend(toHaveNoViolations)

process.env.DEBUG_PRINT_LIMIT = 50000
