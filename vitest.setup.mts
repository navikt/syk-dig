import 'vitest-axe/extend-expect'
import 'vitest-dom/extend-expect'
import * as matchers from 'vitest-dom/matchers'
import * as vitestAxeMatchers from 'vitest-axe/matchers'
import { vi, expect, afterEach } from 'vitest'
import * as mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'
import { cleanup } from '@testing-library/react'

expect.extend(matchers)
expect.extend(vitestAxeMatchers)

afterEach(() => {
    cleanup()
})

global.HTMLCanvasElement.prototype.getContext = vi.fn()

const useRouter = mockRouter.useRouter

export const MockNextNavigation = {
    ...mockRouter,
    notFound: vi.fn(),
    redirect: vi.fn().mockImplementation(function (url: string) {
        mockRouter.memoryRouter.setCurrentUrl(url)
    }),
    usePathname: () => {
        const router = useRouter()
        return router.asPath
    },
    useSearchParams: () => {
        const router = useRouter()
        const path = router.query
        return new URLSearchParams(path as never)
    },
    useParams: () => {
        const router = useRouter()
        const path = router.query
        return path as never
    },
}

vi.mock('next/navigation', function () {
    return MockNextNavigation
})

mockRouter.memoryRouter.useParser(createDynamicRouteParser(['/oppgave/[oppgaveId]']))

process.env.DEBUG_PRINT_LIMIT = '500000'
