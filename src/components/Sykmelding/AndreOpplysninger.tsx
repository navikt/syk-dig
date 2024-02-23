import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'
import { useFlag } from '../../toggles/context'

import { SykmeldingFormValues } from './SykmeldingForm'

type FolkeRegistertAdresseErBrakkeEllerTilsvarendeName = 'folkeRegistertAdresseErBrakkeEllerTilsvarende'

function AndreOpplysninger(): ReactElement {
    const flag = useFlag('SYK_DIG_ADRESSE_UTLAND')
    const { field } = useController<SykmeldingFormValues, FolkeRegistertAdresseErBrakkeEllerTilsvarendeName>({
        name: 'folkeRegistertAdresseErBrakkeEllerTilsvarende',
    })

    const { field: adresseUtlandField } = useController<SykmeldingFormValues, 'erAdresseUtland'>({
        name: 'erAdresseUtland',
    })
    return (
        <SykmeldingSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
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
        </SykmeldingSection>
    )
}

export default AndreOpplysninger
