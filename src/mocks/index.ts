import { StartOptions } from 'msw/browser'

const whitelistRequests = [
    '/_next/',
    '/__nextjs',
    '/api/country',
    '/api/diagnose',
    '/api/logger',
    '/api/smreg',
    '/teamsykmelding/syk-dig/_next',
    '/aksel/fonts',
]

const onUnhandledRequest: StartOptions['onUnhandledRequest'] = (req, print): void => {
    const url: URL = new URL(req.url)
    if (whitelistRequests.some((whitelisted) => url.pathname.startsWith(whitelisted))) {
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
