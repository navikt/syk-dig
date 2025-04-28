import { StartOptions } from 'msw/browser'

const whitelistRequests = ['/_next/', '/__nextjs', '/api/logger', '/teamsykmelding/syk-dig/_next', '/aksel/fonts']

const onUnhandledRequest: StartOptions['onUnhandledRequest'] = (req, print): void => {
    const url: URL = new URL(req.url)
    if (whitelistRequests.some((whitelisted) => url.pathname.startsWith(whitelisted))) {
        return
    }

    // RSC preloading
    if (url.search.includes('_rsc')) {
        return
    }

    // Server actions POST to the route they are currently on, and we need to let them all through
    if (req.headers.get('Next-Action') != null) {
        return
    }

    print.warning()
}

async function initMocks(): Promise<void> {
    if (typeof window === 'undefined') {
        // We don't use MSW for mocking server side in dev, only tests
        if (process.env.NODE_ENV !== 'test') return

        const { server } = await import('./server')
        server.listen()
    } else {
        const { worker } = await import('./browser')
        worker.start({
            onUnhandledRequest,
        })
    }
}

initMocks()

export {}
