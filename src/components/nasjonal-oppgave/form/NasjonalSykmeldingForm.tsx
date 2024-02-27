import * as R from 'remeda'
import React, { ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MutationResult } from '@apollo/client'
import { Alert, BodyShort, List } from '@navikt/ds-react'

import { Oppgave } from '../schema/oppgave/Oppgave'
import { sections } from '../sections'
import { RuleHitErrors } from '../schema/RuleHitErrors'

import DiagnoseFormSection from './sections/diagnose/DiagnoseFormSection'
import ArbeidsgiverFormSection from './sections/ArbeidsgiverFormSection'
import MulighetForArbeidSection from './sections/mulighet-for-arbeid/MulighetForArbeidSection'
import UtdypendeOpplysningerSection from './sections/UtdypendeOpplysningerSection'
import PasientOpplysningerFormSection from './sections/PasientOpplysningerFormSection'
import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'
import { createDefaultValues } from './nasjonalSykmeldingDefaultValues'
import { useNasjonalSykmeldingSubmitHandler } from './useNasjonalSykmeldingSubmitHandler'
import ActionSection from './ActionSection'
import MeldingTilNavSection from './sections/MeldingTilNavSection'
import MeldingTilArbeidsgiverSection from './sections/MeldingTilArbeidsgiverSection'
import TilbakedateringSection from './sections/tilbakedatering/TilbakedateringSection'
import BehandlerSection from './sections/behandler/BehandlerSection'

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
    const defaultValues = createDefaultValues(oppgave)
    const form = useForm<NasjonalFormValues>({
        defaultValues,
    })

    const [submitHandler, submitResult] = useNasjonalSykmeldingSubmitHandler(
        'sykmeldingId' in rest
            ? { sykmeldingId: rest.sykmeldingId, ferdigstilt: true }
            : { oppgaveId: `${oppgave.oppgaveid}` },
    )

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(
                    (validValues) => {
                        // eslint-disable-next-line no-console
                        console.log('Debug: Form was submitted: ', validValues)

                        submitHandler(validValues)
                    },
                    (fieldErrors) => {
                        // eslint-disable-next-line no-console
                        console.log('Debug: Form has errors: ', JSON.stringify(fieldErrors, null, 2))
                    },
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
                {R.keys.strict(sections).map((it) => {
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
                <ActionSection submitResult={submitResult} />
                <SubmitResult submitResult={submitResult} />
            </form>
        </FormProvider>
    )
}

function SubmitResult({
    submitResult,
}: {
    submitResult: MutationResult<{ ruleHits: RuleHitErrors | null }>
}): ReactElement | null {
    const hasRuleHitErrors = submitResult.data?.ruleHits != null

    if (submitResult.error) {
        return (
            <Alert variant="error">
                <BodyShort>Det oppsto dessverre en feil i baksystemet. Vennligst prøv igjen senere.</BodyShort>
            </Alert>
        )
    }

    if (hasRuleHitErrors) {
        return (
            <Alert variant="warning">
                <BodyShort>
                    Baksystemet fant ytterligere feil som må behandles. Rett feilene nedenfor, og forsøk å registrere
                    sykmeldingen på nytt.
                </BodyShort>
                <List>
                    {submitResult.data?.ruleHits?.ruleHits.map((ruleHit) => (
                        <li key={ruleHit.ruleName}>{ruleHit.messageForSender}</li>
                    ))}
                </List>
            </Alert>
        )
    }

    if (submitResult.called && submitResult.data != null) {
        return (
            <Alert variant="success" className="m-4">
                <BodyShort>Skjemaet ble sendt</BodyShort>
                <BodyShort>TODO: Bruk modal</BodyShort>
            </Alert>
        )
    }

    return null
}

export default NasjonalSykmeldingForm
