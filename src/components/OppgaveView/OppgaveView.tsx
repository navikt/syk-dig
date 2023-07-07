import { PropsWithChildren, ReactElement, useCallback, useState } from 'react'
import { Button, Tabs, Tooltip } from '@navikt/ds-react'
import { ExpandIcon, SidebarLeftIcon, XMarkIcon, TasklistStartIcon, FilePdfIcon } from '@navikt/aksel-icons'
import cn from 'clsx'

import PageTitle from '../PageTitle/PageTitle'
import { browserEnv } from '../../utils/env'
import { DigitaliseringOppgaveResultFragment } from '../../graphql/queries/graphql.generated'

import DocumentsViewer from './DocumentsViewer'
import styles from './OppgaveView.module.css'
import { DocumentsViewerNoDocuments, DocumentsViewerSkeleton } from './DocumentViewerStates'

interface Props {
    oppgave: DigitaliseringOppgaveResultFragment | undefined | null
    isError: boolean
    loading: boolean
}

function OppgaveView({ oppgave, loading, isError, children }: PropsWithChildren<Props>): ReactElement {
    const isStatus = oppgave?.__typename === 'DigitaliseringsoppgaveStatus'
    const [tabState, setTabState] = useState<'form' | 'pdf'>('form')
    const [showTabs, setShowTabs] = useState(false)
    const toggleTabs = useCallback(() => setShowTabs((b) => !b), [])

    const documentsSectionClassNames = cn(styles.pdf, {
        [styles.activeTab]: showTabs && tabState === 'pdf',
        [styles.inactiveTab]: showTabs && tabState === 'form',
    })

    return (
        <>
            {showTabs && <OppgaveViewTabs value={tabState} onTabChange={setTabState} />}
            <div className={styles.contentWrapper}>
                <section
                    aria-labelledby="oppgave-header"
                    className={cn(styles.scrollArea, {
                        [styles.activeTab]: showTabs && tabState === 'form',
                        [styles.inactiveTab]: showTabs && tabState === 'pdf',
                    })}
                >
                    <OppgaveViewPageTitle showTabs={showTabs} toggleTabs={toggleTabs} />
                    <div className={styles.content}>{children} </div>
                </section>
                {loading && <DocumentsViewerSkeleton className={documentsSectionClassNames} />}
                {!loading && isStatus && (
                    <DocumentsViewerNoDocuments className={documentsSectionClassNames} text="Oppgaven er ikke åpen" />
                )}
                {isError && (
                    <DocumentsViewerNoDocuments
                        className={documentsSectionClassNames}
                        text="Oppgaven ble ikke lastet"
                    />
                )}
                {oppgave != null && oppgave?.__typename === 'Digitaliseringsoppgave' && (
                    <DocumentsViewer className={documentsSectionClassNames} oppgave={oppgave} />
                )}
            </div>
        </>
    )
}

interface OppgaveViewTabsProps {
    value: string
    onTabChange: (value: 'form' | 'pdf') => void
}

function OppgaveViewTabs({ value, onTabChange }: OppgaveViewTabsProps): ReactElement {
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

interface OppgaveViewPageTitleProps {
    showTabs: boolean
    toggleTabs: () => void
}

function OppgaveViewPageTitle({ showTabs, toggleTabs }: OppgaveViewPageTitleProps): ReactElement {
    return (
        <PageTitle
            titleId="oppgave-header"
            title="Utenlandsk sykmelding"
            ingress="Vennligst skriv inn opplysningene fra sykmeldingen under"
            titleActions={
                <>
                    {!showTabs ? (
                        <Tooltip content="Vis PDF i egen fane">
                            <Button
                                size="small"
                                variant="tertiary"
                                icon={<ExpandIcon aria-label="Vis PDF i egen fane" />}
                                onClick={toggleTabs}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip content="Vis PDF ved siden av skjema">
                            <Button
                                size="small"
                                variant="tertiary"
                                aria-label="Vis PDF ved siden av skjema"
                                icon={<SidebarLeftIcon aria-hidden />}
                                onClick={toggleTabs}
                            />
                        </Tooltip>
                    )}
                    <Tooltip content="Lukk oppgaven og gå tilbake til gosys uten å lagre">
                        <Button
                            size="small"
                            variant="tertiary"
                            as="a"
                            href={browserEnv.NEXT_PUBLIC_GOSYS_URL}
                            icon={<XMarkIcon title="Lukk oppgaven og gå tilbake til gosys uten å lagre" />}
                        />
                    </Tooltip>
                </>
            }
        />
    )
}

export default OppgaveView
