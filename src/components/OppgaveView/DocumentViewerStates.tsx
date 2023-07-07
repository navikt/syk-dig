import cn from 'clsx'
import { BodyShort, Heading } from '@navikt/ds-react'
import { FileXMarkIcon } from '@navikt/aksel-icons'
import { ReactElement } from 'react'

import { PdfSkeleton, TabsSkeleton } from '../skeleton/Skeletons'

export function DocumentsViewerSkeleton({ className }: { className?: string }): ReactElement {
    return (
        <div className={cn(className)}>
            <Heading level="2" size="xsmall" className="flex h-10 items-center bg-bg-subtle pl-4">
                Dokumenter som er mottatt
            </Heading>
            <TabsSkeleton />
            <PdfSkeleton />
        </div>
    )
}

export function DocumentsViewerNoDocuments({ className, text }: { className?: string; text: string }): ReactElement {
    return (
        <div className={cn('flex flex-col', className)}>
            <Heading
                id="pdf-viewer-section-heading"
                level="2"
                size="xsmall"
                className="flex h-10 items-center bg-bg-subtle pl-4"
            >
                Dokumenter som er mottatt
            </Heading>
            <div className="flex grow flex-col items-center justify-center p-4 text-gray-300">
                <FileXMarkIcon className="h-64 w-64" />
                <BodyShort>{text}</BodyShort>
            </div>
        </div>
    )
}
