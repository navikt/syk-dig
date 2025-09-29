import { cookies } from 'next/headers'
import { logger } from '@navikt/next-logger'

export type PersistentPaneLayout = [number, number] | undefined

export type PaneView = {
    layout: PersistentPaneLayout
}

export async function getPersistentPaneLayout(): Promise<PersistentPaneLayout> {
    const layout = (await cookies()).get('syk-dig-split-view:layout')
    if (!layout) return undefined

    const sizes = layout ? JSON.parse(layout.value) : undefined
    if (Array.isArray(sizes) && sizes.length === 2) {
        logger.info(`Users persisted layout is ${JSON.stringify(sizes)}`)
        return sizes as [number, number]
    }

    logger.warn(`Invalid layout found in cookie, defaulting to undefined, cookie value: ${layout.value}`)
    return undefined
}
