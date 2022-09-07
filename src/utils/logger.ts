import pino from 'pino';

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetch('/api/logger', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(logEvent),
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn('Unable to log to backend', logEvent);
                    }
                },
            },
        },
    });

const createBackendLogger = (): pino.Logger =>
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../../next-logger.config').logger();

const logger = typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger();

export default logger;
