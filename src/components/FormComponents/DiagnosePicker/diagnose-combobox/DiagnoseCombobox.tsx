import { useState, ReactElement, startTransition } from 'react'
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
} from '../../combobox/AkselifiedCombobox'
import { PossiblePickerFormNames } from '../DiagnosePicker'

import { DiagnoseSuggestion, DiagnoseSystem } from './types'
import { getDiagnoseSuggestionsAction } from './actions'

interface Props {
    id?: string
    className?: string
    name: PossiblePickerFormNames
    system: DiagnoseSystem
    label: string
    onSelect: (value: DiagnoseSuggestion) => void
    onChange: () => void
    initialValue: string | null
}

function DiagnoseCombobox({
    id,
    className,
    name,
    system,
    label,
    onSelect,
    onChange,
    initialValue,
}: Props): ReactElement {
    const [searchValue, setSearchValue] = useState(initialValue ?? '')
    const { data, isLoading, error } = useSWR(
        () => {
            if (searchValue.trim() === '') return null
            return [system, searchValue]
        },
        ([system, value]) => getDiagnoseSuggestionsAction(system, value),
        {
            keepPreviousData: true,
            onError: (err) => {
                logger.error(err)
            },
        },
    )

    const suggestions = data == null ? [] : 'reason' in data ? [] : data.suggestions

    return (
        <AkselifiedComboboxWrapper
            labelId={`${id}-label`}
            label={label}
            className={className}
            defaultValue={initialValue ?? undefined}
            setValue={(value) => {
                const selectedSuggestion = suggestions.find((it) => it.code.toLowerCase() === value.toLowerCase())

                startTransition(() => {
                    onChange()

                    if (selectedSuggestion) {
                        onSelect(selectedSuggestion)
                    }

                    setSearchValue(value)
                })
            }}
        >
            <AkselifiedCombobox id={name} aria-labelledby={`${id}-label`} placeholder="Søk på kode eller beskrivelse">
                <AkselifiedComboboxDisclosure loading={data != null && isLoading} />
            </AkselifiedCombobox>
            <AkselifiedComboboxPopover>
                <AkselifiedComboboxNonSelectables>
                    {data == null && isLoading && <AkselifiedComboboxLoading />}
                    {(searchValue.trim() === '' || (data == null && !isLoading)) && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            Søk på enten kode eller beskrivelse
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                    {data && suggestions.length === 0 && !isLoading && searchValue.trim() !== '' && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            {`Fant ingen diagnose med kode eller beskrivelse "${searchValue}"`}
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                    {error && (
                        <AkselifiedComboboxNonInteractiveFeedbackItem>
                            {`Feil ved henting av ${system}-kode. Prøv igjen senere.`}
                        </AkselifiedComboboxNonInteractiveFeedbackItem>
                    )}
                </AkselifiedComboboxNonSelectables>
                {searchValue &&
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
