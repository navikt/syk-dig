import { ReactElement } from 'react'
import { useController } from 'react-hook-form'

import { SykmeldingFormValues } from '../../Sykmelding/SykmeldingForm'
import FieldError from '../FieldError/FieldError'

import CountryCombobox from './CountryCombobox/CountryCombobox'
import styles from './CountryPicker.module.css'

interface Props {
    name: 'land'
}

function CountryPicker({ name }: Props): ReactElement {
    const { field, fieldState } = useController<SykmeldingFormValues, 'land'>({
        name,
        rules: { required: 'Du må velge et land.' },
    })

    return (
        <div className={styles.countryPicker}>
            <CountryCombobox
                id="land"
                initialValue={field.value}
                onSelect={field.onChange}
                onChange={() => {
                    if (field.value) {
                        field.onChange(null)
                    }
                }}
            />
            <FieldError error={fieldState.error} />
        </div>
    )
}
export default CountryPicker
