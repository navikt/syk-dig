import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import FormSection from '../form-layout/FormSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'
import { useFlag } from '../../toggles/context'

import { UtenlanskFormValues } from './SykmeldingForm'

type FolkeRegistertAdresseErBrakkeEllerTilsvarendeName = 'folkeRegistertAdresseErBrakkeEllerTilsvarende'

function AndreOpplysninger(): ReactElement {
    const flag = useFlag('SYK_DIG_ADRESSE_UTLAND')
    const { field } = useController<UtenlanskFormValues, FolkeRegistertAdresseErBrakkeEllerTilsvarendeName>({
        name: 'folkeRegistertAdresseErBrakkeEllerTilsvarende',
    })

    const { field: adresseUtlandField } = useController<UtenlanskFormValues, 'erAdresseUtland'>({
        name: 'erAdresseUtland',
    })
    return (
        <FormSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
            <DatoSykmeldingenBleSkrevet />
            {flag.enabled ? (
                // New Field
                <SimpleConfirmationPanel
                    id={adresseUtlandField.name}
                    label="Adressen er oppholds-, post- eller kontaktadresse i utlandet"
                    checked={adresseUtlandField.value ?? false}
                    onChange={adresseUtlandField.onChange}
                    onBlur={adresseUtlandField.onBlur}
                />
            ) : (
                // Old Field
                <SimpleConfirmationPanel
                    id={field.name}
                    label="Folkeregistert adresse er brakke eller tilsvarende"
                    checked={field.value ?? false}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        </FormSection>
    )
}

export default AndreOpplysninger
