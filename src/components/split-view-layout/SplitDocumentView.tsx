import React, { PropsWithChildren, ReactElement, ReactNode, useEffect, useRef } from 'react'
import { Button, Tooltip } from '@navikt/ds-react'
import { ExpandIcon, SidebarLeftIcon, XMarkIcon } from '@navikt/aksel-icons'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { bundledEnv } from '../../utils/env'
import analytics from '../../utils/analytics'
import { cn } from '../../utils/tw-utils'

import { basisLayout, useSplitDocumentState } from './useSplitDocumentState'
import { PersistentPaneLayout } from './persistent-layout'
import SplitTabs from './split-tabs/Tabs'
import PageTitle from './page-title/PageTitle'
import styles from './SplitDocumentView.module.css'

type Props = {
    title: string
    ingress?: string
    documentView: ReactNode
    closeReturnsTo: 'modia' | 'gosys'
    defaultLayout: PersistentPaneLayout
}

function SplitDocumentView({
    title,
    ingress,
    children,
    documentView,
    closeReturnsTo,
    defaultLayout,
}: PropsWithChildren<Props>): ReactElement {
    const { setView, viewState, refs, onLayout } = useSplitDocumentState(defaultLayout)
    const initialMountComplete = useInitialMountComplete()

    return (
        <div
            className={cn(styles.root, {
                [styles.withBar]: viewState !== 'both',
            })}
        >
            <SplitTabs
                open={viewState !== 'both'}
                value={viewState}
                onTabChange={(value) => {
                    analytics.splitViewTabToggled(value)
                    setView(value)
                }}
            />
            <PanelGroup direction="horizontal" onLayout={onLayout}>
                <Panel
                    ref={refs.formPane}
                    defaultSize={defaultLayout?.[0] ?? basisLayout[0]}
                    minSize={30}
                    order={1}
                    collapsible
                    onExpand={() => {
                        if (initialMountComplete) analytics.splitViewToggled('pdf expand', true)
                    }}
                    onCollapse={() => {
                        if (initialMountComplete) analytics.splitViewToggled('pdf collapse', true)
                    }}
                >
                    <section aria-labelledby="oppgave-header" className={styles.section}>
                        <SplitDocumentViewTitle
                            title={title}
                            ingress={ingress}
                            showTabs={viewState !== 'both'}
                            toggleTabs={(enabled) => {
                                if (initialMountComplete) analytics.splitViewToggled(`toggled by button: ${enabled}`)

                                setView(enabled ? 'form' : 'both')
                            }}
                            closeReturnsTo={closeReturnsTo}
                        />
                        <div>{children}</div>
                    </section>
                </Panel>
                <PanelResizeHandle className="w-2 hover:bg-border-subtle-hover data-[resize-handle-state=drag]:bg-border-action" />
                <Panel
                    ref={refs.pdfPane}
                    order={2}
                    defaultSize={defaultLayout?.[1] ?? basisLayout[1]}
                    minSize={20}
                    collapsible
                    onExpand={() => {
                        if (initialMountComplete) analytics.splitViewToggled('pdf expand', true)
                    }}
                    onCollapse={() => {
                        if (initialMountComplete) analytics.splitViewToggled('pdf collapse', true)
                    }}
                >
                    <div className={styles.pdf}>{documentView}</div>
                </Panel>
            </PanelGroup>
        </div>
    )
}

type SplitDocumentViewTitleProps = {
    title: string
    ingress?: string
    showTabs: boolean
    toggleTabs: (enabled: boolean) => void
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
                                onClick={() => toggleTabs(true)}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip content="Vis PDF ved siden av skjema">
                            <Button
                                size="small"
                                variant="tertiary"
                                aria-label="Vis PDF ved siden av skjema"
                                icon={<SidebarLeftIcon aria-hidden />}
                                onClick={() => toggleTabs(false)}
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

function useInitialMountComplete(): boolean {
    const initialMount = useRef(false)
    useEffect(() => {
        if (!initialMount.current) {
            initialMount.current = true
            return
        }
    }, [])
    return initialMount.current
}

export default SplitDocumentView
