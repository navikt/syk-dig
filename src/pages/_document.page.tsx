import 'next-logger'

import { Html, Head, Main, NextScript } from 'next/document'

function Document(): JSX.Element {
    return (
        <Html>
            <Head>
                <link
                    rel="preload"
                    href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
