import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useRouter, useSearchParams } from 'next/navigation'

import { sections } from '../sections'
import Errors, { useErrorSection } from '../../Errors/Errors'
import { NasjonalSykmeldingFragment, SykmeldingUnderArbeidStatus } from '../../../graphql/queries/graphql.generated'
import { redirectTilGosys } from '../../../utils/gosys'
import { redirectTilModia } from '../../../utils/modia'

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
import { useSubmitNasjonalSykmelding } from './useNasjonalSykmeldingSubmitHandler'
import ActionSection from './ActionSection'

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

    const params = useSearchParams()
    const router = useRouter()
    const [onSave, result] = useSubmitNasjonalSykmelding({
        oppgaveId: oppgaveId,
        sykmelding: sykmelding,
        status: status,
        onCompleted: () => {
            // TODO: Better solution to this hacky implementation of a delay:
            // Necessary to let RHF re-render with isSubmitSuccessful before we redirect to Gosys
            setTimeout(() => {
                if (params?.get('source') === 'registrer-sykmelding') {
                    router.push('/registrer-sykmelding')
                } else if (status === SykmeldingUnderArbeidStatus.Ferdigstilt) {
                    redirectTilModia()
                } else {
                    redirectTilGosys()
                }
            }, 100)
        },
    })

    return (
        <FormProvider {...form}>
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
