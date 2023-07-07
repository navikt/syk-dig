import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'
import SimpleConfirmationPanel from '../FormComponents/SimpleConfirmationPanel'

import { SykmeldingFormValues } from './SykmeldingForm'

type FolkeRegistertAdresseErBrakkeEllerTilsvarendeName = 'folkeRegistertAdresseErBrakkeEllerTilsvarende'

function AndreOpplysninger(): ReactElement {
    const { field } = useController<SykmeldingFormValues, FolkeRegistertAdresseErBrakkeEllerTilsvarendeName>({
        name: 'folkeRegistertAdresseErBrakkeEllerTilsvarende',
    })
    return (
        <SykmeldingSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
            <DatoSykmeldingenBleSkrevet />
            <SimpleConfirmationPanel
                id={field.name}
                label="Folkeregistert adresse er brakke eller tilsvarende"
                checked={field.value ?? false}
                onChange={field.onChange}
                onBlur={field.onBlur}
            />
        </SykmeldingSection>
    )
}

export default AndreOpplysninger
