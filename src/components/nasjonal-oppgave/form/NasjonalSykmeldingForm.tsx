import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Oppgave } from '../schema/oppgave/Oppgave'
import { sections } from '../sections'
import Errors, { useErrorSection } from '../../Errors/Errors'

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

type Props =
    | {
          oppgave: Oppgave
          ferdigstilt: false
      }
    | {
          oppgave: Oppgave
          ferdigstilt: true
          sykmeldingId: string
      }

function NasjonalSykmeldingForm({ oppgave, ferdigstilt, ...rest }: Props): ReactElement {
    const [errorRef, focusErrorSection] = useErrorSection()
    const defaultValues = createDefaultValues(oppgave)
    const form = useForm<NasjonalFormValues>({
        defaultValues,
        shouldFocusError: false,
    })

    const [submitHandler, submitResult] = useNasjonalSykmeldingSubmitHandler(
        'sykmeldingId' in rest
            ? { sykmeldingId: rest.sykmeldingId, ferdigstilt: true }
            : { oppgaveId: `${oppgave.oppgaveid}` },
        oppgave,
    )

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler, focusErrorSection)}
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
                            return <PasientOpplysningerFormSection key={it} ferdigstilt={ferdigstilt} />
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
                            return (
                                <BehandlerSection
                                    key={it}
                                    behandlerInfo={oppgave.papirSmRegistering?.behandler ?? null}
                                />
                            )
                    }
                })}
                <div className="px-2">
                    <Errors ref={errorRef} />
                </div>
                <ActionSection submitResult={submitResult} oppgaveId={oppgave.oppgaveid} ferdigstilt={ferdigstilt} />
            </form>
        </FormProvider>
    )
}

export default NasjonalSykmeldingForm
