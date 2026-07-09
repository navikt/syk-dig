import 'vitest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import * as mockRouter from 'next-router-mock'
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes'
import { vi, expect, afterEach } from 'vitest'
import * as matchers from 'vitest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
    cleanup()
})

global.HTMLCanvasElement.prototype.getContext = vi.fn<never>()

const useRouter = mockRouter.useRouter

export const MockNextNavigation = {
    ...mockRouter,
    notFound: vi.fn<never>(),
    redirect: vi.fn<(url: string) => void>().mockImplementation(function (url: string) {
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
