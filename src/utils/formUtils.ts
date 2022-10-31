import { formatISO } from 'date-fns'

import { toDate } from './dateUtils'

export function safeString(value: string | null | undefined): string | null {
    if (value == null || value.trim() === '') return null

    return value.trim()
}

export function safeDate(value: Date | string | null | undefined): string | null {
    if (value == null) return null

    return formatISO(toDate(value), { representation: 'date' })
}
