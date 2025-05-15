import { ReactElement } from 'react'
import cn from 'clsx'
import { BodyShort, Heading } from '@navikt/ds-react'
import { FileXMarkIcon } from '@navikt/aksel-icons'

function DocumentsViewerNoDocuments({ className, text }: { className?: string; text: string }): ReactElement {
    return (
        <div className={cn('flex flex-col h-full', className)}>
            <Heading
                id="pdf-viewer-section-heading"
                level="2"
                size="xsmall"
                className="flex h-10 items-center bg-bg-subtle pl-4"
            >
                Dokumenter som er mottatt
            </Heading>
            <div className="flex grow flex-col items-center justify-center p-4 text-gray-300">
                <FileXMarkIcon className="h-64 w-64" aria-hidden />
                <BodyShort>{text}</BodyShort>
            </div>
        </div>
    )
}

export default DocumentsViewerNoDocuments
