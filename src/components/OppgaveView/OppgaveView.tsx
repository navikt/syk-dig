import React, { PropsWithChildren, useCallback, useState } from 'react'
import { Button, Tabs, Tooltip } from '@navikt/ds-react'
import { FileContent, Findout, List, Task, File } from '@navikt/ds-icons'
import cn from 'clsx'

import Pdf from '../Pdf/Pdf'
import PageTitle from '../PageTitle/PageTitle'

import styles from './OppgaveView.module.css'

interface Props {
    oppgaveId: string
}

function OppgaveView({ oppgaveId, children }: PropsWithChildren<Props>): JSX.Element {
    const [tabState, setTabState] = useState('skjema')
    const [showTabs, setShowTabs] = useState(false)
    const toggleTabs = useCallback(() => setShowTabs((b) => !b), [])

    return (
        <div>
            {showTabs && <OppgaveViewTabs value={tabState} onTabChange={setTabState} />}
            <div className={styles.contentWrapper}>
                <section
                    aria-labelledby="oppgave-header"
                    className={cn(styles.scrollArea, {
                        [styles.activeTab]: showTabs && tabState === 'skjema',
                        [styles.inactiveTab]: showTabs && tabState === 'pdf',
                    })}
                >
                    <OppgaveViewPageTitle showTabs={showTabs} toggleTabs={toggleTabs} />
                    <div className={styles.content}>{children} </div>
                </section>
                <Pdf
                    className={cn(styles.pdf, {
                        [styles.activeTab]: showTabs && tabState === 'pdf',
                        [styles.inactiveTab]: showTabs && tabState === 'skjema',
                    })}
                    href={`/api/pdf?oppgaveId=${oppgaveId}`}
                />
            </div>
        </div>
    )
}

interface OppgaveViewTabsProps {
    value: string
    onTabChange: (value: string) => void
}

function OppgaveViewTabs({ value, onTabChange }: OppgaveViewTabsProps): JSX.Element {
    return (
        <Tabs value={value} onChange={onTabChange}>
            <Tabs.List>
                <Tabs.Tab value="skjema" label="Skjema" icon={<Task aria-hidden />} />
                <Tabs.Tab value="pdf" label="Dokument" icon={<FileContent aria-hidden />} />
            </Tabs.List>
        </Tabs>
    )
}

interface OppgaveViewPageTitleProps {
    showTabs: boolean
    toggleTabs: () => void
}

function OppgaveViewPageTitle({ showTabs, toggleTabs }: OppgaveViewPageTitleProps): JSX.Element {
    return (
        <PageTitle
            titleId="oppgave-header"
            title="Utenlandsk sykmelding"
            ingress="Vennligst skriv inn opplysningene fra sykmeldingen under"
            titleActions={
                !showTabs ? (
                    <Tooltip content="Vis PDF i egen fane">
                        <Button
                            size="small"
                            variant="tertiary"
                            icon={<Findout aria-label="Vis PDF i egen fane" />}
                            onClick={toggleTabs}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip content="Vis PDF ved siden av skjema">
                        <Button
                            size="small"
                            variant="tertiary"
                            aria-label="Vis PDF ved siden av skjema"
                            icon={
                                <>
                                    <List aria-hidden />
                                    <File aria-hidden />
                                </>
                            }
                            onClick={toggleTabs}
                        />
                    </Tooltip>
                )
            }
        />
    )
}

export default OppgaveView
