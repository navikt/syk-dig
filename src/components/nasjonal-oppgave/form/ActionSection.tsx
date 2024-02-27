import React, { ReactElement, useState } from 'react'
import { Button, ConfirmationPanel } from '@navikt/ds-react'
import { MutationResult } from '@apollo/client'

type Props = {
    submitResult: MutationResult<unknown>
}

function ActionSection({ submitResult }: Props): ReactElement {
    const [everythingGood, setEverythingGood] = useState(false)

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex flex-col gap-4">
                <ConfirmationPanel
                    checked={everythingGood}
                    disabled={submitResult.loading}
                    label="Feltene stemmer overens med opplysningene i papirsykmeldingen"
                    onChange={() => setEverythingGood((x) => !x)}
                />
                <div>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!everythingGood || submitResult.loading}
                        loading={submitResult.loading}
                    >
                        Registrer sykmeldingen
                    </Button>
                </div>
            </div>
            <div>TODO: Andre handlinger</div>
        </div>
    )
}

export default ActionSection
