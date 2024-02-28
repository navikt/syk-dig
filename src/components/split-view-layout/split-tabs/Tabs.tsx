import { ReactElement } from 'react'
import { Tabs } from '@navikt/ds-react'
import { FilePdfIcon, TasklistStartIcon } from '@navikt/aksel-icons'

interface OppgaveViewTabsProps {
    value: string
    onTabChange: (value: 'form' | 'pdf') => void
}

function SplitTabs({ value, onTabChange }: OppgaveViewTabsProps): ReactElement {
    return (
        <Tabs
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
