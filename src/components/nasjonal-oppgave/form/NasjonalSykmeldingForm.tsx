import * as R from 'remeda'
import React, { ReactElement, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert } from '@navikt/ds-react'
import { DevTool } from '@hookform/devtools'

import { sections } from '../sections'
import Errors, { useErrorSection } from '../../Errors/Errors'
import { NasjonalSykmeldingFragment } from '../../../graphql/queries/graphql.generated'

import BehandlerSection from './sections/behandler/BehandlerSection'
import DiagnoseFormSection from './sections/diagnose/DiagnoseFormSection'
import MeldingTilNavSection from './sections/MeldingTilNavSection'
import TilbakedateringSection from './sections/tilbakedatering/TilbakedateringSection'
import ArbeidsgiverFormSection from './sections/ArbeidsgiverFormSection'
import MulighetForArbeidSection from './sections/mulighet-for-arbeid/MulighetForArbeidSection'
import UtdypendeOpplysningerSection from './sections/UtdypendeOpplysningerSection'
import MeldingTilArbeidsgiverSection from './sections/MeldingTilArbeidsgiverSection'
import PasientOpplysningerFormSection from './sections/PasientOpplysningerFormSection'
import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'
import { createDefaultValues } from './nasjonalSykmeldingDefaultValues'
import { useNasjonalSykmeldingSubmitHandler } from './useNasjonalSykmeldingSubmitHandler'
import ActionSection from './ActionSection'

type OppgaveOrFerdigstilt =
    | {
          ferdigstilt: false
          oppgaveId: string
      }
    | {
          ferdigstilt: true
          sykmeldingId: string
      }

type Props = { sykmelding: NasjonalSykmeldingFragment | null } & OppgaveOrFerdigstilt

function NasjonalSykmeldingForm({ sykmelding, ...props }: Props): ReactElement {
    const [hasParseError, setHasParseError] = useState(false)
    const [errorRef, focusErrorSection] = useErrorSection()
    const defaultValues = createDefaultValues(sykmelding)
    const form = useForm<NasjonalFormValues>({
        defaultValues,
        shouldFocusError: false,
    })

    const [submitHandler, submitResult] = useNasjonalSykmeldingSubmitHandler(
        props.ferdigstilt
            ? { sykmeldingId: props.sykmeldingId, ferdigstilt: true }
            : { oppgaveId: `${props.oppgaveId}` },
        sykmelding,
    )

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(
                    (values) => submitHandler(values).catch(() => setHasParseError(true)),
                    focusErrorSection,
                )}
                onKeyDown={(e) => {
                    // Don't submit form on enter, anywhere in the form
                    const { key, target } = e

                    if (key !== 'Enter' || target instanceof HTMLTextAreaElement) {
                        return
                    }

                    e.preventDefault()
                }}
            >
                {R.keys(sections).map((it) => {
                    switch (it) {
                        case 'PASIENTOPPLYSNINGER':
                            return <PasientOpplysningerFormSection key={it} ferdigstilt={props.ferdigstilt} />
                        case 'ARBEIDSGIVER':
                            return <ArbeidsgiverFormSection key={it} />
                        case 'DIAGNOSE':
                            return <DiagnoseFormSection key={it} />
                        case 'MULIGHET_FOR_ARBEID':
                            return <MulighetForArbeidSection key={it} />
                        case 'UTDYPENDE_OPPLYSNINGER':
                            return <UtdypendeOpplysningerSection key={it} />
                        case 'MELDING_TIL_NAV':
                            return <MeldingTilNavSection key={it} />
                        case 'MELDING_TIL_ARBEIDSGIVER':
                            return <MeldingTilArbeidsgiverSection key={it} />
                        case 'TILBAKEDATERING':
                            return <TilbakedateringSection key={it} />
                        case 'BEHANDLER':
                            return <BehandlerSection key={it} behandlerInfo={sykmelding?.behandler ?? null} />
                    }
                })}
                <div className="px-2">
                    <Errors ref={errorRef} />
                    {hasParseError && (
                        <Alert variant="error" className="my-8 mx-4">
                            En uventet feil har skjedd! Dette er en bug som må rettes av Team Sykmelding. Ta kontakt med
                            brukerstøtte.
                        </Alert>
                    )}
                </div>
                <ActionSection submitResult={submitResult} {...props} />
                {process.env.NODE_ENV !== 'production' && <DevTool control={form.control} placement="bottom-right" />}
            </form>
        </FormProvider>
    )
}

export default NasjonalSykmeldingForm
