import React from 'react'
import { Alert, Heading } from '@navikt/ds-react'

import PageWrapper from '../components/PageWrapper/PageWrapper'

function InternalServerError(): JSX.Element {
    return (
        <PageWrapper title="Noe gikk galt">
            <Heading size="large" spacing>
                Noe gikk galt
            </Heading>
            <Alert variant="error">Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.</Alert>
        </PageWrapper>
    )
}

export default InternalServerError
