/* eslint-disable @typescript-eslint/no-require-imports */
import { logger } from '@navikt/next-logger'

import { isLocalOrDemo } from './utils/env'

if (isLocalOrDemo) {
    logger.info('Setting up MSW for local or demo')
    require('./mocks')
}
