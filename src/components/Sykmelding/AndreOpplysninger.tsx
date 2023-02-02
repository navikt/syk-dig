import { ConfirmationPanel } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import SykmeldingSection from '../SykmeldingSection/SykmeldingSection'
import DatoSykmeldingenBleSkrevet from '../FormComponents/Pasientopplysninger/DatoSykmeldingenBleSkrevet'

import { SykmeldingFormValues } from './SykmeldingForm'
import styles from './AndreOpplysninger.module.css'

type AndreOpplysningerName = 'harAndreRelevanteOpplysninger'

function AndreOpplysninger(): JSX.Element {
    const { field } = useController<SykmeldingFormValues, AndreOpplysningerName>({
        name: 'harAndreRelevanteOpplysninger',
    })

    return (
        <SykmeldingSection id="andre-opplysninger-seksjon" title="Andre opplysninger">
            <DatoSykmeldingenBleSkrevet />
            <ConfirmationPanel
                id={field.name}
                className={styles.andreOpplysninger}
                label="Sykmeldingen inneholder andre relevante opplysninger"
                checked={field.value ?? false}
                onChange={field.onChange}
                onBlur={field.onBlur}
            />
        </SykmeldingSection>
    )
}

export default AndreOpplysninger
