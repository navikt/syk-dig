import React, { ReactElement, forwardRef, ForwardedRef } from 'react'
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '@navikt/ds-react'

type Props = Omit<CheckboxGroupProps, 'onChange' | 'value'> & {
    value: boolean
    onChange: (value: boolean) => void
}

function SoloCheckbox({ children, ...props }: Props, ref: ForwardedRef<HTMLFieldSetElement>): ReactElement {
    return (
        <CheckboxGroup
            {...props}
            ref={ref}
            onChange={(value) => props.onChange(value.length > 0)}
            value={props.value ? ['checked'] : []}
        >
            <Checkbox value="checked">{children}</Checkbox>
        </CheckboxGroup>
    )
}

export default forwardRef(SoloCheckbox)
