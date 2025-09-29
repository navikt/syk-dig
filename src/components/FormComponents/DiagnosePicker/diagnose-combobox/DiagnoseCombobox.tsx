import { ReactElement, startTransition } from 'react'
import useSWR from 'swr'
import { Detail, Label } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

import {
    AkselifiedCombobox,
    AkselifiedComboboxDisclosure,
    AkselifiedComboboxItem,
    AkselifiedComboboxLoading,
    AkselifiedComboboxNonInteractiveFeedbackItem,
    AkselifiedComboboxNonSelectables,
    AkselifiedComboboxPopover,
    AkselifiedComboboxWrapper,
    useComboboxStore,
    useStoreState,
} from '../../combobox/AkselifiedCombobox'
import { PossiblePickerFormNames } from '../DiagnosePicker'

import { DiagnoseSuggestion, DiagnoseSystem } from './types'

interface Props {
    id?: string
    className?: string
    name: PossiblePickerFormNames
    system: DiagnoseSystem
    value: string | null
    label: string
    onSelect: (value: DiagnoseSuggestion) => void
    onChange: () => void
}

function useSuggestions(
    value: string,
    system: 'ICD10' | 'ICPC2',
): {
    isLoading: boolean
    hasError: boolean
    suggestions: DiagnoseSuggestion[]
} {
    const { data, isLoading, error } = useSWR(
        () => {
            if (value.trim() === '') return null
            return [system, value]
        },
        ([system, value]): Promise<{ suggestions: DiagnoseSuggestion[] } | { reason: string }> =>
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

function DiagnoseCombobox({ id, className, name, system, value, label, onSelect, onChange }: Props): ReactElement {
    const combobox = useComboboxStore({
        defaultValue: value ?? '',
        selectedValue: value ?? '',
        setSelectedValue: (value) => {
            const selectedSuggestion = suggestions.find((it) => it.code.toLowerCase() === value.toLowerCase())
            onSelect(selectedSuggestion as DiagnoseSuggestion)
        },
        setValue: () => {
            startTransition(() => {
                onChange()
            })
        },
    })
    const state = useStoreState(combobox)
    const { isLoading, hasError, suggestions } = useSuggestions(state.value, system)

    return (
        <AkselifiedComboboxWrapper labelId={`${id}-label`} label={label} className={className} store={combobox}>
            <AkselifiedCombobox id={name} aria-labelledby={`${id}-label`} placeholder="Søk på kode eller beskrivelse">
                <AkselifiedComboboxDisclosure loading={suggestions.length > 0 && isLoading} />
            </AkselifiedCombobox>
            <AkselifiedComboboxPopover>
                <AkselifiedComboboxNonSelectables>
                    {suggestions.length === 0 && isLoading && <AkselifiedComboboxLoading />}
                    {(state.value.trim() === '' || (suggestions.length === 0 && !isLoading)) && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            Søk på enten kode eller beskrivelse
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                    {suggestions.length === 0 && !isLoading && state.value.trim() !== '' && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            {`Fant ingen diagnose med kode eller beskrivelse "${state.value}"`}
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                    {hasError && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            {`Feil ved henting av ${system}-kode. Prøv igjen senere.`}
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                </AkselifiedComboboxNonSelectables>
                {state.value &&
                    suggestions.length > 0 &&
                    suggestions.map((value) => (
                        <AkselifiedComboboxItem key={value.code} value={value.code}>
                            <Label>{value.code}</Label>
                            <Detail className="text-right break-words ml-2 max-w-48 overflow-hidden">
                                {value.text}
                            </Detail>
                        </AkselifiedComboboxItem>
                    ))}
            </AkselifiedComboboxPopover>
        </AkselifiedComboboxWrapper>
    )
}

export default DiagnoseCombobox
