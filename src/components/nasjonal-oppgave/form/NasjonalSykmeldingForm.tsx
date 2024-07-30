import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, BodyShort, Heading, Link, List } from '@navikt/ds-react'

import { sections } from '../sections'
import Errors, { useErrorSection } from '../../Errors/Errors'
import { Papirsykmelding } from '../schema/sykmelding/Papirsykmelding'

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

type Props = { sykmelding: Papirsykmelding | null } & OppgaveOrFerdigstilt

function NasjonalSykmeldingForm({ sykmelding, ...props }: Props): ReactElement {
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
            <InfoAboutSmregMigrationAlert {...props} />
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
                </div>
                <ActionSection submitResult={submitResult} {...props} />
            </form>
        </FormProvider>
    )
}

/**
 * @Deprecated Once smreg is shut down we can remove this info and redirect
 */
function InfoAboutSmregMigrationAlert(props: OppgaveOrFerdigstilt): ReactElement {
    return (
        <Alert className="mx-4" variant="info">
            <Heading level="2" size="small" spacing>
                Dette er en ny versjon av digitalisering av papirsykmeldinger
            </Heading>
            <BodyShort spacing>
                Utfyllingen skal oppføre seg helt likt som den gamle løsningen, med noen små endringer:
            </BodyShort>
            <List>
                <List.Item>F.o.m. og T.o.m. er nå to felter</List.Item>
                <List.Item>Små endringer i hvordan ting ser ut</List.Item>
            </List>
            <BodyShort>
                Opplever du noe trøbbel kan du fullføre{' '}
                <Link href={getOldSmregUrl(props)} className="inline">
                    denne sykmeldingen i den gamle løsningen
                </Link>
                . Dersom du gjør det er det fint om du tar kontakt med Team Sykmelding og forteller oss hva som gikk
                galt.
            </BodyShort>
        </Alert>
    )
}

/**
 * @Deprecated Once smreg is shut down we can remove this info and redirect
 */
function getOldSmregUrl(props: OppgaveOrFerdigstilt): string {
    const base = `https://smregistrering.intern.nav.no`

    if (props.ferdigstilt) {
        return `${base}?sykmeldingid=${props.sykmeldingId}`
    }

    return `${base}?oppgaveid=${props.oppgaveId}`
}

export default NasjonalSykmeldingForm
