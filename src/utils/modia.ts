import { logger } from '@navikt/next-logger'

import { bundledEnv, isLocalOrDemo } from './env'

export function redirectTilModia(): void {
    if (isLocalOrDemo) {
        logger.info('Running local or demo, not redirecting to Modia')
        return
    }

    window.location.href = bundledEnv.NEXT_PUBLIC_MODIA_URL
}
