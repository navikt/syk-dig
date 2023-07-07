import { ReactElement } from 'react'
import { Alert, Heading } from '@navikt/ds-react'

import PageWrapper from '../components/PageWrapper/PageWrapper'

function InternalServerError(): ReactElement {
    return (
        <PageWrapper title="Noe gikk galt">
            <Heading size="large" spacing>
                Vi fant ikke denne siden
            </Heading>
            <Alert variant="warning">
                Dersom du har fulgt en lenke hit, må du gjerne rapportere til oss hvor du fant den lenken så vi kan få
                fikset problemet.
            </Alert>
        </PageWrapper>
    )
}

export default InternalServerError
