import { evaluateFlags, getDefinitions, IToggle } from '@unleash/nextjs'
import { getToken, parseAzureUserToken } from '@navikt/oasis'
import { logger } from '@navikt/next-logger'
import * as R from 'remeda'
import { cookies, headers } from 'next/headers'
import NodeCache from 'node-cache'

import { isLocalOrDemo } from '../utils/env'

import { getUnleashEnvironment, localDevelopmentToggles } from './utils'
import { EXPECTED_TOGGLES } from './toggles'
import { UNLEASH_COOKIE_NAME } from './cookie'

export async function getToggles(): Promise<{ toggles: IToggle[] }> {
    if ((EXPECTED_TOGGLES as readonly string[]).length === 0) {
        return { toggles: [] }
    }

    if (isLocalOrDemo) {
        logger.warn('Running in local or demo mode, falling back to development toggles.')
        return { toggles: localDevelopmentToggles() }
    }

    try {
        const sessionId = await getUnleashSessionId()
        const definitions = await getAndValidateDefinitions()
        const userId = (await getAzureUser())?.toLowerCase()

        return evaluateFlags(definitions, {
            sessionId,
            environment: getUnleashEnvironment(),
            userId,
        })
    } catch (e) {
        logger.error(new Error('Failed to get flags from Unleash. Falling back to default flags.', { cause: e }))
        return {
            toggles: EXPECTED_TOGGLES.map(
                (it): IToggle => ({
                    name: it,
                    variant: {
                        name: 'default',
                        // Default to on if failed
                        enabled: true,
                    },
                    impressionData: false,
                    enabled: false,
                }),
            ),
        }
    }
}

const unleashCache = new NodeCache({ stdTTL: 15 })

async function getAndValidateDefinitions(): Promise<Awaited<ReturnType<typeof getDefinitions>>> {
    if (unleashCache.has('toggles')) {
        const cachedToggles = unleashCache.get<Awaited<ReturnType<typeof getDefinitions>>>('toggles')
        if (cachedToggles != null) {
            logger.info('Using cached unleash definitions')
            return cachedToggles
        }
    }

    const definitions = await getDefinitions({ appName: 'syk-dig' })
    unleashCache.set('toggles', definitions)

    const diff = R.difference(
        EXPECTED_TOGGLES,
        R.map(definitions.features, (it) => it.name),
    )

    if (diff.length > 0) {
        logger.error(
            `Difference in expected flags and flags in unleash, expected but not in unleash: ${diff.join(', ')}`,
        )
    } else {
        logger.info(
            `Fetched ${definitions.features.length} flags from unleash, found all ${EXPECTED_TOGGLES.length} expected flags`,
        )
    }

    return definitions
}

async function getUnleashSessionId(): Promise<string> {
    const existingUnleashId = (await cookies()).get(UNLEASH_COOKIE_NAME)
    if (existingUnleashId != null) {
        return existingUnleashId.value
    } else {
        logger.warn('No existing unleash session id found, is middleware not configured?')
        return '0'
    }
}

async function getAzureUser(): Promise<string | undefined> {
    const token = getToken(await headers())
    if (token == null) {
        logger.warn('No token found in headers, cannot get NAVident')
        return undefined
    }

    const parseResult = parseAzureUserToken(token)

    if (parseResult.ok) {
        return parseResult.NAVident
    } else {
        logger.warn("Tried to get NAVident from Azure token, but it wasn't valid", { error: parseResult.error.message })
        return undefined
    }
}
