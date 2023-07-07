import { ReactElement } from 'react'
import { ConfirmationPanel, ConfirmationPanelProps } from '@navikt/ds-react'

function SimpleConfirmationPanel(props: Omit<ConfirmationPanelProps, 'className' | 'size'>): ReactElement {
    return (
        <ConfirmationPanel
            {...props}
            size="small"
            className="[&>div]:border-none [&>div]:!bg-transparent [&>div]:pl-0"
        />
    )
}

export default SimpleConfirmationPanel
