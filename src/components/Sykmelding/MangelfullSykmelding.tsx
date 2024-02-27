import { Alert } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import FormSection from '../form-layout/FormSection'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'

import { UtenlanskFormValues } from './SykmeldingForm'

type AndreOpplysningerName = 'mangelfullSykmelding'

function MangelfullSykmelding(): ReactElement {
    const { field } = useController<UtenlanskFormValues, AndreOpplysningerName>({
        name: 'mangelfullSykmelding',
    })

    return (
        <FormSection id="mangelfull-sykmelding-seksjon" title="Mangelfull sykmelding">
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
        </FormSection>
    )
}

export default MangelfullSykmelding
