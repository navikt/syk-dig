import { BodyShort, Label } from '@navikt/ds-react';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cn from 'clsx';
import {
    Combobox,
    ComboboxDisclosure,
    ComboboxItem,
    ComboboxItemOptions,
    ComboboxOptions,
    ComboboxPopover,
    ComboboxPopoverOptions,
} from 'ariakit/combobox';
import { Expand } from '@navikt/ds-icons';

import styles from './Combobox.module.css';

interface Props {
    id?: string;
    label: string;
    disabled?: boolean;
}

export function ComboboxWrapper({ id, label, disabled, children }: PropsWithChildren<Props>): JSX.Element {
    return (
        <div className={cn('navds-form-field navds-form-field--medium', { 'navds-form-field--disabled': disabled })}>
            <Label id={id}>{label}</Label>
            {children}
        </div>
    );
}

export function DsCombobox({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement> & ComboboxOptions>): JSX.Element {
    return (
        <div className="navds-select__container">
            <Combobox
                className={cn(className, styles.combobox, 'navds-text-field__input navds-body-short navds-body-medium')}
                {...props}
            >
                {children}
            </Combobox>
            <ComboboxDisclosure className="navds-select__chevron" state={props.state} as={Expand} aria-hidden />
        </div>
    );
}

export function DsComboboxPopover({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLInputElement> & ComboboxPopoverOptions>): JSX.Element {
    return (
        <ComboboxPopover
            className={cn(className, styles.suggestionPopover)}
            {...props}
            wrapperProps={{ className: styles.suggestionPopoverWrapper }}
        >
            {children}
        </ComboboxPopover>
    );
}

export function DsComboboxItem({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & ComboboxItemOptions): JSX.Element {
    return (
        <ComboboxItem className={cn(className, 'navds-body-short', styles.suggestion)} {...props}>
            {children}
        </ComboboxItem>
    );
}

export function DsComboboxNoResult({ text }: { text: string }): JSX.Element {
    return <BodyShort className={cn(styles.suggestionNoResult)}>{text}</BodyShort>;
}
