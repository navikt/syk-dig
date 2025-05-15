import { ArrowDownRightIcon } from '@navikt/aksel-icons'
import React, { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { formatsmregDate } from '../../nasjonal-oppgave/smregDateUtils'

type SelectedDateProps = {
    date: Date | null | undefined
    format?: 'smreg'
}

export function SelectedDate({ date, format = 'smreg' }: SelectedDateProps): ReactElement | null {
    if (!date) return null

    return (
        <div className="ml-4 flex items-center gap-1 -mt-2">
            <ArrowDownRightIcon aria-hidden />
            <BodyShort>{formatDate(date, format)}</BodyShort>
        </div>
    )
}

type DateRange = {
    from: Date | undefined
    to?: Date | undefined
}

type SelectedRangeProps = {
    range: DateRange | undefined
    format?: 'smreg'
}

export function SelectedRange({ range, format = 'smreg' }: SelectedRangeProps): ReactElement | null {
    if (!range || (!range.from && !range.to)) return null

    return (
        <div className="ml-4 flex items-center gap-1 -mt-2">
            <ArrowDownRightIcon aria-hidden />
            <BodyShort>
                {range.from ? (
                    <span>{formatDate(range.from, format)}</span>
                ) : (
                    <span className="italic">F.o.m. mangler</span>
                )}
                <span> - </span>
                {range.to && <span>{formatDate(range.to, format)}</span>}
            </BodyShort>
        </div>
    )
}

function formatDate(date: Date, format: 'smreg'): string {
    switch (format) {
        case 'smreg':
            return formatsmregDate(date)
    }
}
