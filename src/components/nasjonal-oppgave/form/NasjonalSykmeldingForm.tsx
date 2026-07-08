import { DevTool } from '@hookform/devtools'
import React, { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as R from 'remeda'

import { NasjonalSykmeldingFragment, SykmeldingUnderArbeidStatus } from '../../../graphql/queries/graphql.generated'
import Errors, { useErrorSection } from '../../Errors/Errors'
import { sections } from '../sections'

import ActionSection from './ActionSection'
import { createDefaultValues } from './nasjonalSykmeldingDefaultValues'
import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'
import ArbeidsgiverFormSection from './sections/ArbeidsgiverFormSection'
import BehandlerSection from './sections/behandler/BehandlerSection'
import DiagnoseFormSection from './sections/diagnose/DiagnoseFormSection'
import MeldingTilArbeidsgiverSection from './sections/MeldingTilArbeidsgiverSection'
import MeldingTilNavSection from './sections/MeldingTilNavSection'
import MulighetForArbeidSection from './sections/mulighet-for-arbeid/MulighetForArbeidSection'
import PasientOpplysningerFormSection from './sections/PasientOpplysningerFormSection'
import TilbakedateringSection from './sections/tilbakedatering/TilbakedateringSection'
import UtdypendeOpplysningerSection from './sections/UtdypendeOpplysningerSection'
import { useSubmitNasjonalSykmelding } from './useNasjonalSykmeldingSubmitHandler'

type Props = {
    sykmelding: NasjonalSykmeldingFragment
    status: SykmeldingUnderArbeidStatus
    oppgaveId: string
}

function NasjonalSykmeldingForm({ sykmelding, status, oppgaveId }: Props): ReactElement {
    const [errorRef, focusErrorSection] = useErrorSection()
    const defaultValues = createDefaultValues(sykmelding)
    const form = useForm<NasjonalFormValues>({
        defaultValues,
        shouldFocusError: false,
    })

    const [onSave, result] = useSubmitNasjonalSykmelding({
        oppgaveId: oppgaveId,
        sykmelding: sykmelding,
        status: status,
    })

    return (
        <FormProvider {...form}>
            {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions - hmm */}
            <form
                onSubmit={form.handleSubmit(onSave, focusErrorSection)}
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
                            return (
                                <PasientOpplysningerFormSection
                                    key={it}
                                    ferdigstilt={status === SykmeldingUnderArbeidStatus.Ferdigstilt}
                                />
                            )
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
                </div>
                <ActionSection submitResult={result} status={status} oppgaveId={oppgaveId} />
                {process.env.NODE_ENV !== 'production' && <DevTool control={form.control} placement="bottom-right" />}
            </form>
        </FormProvider>
    )
}

export default NasjonalSykmeldingForm
