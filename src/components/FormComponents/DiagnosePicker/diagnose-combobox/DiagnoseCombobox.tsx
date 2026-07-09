import { UNSAFE_Combobox as Combobox } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import React, { ReactElement, useState } from 'react'
import useSWR from 'swr'

import { raise } from '../../../../utils/tsUtils'
import { cn } from '../../../../utils/tw-utils'

import styles from './DiagnoseCombobox.module.css'
import { Diagnose, DiagnoseSystem } from './types'

interface Props {
    id?: string
    className?: string
    label: string
    description?: string
    system: DiagnoseSystem
    value: Diagnose | null
    onSelect: (value: Diagnose) => void
    onBlur: () => void
    error: string | undefined
}

export function DiagnoseCombobox({
    id,
    className,
    label,
    description,
    system,
    value,
    onSelect,
    onBlur,
    error,
}: Props): ReactElement {
    const comboRef = React.useRef<HTMLInputElement>(null)
    const endreRef = React.useRef<HTMLButtonElement>(null)

    const [query, setQuery] = useState(value ? value.code : '')
    const { isLoading, hasError, suggestions } = useSuggestions(query, system)
    const serverSuggestionOptions = suggestions.map((it) => {
        return {
            label: `${it.text} - ${it.code}`,
            value: createUniqueValue(it),
        }
    })

    const handleOnToggleSelected = (value: string): void => {
        const unwrappedValue = unwrapUniqueValue(value)
        const selectedSuggestion = suggestions.find(
            (it) =>
                it.code.toLowerCase() === unwrappedValue.code.toLowerCase() &&
                it.system.toLowerCase() === unwrappedValue.system.toLowerCase(),
        )

        if (selectedSuggestion == null) {
            raise("Illegal state: Selected suggestion doesn't match with cache")
        }

        onSelect(selectedSuggestion)

        requestAnimationFrame(() => {
            endreRef.current?.focus()
        })
    }

    return (
        <Combobox
            ref={comboRef}
            id={id}
            label={label}
            description={description}
            className={cn(styles.comboboxWrapper, className)}
            value={query}
            onChange={setQuery}
            isLoading={isLoading}
            error={hasError ? 'Klarte ikke å søke i diagnoser, prøv igjen senere' : error}
            onBlur={onBlur}
            filteredOptions={serverSuggestionOptions}
            options={serverSuggestionOptions}
            onToggleSelected={handleOnToggleSelected}
            placeholder="Start å skrive for å søke etter diagnosekode"
        />
    )
}

function useSuggestions(
    value: string,
    system: 'ICD10' | 'ICPC2',
): {
    isLoading: boolean
    hasError: boolean
    suggestions: Diagnose[]
} {
    const { data, isLoading, error } = useSWR(
        () => {
            if (value.trim() === '') return null
            return [system, value]
        },
        ([system, value]): Promise<{ suggestions: Diagnose[] } | { reason: string }> =>
            fetch(`/api/diagnose?system=${system}&value=${encodeURIComponent(value)}`).then((it) => it.json()),
        {
            keepPreviousData: true,
            onError: (err) => {
                logger.error(err)
            },
        },
    )

    const suggestions = data == null ? [] : 'reason' in data ? [] : data.suggestions

    return { isLoading, hasError: error != null, suggestions }
}

function createUniqueValue(suggestion: Diagnose): string {
    return `${suggestion.code} - ${suggestion.system}`
}

function unwrapUniqueValue(value: string): Pick<Diagnose, 'code' | 'system'> {
    const [code, system] = value.split(' - ')

    return {
        system: system as DiagnoseSystem,
        code,
    }
}
