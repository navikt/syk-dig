import { format } from 'date-fns'
import { nb } from 'date-fns/locale'

import { toDate } from '../../utils/dateUtils'

export const SMREG_SHORTHAND_FORMAT = 'ddMMyy'

export function formatsmregDate(date: string | Date): string {
    return format(toDate(date), 'd. MMMM yyyy', { locale: nb })
}

export function formatsmregDateShorthand(date: string | Date): string {
    return format(toDate(date), SMREG_SHORTHAND_FORMAT, { locale: nb })
}
