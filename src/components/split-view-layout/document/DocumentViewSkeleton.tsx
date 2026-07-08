import { Heading } from '@navikt/ds-react'
import cn from 'clsx'
import { ReactElement } from 'react'

import { PdfSkeleton, TabsSkeleton } from '../../skeleton/Skeletons'

function DocumentsViewerSkeleton({ className }: { className?: string }): ReactElement {
    return (
        <div className={cn('flex flex-col h-full', className)}>
            <Heading level="2" size="xsmall" className="flex h-10 items-center bg-bg-subtle pl-4">
                Dokumenter som er mottatt
            </Heading>
            <TabsSkeleton />
            <PdfSkeleton />
        </div>
    )
}

export default DocumentsViewerSkeleton
