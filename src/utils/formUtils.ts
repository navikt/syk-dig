import { formatISO } from 'date-fns'
import { ChangeEventHandler } from 'react'

import { toDate } from './dateUtils'

export function safeString(value: string | null | undefined): string | null {
    if (value == null || value.trim() === '') return null

    return value.trim()
}

export function safeDate(value: Date | string | null | undefined): string | null {
    if (value == null) return null

    return formatISO(toDate(value), { representation: 'date' })
}

export function numberOnChange(originalOnChange: (value: number | null) => void): ChangeEventHandler<HTMLInputElement> {
    return (event) => {
        const value = parseInt(event.currentTarget.value, 10)
        originalOnChange(isNaN(value) ? null : value)
    }
}
