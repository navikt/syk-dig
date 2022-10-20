import React, { useEffect, useState } from 'react';
import { useComboboxState } from 'ariakit/combobox';

import { ComboboxWrapper, DsCombobox, DsComboboxItem, DsComboboxPopover } from '../../CustomFormComponents/Combobox';
import { DiagnoseSystem } from '../../../Sykmelding/DiagnoseFormSection';
import { DiagnoseSearchResult, DiagnoseSuggestion } from '../../../../pages/api/diagnose/[system].api';
import { api } from '../../../../utils/apiUtils';
import { DsComboboxNoResult } from '../../CustomFormComponents/Combobox';

interface Props {
    id?: string;
    system: DiagnoseSystem;
    onSelect: (value: DiagnoseSuggestion) => void;
    onChange: () => void;
    initialValue: string | null;
}

function DiagnoseCombobox({ id, system, onSelect, onChange, initialValue }: Props): JSX.Element {
    const combobox = useComboboxState({
        gutter: 8,
        sameWidth: true,
        defaultValue: initialValue ?? undefined,
        setValue: (value) => {
            onChange();

            const diagnose = suggestions.find((it) => it.code.toLowerCase() === value.toLowerCase());

            // User input doesn't match any actual codes, do nothing
            if (!diagnose) return;

            // When user types an entire valid code, select it and close the popover
            onSelect(diagnose);
            combobox.hide();
        },
    });
    const suggestions = useDiagnoseSuggestions(system, combobox.value);

    return (
        <ComboboxWrapper labelId={`${id}-label`} label="Diagnosekode">
            <DsCombobox aria-labelledby={`${id}-label`} state={combobox} placeholder={`Søk i ${system} diagnoser...`} />
            <DsComboboxPopover state={combobox}>
                {suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (
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
    );
}

function useDiagnoseSuggestions(system: DiagnoseSystem, searchTerm: string): DiagnoseSuggestion[] {
    const [suggestions, setSuggestions] = useState<DiagnoseSuggestion[]>([]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            let isCurrentSearch = true;
            fetchDiagnoseSuggestions(system, searchTerm).then((result) => {
                if (isCurrentSearch) setSuggestions(result.suggestions);
            });

            return () => {
                isCurrentSearch = false;
            };
        }
    }, [searchTerm, system]);

    return suggestions;
}

const cache: Record<string, DiagnoseSearchResult> = {};
async function fetchDiagnoseSuggestions(system: DiagnoseSystem, value: string): Promise<DiagnoseSearchResult> {
    if (cache[`${system}-${value}`]) {
        return cache[value];
    }

    const result = await fetch(api(`/api/diagnose/${system.toLowerCase()}?value=${value}`)).then((res) => res.json());
    cache[value] = result;
    return result;
}

export default DiagnoseCombobox;
