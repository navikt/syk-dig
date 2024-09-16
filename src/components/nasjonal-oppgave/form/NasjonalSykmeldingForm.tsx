import * as R from 'remeda'
import React, { CSSProperties, ReactElement, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, BodyShort, ExpansionCard, HStack, List } from '@navikt/ds-react'
import { InformationIcon } from '@navikt/aksel-icons'
import { DevTool } from '@hookform/devtools'

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
            <InfoAboutSmregMigrationAlert />
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

/**
 * @Deprecated Once smreg is shut down we can remove this info and redirect
 */
export function InfoAboutSmregMigrationAlert(): ReactElement {
    return (
        <ExpansionCard
            defaultOpen={localStorage.getItem('minimized-smreg-info-card') == null}
            onToggle={(isOpen) => {
                if (!isOpen) {
                    localStorage.setItem('minimized-smreg-info-card', 'true')
                } else {
                    localStorage.removeItem('minimized-smreg-info-card')
                }
            }}
            className="mx-4"
            aria-label="Demo med ikon"
            size="small"
            style={
                {
                    '--ac-expansioncard-bg': 'var(--a-surface-info-subtle)',
                    '--ac-expansioncard-border-open-color': 'var(--a-border-alt-3)',
                    '--ac-expansioncard-border-hover-color': 'var(--a-border-alt-3)',
                } as CSSProperties
            }
        >
            <ExpansionCard.Header>
                <HStack wrap={false} gap="4" align="center">
                    <div>
                        <InformationIcon aria-hidden fontSize="3rem" />
                    </div>
                    <div>
                        <ExpansionCard.Title size="small">
                            Dette er en ny versjon av digitalisering av papirsykmeldinger
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <BodyShort spacing>
                    Utfyllingen skal oppføre seg helt likt som den gamle løsningen, med noen små endringer:
                </BodyShort>
                <List>
                    <List.Item>F.o.m. og T.o.m. er nå to felter</List.Item>
                    <List.Item>Små endringer i hvordan ting ser ut</List.Item>
                </List>
                <BodyShort>
                    Opplever du noe trøbbel er det fint om du tar kontakt med brukerstøtte eller Team Sykmelding på{' '}
                    <a href="mailto:nav.sykmelding@nav.no">mail</a> og forteller oss hva som gikk galt.
                </BodyShort>
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default NasjonalSykmeldingForm
