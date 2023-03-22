import { useController } from 'react-hook-form'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'

import { SykmeldingFormValues } from './SykmeldingForm'

type AndreOpplysningerName = 'harAndreRelevanteOpplysninger'

function AndreOpplysninger(): JSX.Element {
    const { field } = useController<SykmeldingFormValues, AndreOpplysningerName>({
        name: 'harAndreRelevanteOpplysninger',
    })

    return (
        <SykmeldingSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
            <DatoSykmeldingenBleSkrevet />
            <SimpleConfirmationPanel
                id={field.name}
                label="Sykmeldingen inneholder andre relevante opplysninger"
                checked={field.value ?? false}
                onChange={field.onChange}
                onBlur={field.onBlur}
            />
        </SykmeldingSection>
    )
}

export default AndreOpplysninger
