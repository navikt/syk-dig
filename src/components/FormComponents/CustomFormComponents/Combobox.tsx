import { BodyShort, Label } from '@navikt/ds-react'
import { HTMLAttributes, InputHTMLAttributes, PropsWithChildren, ReactElement } from 'react'
import cn from 'clsx'
import {
    Combobox,
    ComboboxDisclosure,
    ComboboxItem,
    ComboboxItemOptions,
    ComboboxOptions,
    ComboboxPopover,
    ComboboxPopoverOptions,
} from 'ariakit/combobox'
import { ChevronDownIcon } from '@navikt/aksel-icons'

import styles from './Combobox.module.css'

interface Props {
    className?: string
    labelId?: string
    label: string
    disabled?: boolean
}

export function ComboboxWrapper({
    className,
    labelId,
    label,
    disabled,
    children,
}: PropsWithChildren<Props>): ReactElement {
    return (
        <div
            className={cn('navds-form-field navds-form-field--medium', className, {
                'navds-form-field--disabled': disabled,
            })}
        >
            <Label id={labelId}>{label}</Label>
            {children}
        </div>
    )
}

export function DsCombobox({
    children,
    className,
    'aria-labelledby': ariaLabelledby,
    ...props
}: PropsWithChildren<InputHTMLAttributes<HTMLInputElement> & ComboboxOptions>): ReactElement {
    return (
        <div className="navds-select__container">
            <Combobox
                aria-labelledby={ariaLabelledby}
                className={cn(className, styles.combobox, 'navds-text-field__input navds-body-short navds-body-medium')}
                {...props}
            >
                {children}
            </Combobox>
            <ComboboxDisclosure
                className="navds-select__chevron"
                state={props.state}
                as={ChevronDownIcon}
                aria-hidden
            />
        </div>
    )
}

export function DsComboboxPopover({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLInputElement> & ComboboxPopoverOptions>): ReactElement {
    return (
        <ComboboxPopover
            className={cn(className, styles.suggestionPopover)}
            {...props}
            wrapperProps={{ className: styles.suggestionPopoverWrapper }}
        >
            {children}
        </ComboboxPopover>
    )
}

export function DsComboboxItem({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & ComboboxItemOptions): ReactElement {
    return (
        <ComboboxItem className={cn(className, 'navds-body-short', styles.suggestion)} {...props}>
            {children}
        </ComboboxItem>
    )
}

export function DsComboboxNoResult({ text }: { text: string }): ReactElement {
    return <BodyShort className={cn(styles.suggestionNoResult)}>{text}</BodyShort>
}
