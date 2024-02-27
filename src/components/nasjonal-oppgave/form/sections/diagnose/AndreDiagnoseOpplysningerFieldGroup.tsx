import React, { ReactElement } from 'react'
import { useController } from 'react-hook-form'
import { Button, DatePicker, ErrorMessage, useDatepicker } from '@navikt/ds-react'
import { XMarkIcon } from '@navikt/aksel-icons'
import { formatISO } from 'date-fns'

import { SMREG_SHORTHAND_FORMAT } from '../../../smregDateUtils'
import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { SelectedDate } from '../../../../FormComponents/dates/SelectedDate'

function AndreDiagnoseOpplysningerFieldGroup(): ReactElement {
    const { field: svangerskapField } = useController<NasjonalFormValues, 'medisinskVurdering.svangerskap'>({
        name: 'medisinskVurdering.svangerskap',
    })
    const { field: yrkesskadeField } = useController<NasjonalFormValues, 'medisinskVurdering.yrkesskade'>({
        name: 'medisinskVurdering.yrkesskade',
    })
    const { field: skjermesField } = useController<NasjonalFormValues, 'skjermesForPasient'>({
        name: 'skjermesForPasient',
    })

    return (
        <div className="flex flex-col gap-8">
            <SoloCheckbox {...svangerskapField} legend="3.5">
                Sykdommen er svangerskapsrelatert
            </SoloCheckbox>

            <SoloCheckbox {...yrkesskadeField} legend="3.5">
                Sykmeldingen kan skyldes en yrkesskade / yrkessykdom
            </SoloCheckbox>

            {yrkesskadeField.value && <YrkesskadeDateField />}

            <SoloCheckbox {...skjermesField} legend="3.7">
                Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient- og
                brukerrettighetsloven §§ 3-2 og 5-1
            </SoloCheckbox>
        </div>
    )
}

function YrkesskadeDateField(): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, 'medisinskVurdering.yrkesskadeDato'>({
        name: 'medisinskVurdering.yrkesskadeDato',
        rules: {
            required: 'Yrkesskadedato må være definer når yrkesskade er krysset av',
        },
    })
    const { datepickerProps, inputProps, setSelected, selectedDay } = useDatepicker({
        defaultSelected: field.value ?? undefined,
        onDateChange: field.onChange,
        inputFormat: SMREG_SHORTHAND_FORMAT,
    })

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-end">
                <DatePicker {...datepickerProps}>
                    <DatePicker.Input
                        {...field}
                        value={field.value ? formatISO(field.value) : undefined}
                        {...inputProps}
                        label="3.6 Eventuell skadedato"
                        placeholder="DDMMÅÅ"
                        id="medisinskVurdering.yrkesskadeDato"
                    />
                </DatePicker>
                <div>
                    <Button
                        variant="tertiary"
                        icon={<XMarkIcon />}
                        iconPosition="left"
                        type="button"
                        onClick={() => {
                            setSelected(undefined)
                        }}
                    >
                        Fjern dato
                    </Button>
                </div>
            </div>
            <SelectedDate date={selectedDay} />
            {fieldState.error?.message && <ErrorMessage>{fieldState.error?.message}</ErrorMessage>}
        </div>
    )
}

export default AndreDiagnoseOpplysningerFieldGroup
