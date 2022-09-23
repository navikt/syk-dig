import '@reach/combobox/styles.css';

import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import { BodyShort, Label } from '@navikt/ds-react';
import cn from 'clsx';
import { logger } from '@navikt/next-logger';

import type { DiagnoseSearchResult, DiagnoseSuggestion } from '../../../../pages/api/diagnose/[system].api';
import { DiagnoseSystem } from '../../../Sykmelding/DiagnoseFormSection';

import styles from './DiagnoseTypeahead.module.css';

interface Props {
    id?: string;
    system: DiagnoseSystem;
    onSelect: (value: DiagnoseSuggestion) => void;
}

function DiagnoseTypeahead({ id, system, onSelect }: Props): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const suggestions = useDiagnoseSuggestions(system, searchTerm);
    const handleSearchTermChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className={cn('navds-form-field navds-form-field--medium')}>
            <Label>Diagnosekode</Label>
            <Combobox
                className={cn('navds-select__container')}
                openOnFocus
                onSelect={(item) => {
                    const diagnose = suggestions.find((it) => it.code === item);
                    if (!diagnose) {
                        logger.warn(
                            `Diagnose was not found in suggestions in diagnose typeahead. Diagnose: ${diagnose}, suggestions: ${suggestions.map(
                                (it) => it.code,
                            )}`,
                        );
                        return;
                    }

                    onSelect(diagnose);
                }}
            >
                <ComboboxInput
                    id={id}
                    className={cn(
                        'navds-search__input navds-search__input--secondary navds-text-field__input navds-body-short navds-body-medium',
                    )}
                    onChange={handleSearchTermChange}
                    placeholder={`Søk i ${system} diagnoser...`}
                />
                {suggestions && (
                    <ComboboxPopover className={styles.suggestionPopover}>
                        {suggestions.length > 0 ? (
                            <ComboboxList>
                                {suggestions.map((suggestion) => {
                                    return (
                                        <ComboboxOption
                                            className={cn(styles.suggestion, 'navds-body-short')}
                                            key={suggestion.code}
                                            value={suggestion.code}
                                        />
                                    );
                                })}
                            </ComboboxList>
                        ) : searchTerm.trim() === '' ? (
                            <BodyShort className={cn(styles.suggestionNoResult)}>Søk i {system} diagnoser</BodyShort>
                        ) : (
                            <BodyShort
                                className={cn(styles.suggestionNoResult)}
                            >{`Fant ingen diagnose med kode eller beskrivelse "${searchTerm}"`}</BodyShort>
                        )}
                    </ComboboxPopover>
                )}
            </Combobox>
        </div>
    );
}

function useDiagnoseSuggestions(system: DiagnoseSystem, searchTerm: string): DiagnoseSuggestion[] {
    const [suggestions, setSuggestions] = useState<DiagnoseSuggestion[]>([]);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            let isMounted = true;
            fetchDiagnoseSuggestions(system, searchTerm).then((result) => {
                if (isMounted) setSuggestions(result.suggestions);
            });

            return () => {
                isMounted = false;
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

    const result = await fetch(`/api/diagnose/${system.toLowerCase()}?value=${value}`).then((res) => res.json());
    cache[value] = result;
    return result;
}

export default DiagnoseTypeahead;
