import { useState } from 'react'
import { Layout, usePanelRef } from 'react-resizable-panels'

import { PersistentPaneLayout } from './persistent-layout'

export const basisLayout = { 'left-form': 45, 'right-pdf': 55 } as const

type ViewState = 'pdf' | 'form' | 'both'

type UseSplitDocumentState = {
    onLayout: (layout: Layout) => void
    setView: (state: ViewState) => void
    viewState: ViewState
    refs: {
        formPane: ReturnType<typeof usePanelRef>
        pdfPane: ReturnType<typeof usePanelRef>
    }
}

export function useSplitDocumentState(defaultLayout: PersistentPaneLayout): UseSplitDocumentState {
    const [panelSizes, setPanelSizes] = useState<Layout>(defaultLayout ?? basisLayout)

    const formPane = usePanelRef()
    const pdfPane = usePanelRef()

    const anyCollapsed = panelSizes['left-form'] === 0 || panelSizes['right-pdf'] === 0
    const viewState: ViewState = !anyCollapsed ? 'both' : panelSizes[0] === 0 ? 'pdf' : 'form'

    const onLayout = (layout: Layout): void => {
        setPanelSizes(layout)
        document.cookie = `syk-dig-split-view:layout=${JSON.stringify(layout)};path=/;SameSite=Strict`
    }

    const setView = (state: ViewState): void => {
        switch (state) {
            case 'pdf':
                pdfPane.current?.expand()
                formPane.current?.collapse()
                break
            case 'form':
                pdfPane.current?.collapse()
                formPane.current?.expand()
                break
            case 'both':
                pdfPane.current?.expand()
                formPane.current?.expand()
                break
        }
    }

    return {
        onLayout,
        setView,
        viewState,
        refs: { formPane, pdfPane },
    }
}
