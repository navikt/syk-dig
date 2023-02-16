import React from 'react'
import { useComboboxState } from 'ariakit/combobox'
import { useQuery } from '@apollo/client'

import { ComboboxWrapper, DsCombobox, DsComboboxItem, DsComboboxPopover } from '../../CustomFormComponents/Combobox'
import { DiagnoseSystem } from '../../../Sykmelding/DiagnoseFormSection'
import { DiagnoseSuggestion } from '../../../../pages/api/diagnose/[system].api'
import { DsComboboxNoResult } from '../../CustomFormComponents/Combobox'
import { PossiblePickerFormNames } from '../DiagnosePicker'
import { DiagnoseSuggestionsDocument } from '../../../../graphql/queries/graphql.generated'

interface Props {
    id?: string
    name: PossiblePickerFormNames
    system: DiagnoseSystem
    onSelect: (value: DiagnoseSuggestion) => void
    onChange: () => void
    initialValue: string | null
}

function DiagnoseCombobox({ id, name, system, onSelect, onChange, initialValue }: Props): JSX.Element {
    const combobox = useComboboxState({
        gutter: 8,
        sameWidth: true,
        defaultValue: initialValue ?? undefined,
        setValue: (value) => {
            onChange()

            const diagnose = data?.suggestions.find((it) => it.code.toLowerCase() === value.toLowerCase())

            // User input doesn't match any actual codes, do nothing
            if (!diagnose) return

            // When user types an entire valid code, select it and close the popover
            onSelect(diagnose)
            combobox.hide()
        },
    })
    const { data, loading } = useQuery(DiagnoseSuggestionsDocument, {
        variables: { system: system.toLowerCase(), value: combobox.value.trim() },
        skip: combobox.value.trim() === '',
    })

    return (
        <ComboboxWrapper labelId={`${id}-label`} label="Diagnosekode">
            <DsCombobox id={name} aria-labelledby={`${id}-label`} state={combobox} placeholder={`Velg`} />
            <DsComboboxPopover state={combobox}>
                {loading ? (
                    <DsComboboxNoResult text={`Laster forslag..."`} />
                ) : data && data.suggestions.length > 0 ? (
                    data.suggestions.map((suggestion) => (
                        <DsComboboxItem key={suggestion.code} value={suggestion.code}>
                            {suggestion.code}
                        </DsComboboxItem>
                    ))
                ) : combobox.value.trim() === '' ? (
                    <DsComboboxNoResult text={`Søk i ${system} diagnoser`} />
                ) : (
                    <DsComboboxNoResult text={`Fant ingen diagnose med kode eller beskrivelse "${combobox.value}"`} />
                )}
            </DsComboboxPopover>
        </ComboboxWrapper>
    )
}

export default DiagnoseCombobox
