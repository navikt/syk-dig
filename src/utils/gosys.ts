import { logger } from '@navikt/next-logger'

import { bundledEnv, isLocalOrDemo } from './env'

export function redirectTilGosys(): void {
    if (isLocalOrDemo) {
        logger.info('Running local or demo, not redirecting to GOSYS')
        return
    }

    window.location.href = bundledEnv.NEXT_PUBLIC_GOSYS_URL
}
