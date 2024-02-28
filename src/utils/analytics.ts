import { logger } from '@navikt/next-logger'

const analyticsLogger = logger.child({ x_source: 'analytics' })

const analytics = {
    splitViewToggled: (value: boolean) => analyticsLogger.info(`splitViewToggled ${value}`),
    splitViewTabToggled: (value: string) => analyticsLogger.info(`splitViewTabToggled ${value}`),
}

export default analytics
