import { StartOptions } from 'msw';

const whitelistRequests = ['/_next/', '/api/country', '/api/diagnose', '/api/logger'];

const onUnhandledRequest: StartOptions['onUnhandledRequest'] = (req, print): void => {
    if (whitelistRequests.some((whitelisted) => req.url.pathname.startsWith(whitelisted))) {
        return;
    }

    print.warning();
};

async function initMocks(): Promise<void> {
    if (typeof window === 'undefined') {
        // We don't use MSW for mocking server side in dev, only tests
        if (process.env.NODE_ENV !== 'test') return;

        const { server } = await import('./server');
        server.listen();
    } else {
        const { worker } = await import('./browser');
        worker.start({
            onUnhandledRequest,
        });
    }
}

initMocks();

export {};
