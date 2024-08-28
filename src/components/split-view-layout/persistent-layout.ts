import { cookies } from 'next/headers'
import { logger } from '@navikt/next-logger'

export type PersistentPaneLayout = [number, number] | undefined

export type PaneView = {
    layout: PersistentPaneLayout
}

export function getPersistentPaneLayout(): PersistentPaneLayout {
    const layout = cookies().get('syk-dig-split-view:layout')

    const sizes = layout ? JSON.parse(layout.value) : undefined

    if (Array.isArray(sizes) && sizes.length === 2) {
        return sizes as [number, number]
    }

    logger.warn('Invalid layout found in cookie, defaulting to undefined', layout)
    return undefined
}
