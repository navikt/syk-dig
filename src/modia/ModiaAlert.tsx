import React, { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import { ModiaDataError } from './ModiaService'

type Props = {
    error: ModiaDataError
}

function ModiaAlert({ error }: Props): ReactElement {
    return (
        <Alert variant="error" className="m-4 mt-0">
            <Heading level="2" size="medium" spacing>
                Vi klarte ikke å hente dine enheter fra <span className="font-bold">Modia</span>
            </Heading>
            <BodyShort spacing>Du kan se på oppgaven, men du vil ikke kunne sende den inn. fungere.</BodyShort>
            <BodyShort spacing>
                Vi anbefaler at du prøver å laste siden på nytt. Hvis problemet vedvarer, ta kontakt med brukerstøtte.
            </BodyShort>
            <BodyShort>
                Teknisk begrunnelse: <code className="text-sm">{error.errorType ?? 'UNKNOWN_ERROR'}</code>
            </BodyShort>
        </Alert>
    )
}

export default ModiaAlert
