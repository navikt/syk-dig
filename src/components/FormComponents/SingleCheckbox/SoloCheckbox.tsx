import React, { ReactElement, Ref } from 'react'
import { Checkbox, CheckboxGroup, CheckboxGroupProps } from '@navikt/ds-react'

type Props = Omit<CheckboxGroupProps, 'onChange' | 'value'> & {
    ref: Ref<HTMLFieldSetElement>
    value: boolean
    onChange: (value: boolean) => void
}

function SoloCheckbox({ ref, children, ...props }: Props): ReactElement {
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

export default SoloCheckbox
