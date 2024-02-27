import React, { ReactElement } from 'react'
import { Select, TextField } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { getSectionTitle, sections } from '../../sections'
import FormSection from '../../../form-layout/FormSection'
import { HarArbeidsgiverValues } from '../../schema/sykmelding/Arbeidsgiver'
import { NasjonalFormValues } from '../NasjonalSykmeldingFormTypes'
import { numberOnChange } from '../../../../utils/formUtils'

import styles from './ArbeidsgiverFormSection.module.css'

function ArbeidsgiverFormSection(): ReactElement {
    const harArbeidsgiver = useController<NasjonalFormValues, 'arbeidsgiver.harArbeidsgiver'>({
        name: 'arbeidsgiver.harArbeidsgiver',
        rules: { required: 'Arbeidssiduasjon må være definert' },
    })
    const arbeidsgiverNavn = useController<NasjonalFormValues, 'arbeidsgiver.arbeidsgiverNavn'>({
        name: 'arbeidsgiver.arbeidsgiverNavn',
    })
    const yrkesbetegnelse = useController<NasjonalFormValues, 'arbeidsgiver.yrkesbetegnelse'>({
        name: 'arbeidsgiver.yrkesbetegnelse',
    })
    const stillingsprosent = useController<NasjonalFormValues, 'arbeidsgiver.stillingsprosent'>({
        name: 'arbeidsgiver.stillingsprosent',
        rules: {
            min: { value: 0, message: 'Stillingsprosenten må være mellom 0 og 100' },
            max: { value: 100, message: 'Stillingsprosenten må være mellom 0 og 100' },
        },
    })

    return (
        <FormSection id="arbeidsgiver-seksjon" title={getSectionTitle(sections.ARBEIDSGIVER)}>
            <div className={styles.fieldWrapper}>
                <Select
                    className={styles.field}
                    label="2.1 Pasienten har"
                    {...harArbeidsgiver.field}
                    value={harArbeidsgiver.field.value ?? ''}
                    error={harArbeidsgiver.fieldState.error?.message}
                    id="arbeidsgiver.harArbeidsgiver"
                >
                    <option value="">Velg</option>
                    {Object.entries(HarArbeidsgiverValues).map(([key, value]) => {
                        return (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        )
                    })}
                </Select>
                <TextField
                    className={styles.field}
                    label="2.2 Arbeidsgiver for denne sykmeldingen"
                    {...arbeidsgiverNavn.field}
                    value={arbeidsgiverNavn.field.value ?? ''}
                    error={arbeidsgiverNavn.fieldState.error?.message}
                />
                <TextField
                    className={styles.field}
                    label="2.3 Yrke/stilling for dette arbeidsforholdet"
                    {...yrkesbetegnelse.field}
                    value={yrkesbetegnelse.field.value ?? ''}
                    error={yrkesbetegnelse.fieldState.error?.message}
                />
                <TextField
                    className={styles.field}
                    label="2.4 Stillingsprosent"
                    type="number"
                    {...stillingsprosent.field}
                    onChange={numberOnChange(stillingsprosent.field.onChange)}
                    value={stillingsprosent.field.value ?? ''}
                    error={stillingsprosent.fieldState.error?.message}
                />
            </div>
        </FormSection>
    )
}

export default ArbeidsgiverFormSection
