import { RefObject, useRef, useState } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'

import { PersistentPaneLayout } from './persistent-layout'

export const basisLayout: NonNullable<PersistentPaneLayout> = [45, 55]

type ViewState = 'pdf' | 'form' | 'both'

type UseSplitDocumentState = {
    onLayout: (sizes: number[]) => void
    setView: (state: ViewState) => void
    viewState: ViewState
    refs: {
        formPane: RefObject<ImperativePanelHandle | null>
        pdfPane: RefObject<ImperativePanelHandle | null>
    }
}

export function useSplitDocumentState(defaultLayout: PersistentPaneLayout): UseSplitDocumentState {
    const [panelSizes, setPanelSizes] = useState<number[]>(defaultLayout ?? basisLayout)

    const formPane = useRef<ImperativePanelHandle>(null)
    const pdfPane = useRef<ImperativePanelHandle>(null)

    const anyCollapsed = panelSizes.includes(0)
    const viewState: ViewState = !anyCollapsed ? 'both' : panelSizes[0] === 0 ? 'pdf' : 'form'

    const onLayout = (sizes: number[]): void => {
        setPanelSizes(sizes)
        document.cookie = `syk-dig-split-view:layout=${JSON.stringify(sizes)};path=/;SameSite=Strict`
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
