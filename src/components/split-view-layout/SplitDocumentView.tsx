import React, { PropsWithChildren, ReactElement, ReactNode, useCallback, useState } from 'react'
import cn from 'clsx'
import { Button, Tooltip } from '@navikt/ds-react'
import { ExpandIcon, SidebarLeftIcon, XMarkIcon } from '@navikt/aksel-icons'

import { bundledEnv } from '../../utils/env'
import analytics from '../../utils/analytics'

import SplitTabs from './split-tabs/Tabs'
import PageTitle from './page-title/PageTitle'
import styles from './SplitDocumentView.module.css'

type Props = {
    title: string
    ingress?: string
    documentView: ReactNode
    closeReturnsTo: 'modia' | 'gosys'
}

function SplitDocumentView({
    title,
    ingress,
    children,
    documentView,
    closeReturnsTo,
}: PropsWithChildren<Props>): ReactElement {
    const [tabState, setTabState] = useState<'form' | 'pdf'>('form')
    const [showTabs, setShowTabs] = useState(false)
    const toggleTabs = useCallback(() => setShowTabs((b) => !b), [])

    const documentsSectionClassNames = cn(styles.pdf, {
        [styles.activeTab]: showTabs && tabState === 'pdf',
        [styles.inactiveTab]: showTabs && tabState === 'form',
    })

    return (
        <>
            {showTabs && (
                <SplitTabs
                    value={tabState}
                    onTabChange={(value) => {
                        analytics.splitViewTabToggled(value)
                        setTabState(value)
                    }}
                />
            )}
            <div className={styles.contentWrapper}>
                <section
                    aria-labelledby="oppgave-header"
                    className={cn(styles.scrollArea, {
                        [styles.activeTab]: showTabs && tabState === 'form',
                        [styles.inactiveTab]: showTabs && tabState === 'pdf',
                    })}
                >
                    <SplitDocumentViewTitle
                        title={title}
                        ingress={ingress}
                        showTabs={showTabs}
                        toggleTabs={() => {
                            analytics.splitViewToggled(showTabs)
                            toggleTabs()
                        }}
                        closeReturnsTo={closeReturnsTo}
                    />
                    <div className={styles.content}>{children} </div>
                </section>
                <div className={documentsSectionClassNames}>{documentView}</div>
            </div>
        </>
    )
}

type SplitDocumentViewTitleProps = {
    title: string
    ingress?: string
    showTabs: boolean
    toggleTabs: () => void
    closeReturnsTo: 'modia' | 'gosys'
}

function SplitDocumentViewTitle({
    title,
    ingress,
    showTabs,
    toggleTabs,
    closeReturnsTo,
}: SplitDocumentViewTitleProps): ReactElement {
    return (
        <PageTitle
            titleId="oppgave-header"
            title={title}
            ingress={ingress}
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
                    <Tooltip content={`Lukk oppgaven og gå tilbake til ${closeReturnsTo} uten å lagre`}>
                        <Button
                            size="small"
                            variant="tertiary"
                            as="a"
                            href={
                                closeReturnsTo === 'gosys'
                                    ? bundledEnv.NEXT_PUBLIC_GOSYS_URL
                                    : bundledEnv.NEXT_PUBLIC_MODIA_URL
                            }
                            icon={
                                <XMarkIcon title={`Lukk oppgaven og gå tilbake til ${closeReturnsTo} uten å lagre`} />
                            }
                        />
                    </Tooltip>
                </>
            }
        />
    )
}

export default SplitDocumentView
