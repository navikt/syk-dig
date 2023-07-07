import { ReactElement, useEffect, useRef } from 'react'
import PDFObject from 'pdfobject'

interface Props {
    href: string
    className?: string
}

function Pdf({ href, className }: Props): ReactElement {
    const embed = useRef(null)

    useEffect(() => {
        PDFObject.embed(href, embed.current)
    }, [href])

    return <div className={className} ref={embed} data-testid="pdf-embed"></div>
}

export default Pdf
