import React, { ReactElement } from 'react'
import { Alert, Heading } from '@navikt/ds-react'

function NotFound(): ReactElement {
    return (
        <div className="container mx-auto p-8">
            <div className="p-8 max-w-prose">
                <Heading size="large" spacing>
                    Vi fant ikke denne siden
                </Heading>
                <Alert variant="warning">
                    Dersom du har fulgt en lenke hit, må du gjerne rapportere til oss hvor du fant den lenken så vi kan
                    få fikset problemet.
                </Alert>
            </div>
        </div>
    )
}

export default NotFound
