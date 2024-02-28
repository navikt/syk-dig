import { ReactElement } from 'react'
import { Tabs } from '@navikt/ds-react'

import DocumentTab from './DocumentTab'
import styles from './DocumentTabs.module.css'

type Props = {
    value: string
    onTabChange: (value: string) => void
    documents: { tittel: string; dokumentInfoId: string }[]
    oppgaveId: string | null
}

function DocumentTabs({ value, documents, onTabChange, oppgaveId }: Props): ReactElement {
    return (
        <Tabs className={styles.tabsRoot} value={value} onChange={onTabChange}>
            <Tabs.List className="w-full">
                {documents.map((document) => (
                    <DocumentTab key={document.dokumentInfoId} document={document} oppdaveId={oppgaveId} />
                ))}
            </Tabs.List>
        </Tabs>
    )
}

export default DocumentTabs
