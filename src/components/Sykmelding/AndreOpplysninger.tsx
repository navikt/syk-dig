import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import FormSection from '../form-layout/FormSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'

import { UtenlanskFormValues } from './SykmeldingForm'

function AndreOpplysninger(): ReactElement {
    const { field: adresseUtlandField } = useController<UtenlanskFormValues, 'erAdresseUtland'>({
        name: 'erAdresseUtland',
    })

    return (
        <FormSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
            <DatoSykmeldingenBleSkrevet />
            <SimpleConfirmationPanel
                id={adresseUtlandField.name}
                label="Adressen er oppholds-, post- eller kontaktadresse i utlandet"
                checked={adresseUtlandField.value ?? false}
                onChange={adresseUtlandField.onChange}
                onBlur={adresseUtlandField.onBlur}
            />
        </FormSection>
    )
}

export default AndreOpplysninger
