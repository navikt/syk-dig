import { formatISO, parseISO } from 'date-fns'

export function safeToDate(date: string | Date | null | undefined): Date | null {
    return date ? toDate(date) : null
}

export function toDate(date: string | Date): Date {
    return typeof date === 'string' ? parseISO(date) : date
}

export function toDateString(date: Date | string): string {
    return formatISO(date, { representation: 'date' })
}
