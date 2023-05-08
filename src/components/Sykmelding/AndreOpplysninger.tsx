import { useController } from 'react-hook-form'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'

import { SykmeldingFormValues } from './SykmeldingForm'

type AndreOpplysningerName = 'harAndreRelevanteOpplysninger'

function AndreOpplysninger(): JSX.Element {
    const { field } = useController<SykmeldingFormValues, AndreOpplysningerName>({
        name: 'harAndreRelevanteOpplysninger',
    })

    return (
        <SykmeldingSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
            <DatoSykmeldingenBleSkrevet />
        </SykmeldingSection>
    )
}

export default AndreOpplysninger
