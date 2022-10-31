import React, { useEffect, useRef } from 'react'
import PDFObject from 'pdfobject'

interface Props {
    href: string
    className?: string
}

function Pdf({ href, className }: Props): JSX.Element {
    const embed = useRef(null)

    useEffect(() => {
        PDFObject.embed(href, embed.current)
    }, [href])

    return <div className={className} ref={embed} data-testid="pdf-embed"></div>
}

export default Pdf
