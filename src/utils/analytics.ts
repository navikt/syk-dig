import { logger } from '@navikt/next-logger'

const analyticsLogger = logger.child({ x_source: 'analytics' })

const analytics = {
    splitViewToggled: (value: string, byDrag?: boolean) =>
        analyticsLogger.info(`splitViewToggled ${value} ${byDrag ? 'byDrag' : ''}`),
    splitViewTabToggled: (value: string) => analyticsLogger.info(`splitViewTabToggled ${value}`),
}

export default analytics
