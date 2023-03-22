import { Alert } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'

import { SykmeldingFormValues } from './SykmeldingForm'

type AndreOpplysningerName = 'mangelfullSykmelding'

function MangelfullSykmelding(): JSX.Element {
    const { field } = useController<SykmeldingFormValues, AndreOpplysningerName>({
        name: 'mangelfullSykmelding',
    })

    return (
        <SykmeldingSection id="mangelfull-sykmelding-seksjon" title="Mangelfull sykmelding">
            <SimpleConfirmationPanel
                id={field.name}
                label="Sykmeldingen mangler viktige opplysninger som må innhentes før den kan registreres"
                checked={field.value ?? false}
                onChange={field.onChange}
                onBlur={field.onBlur}
            />
            {field.value === true && (
                <Alert variant="info" className="mt-4">
                    Når du avviser registreringen vil oppgaven sendes med merknad til benken som skal innhente
                    opplysningene som mangler.
                </Alert>
            )}
        </SykmeldingSection>
    )
}

export default MangelfullSykmelding
