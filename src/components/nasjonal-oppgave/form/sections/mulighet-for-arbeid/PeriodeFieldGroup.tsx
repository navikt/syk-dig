import React, { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Textarea, TextField } from '@navikt/ds-react'

import { NasjonalFormValues } from '../../NasjonalSykmeldingFormTypes'
import SoloCheckbox from '../../../../FormComponents/SingleCheckbox/SoloCheckbox'
import { numberOnChange } from '../../../../../utils/formUtils'

import FomTomPicker from './FomTomPicker'
import MedisinskArsakFieldGroup from './MedisinskArsakFieldGroup'
import ForholdArbeidsplassenFieldGroup from './ForholdArbeidsplassenFieldGroup'

type Props = {
    fieldIndex: number
}

function PeriodeFieldGroup({ fieldIndex }: Props): ReactElement {
    const { watch } = useFormContext<NasjonalFormValues>()
    const fieldArray = `mulighetForArbeid.${fieldIndex}` as const
    const type = watch(`${fieldArray}.type`)

    switch (type) {
        case 'avventende':
            return <AvventendeFieldGroup parent={fieldArray} />
        case 'gradert':
            return <GradertFieldGroup parent={fieldArray} />
        case 'aktivitetIkkeMulig':
            return <AktivitetIkkeMuligFieldGroup parent={fieldArray} />
        case 'behandlingsdager':
            return <BehandlingsdagerFieldGroup parent={fieldArray} />
        case 'reisetilskudd':
            return <FomTomPicker parent={fieldArray} />
    }
}

function AktivitetIkkeMuligFieldGroup({ parent }: { parent: `mulighetForArbeid.${number}` }): ReactElement {
    return (
        <div className="flex flex-col gap-4">
            <FomTomPicker parent={parent} />
            <MedisinskArsakFieldGroup parent={parent} />
            <ForholdArbeidsplassenFieldGroup parent={parent} />
        </div>
    )
}

function BehandlingsdagerFieldGroup({ parent }: { parent: `mulighetForArbeid.${number}` }): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, `${typeof parent}.antall`>({
        name: `${parent}.antall`,
        rules: {
            required: 'Antall dager må være definert når pasienten krever sykmelding for behandlingsdager',
        },
    })

    return (
        <div className="flex flex-col gap-4">
            <FomTomPicker parent={parent} />
            <div>
                <TextField
                    {...field}
                    id={`${parent}.antall`}
                    value={field.value ?? ''}
                    error={fieldState.error?.message}
                    onChange={numberOnChange(field.onChange)}
                    className="w-60"
                    label="Oppgi antall dager i perioden"
                    type="number"
                />
            </div>
        </div>
    )
}

function AvventendeFieldGroup({ parent }: { parent: `mulighetForArbeid.${number}` }): ReactElement {
    const { field, fieldState } = useController<
        NasjonalFormValues,
        `${typeof parent}.avventendeInnspillTilArbeidsgiver`
    >({
        name: `${parent}.avventendeInnspillTilArbeidsgiver`,
        rules: {
            required:
                'Innspill til arbeidsgiver om tilrettelegging må være utfylt når avventende sykmelding er krysset av',
        },
    })

    return (
        <div className="flex flex-col gap-4">
            <FomTomPicker parent={parent} />
            <Textarea
                {...field}
                id={`${parent}.avventendeInnspillTilArbeidsgiver`}
                label="Andre innspill til arbeidsgiver"
                value={field.value ?? ''}
                error={fieldState.error?.message}
            />
        </div>
    )
}

function GradertFieldGroup({ parent }: { parent: `mulighetForArbeid.${number}` }): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, `${typeof parent}.grad`>({
        name: `${parent}.grad`,
        rules: {
            required: 'Grad for gradert periode må være definert',
            min: { value: 0, message: 'Grad må være større enn 0' },
            max: { value: 100, message: 'Grad må være mindre enn 100' },
        },
    })
    const { field: reisetilskuddField } = useController<NasjonalFormValues, `${typeof parent}.reisetilskudd`>({
        name: `${parent}.reisetilskudd`,
        defaultValue: false,
    })

    return (
        <div className="flex flex-col gap-4">
            <TextField
                {...field}
                value={field.value ?? ''}
                onChange={numberOnChange(field.onChange)}
                error={fieldState.error?.message}
                label="Oppgi grad"
                type="number"
                className="w-32"
                min={0}
                max={100}
                id={`${parent}.grad`}
            />
            <FomTomPicker parent={parent} />
            <SoloCheckbox {...reisetilskuddField} hideLegend legend="Delvis i arbeid">
                Pasienten kan være delvis i arbeid ved bruk av reisetilskudd
            </SoloCheckbox>
        </div>
    )
}

export default PeriodeFieldGroup
