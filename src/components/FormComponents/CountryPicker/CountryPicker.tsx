import { ReactElement } from 'react'
import { useController } from 'react-hook-form'

import { UtenlanskFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'

import { CountryCombobox } from './country-combobox/CountryCombobox'
import styles from './CountryPicker.module.css'

interface Props {
    name: 'land'
}

export function CountryPicker({ name }: Props): ReactElement {
    const { field, fieldState } = useController<UtenlanskFormValues, 'land'>({
        name,
        rules: { required: 'Du må velge et land' },
    })

    return (
        <div className={styles.countryPicker}>
            <CountryCombobox id="land" value={field.value} onSelect={field.onChange} onBlur={field.onBlur} />
            <FieldError error={fieldState.error} />
        </div>
    )
}
