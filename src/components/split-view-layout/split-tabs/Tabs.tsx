import { ReactElement } from 'react'
import { Tabs } from '@navikt/ds-react'
import { FilePdfIcon, TasklistStartIcon } from '@navikt/aksel-icons'

import { cn } from '../../../utils/tw-utils'

interface OppgaveViewTabsProps {
    open: boolean
    value: string
    onTabChange: (value: 'form' | 'pdf') => void
}

function SplitTabs({ open, value, onTabChange }: OppgaveViewTabsProps): ReactElement {
    return (
        <Tabs
            className={cn(
                'overflow-hidden transition-all duration-300',
                open ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0',
            )}
            aria-hidden={!open}
            value={value}
            onChange={(value) => {
                if (value !== 'form' && value !== 'pdf') {
                    throw new Error(`Invalid tab value: ${value}`)
                }

                onTabChange(value)
            }}
        >
            <Tabs.List>
                <Tabs.Tab value="form" label="Skjema" icon={<TasklistStartIcon aria-hidden />} />
                <Tabs.Tab value="pdf" label="Dokument" icon={<FilePdfIcon aria-hidden />} />
            </Tabs.List>
        </Tabs>
    )
}

export default SplitTabs
