import { SubmitHandler } from 'react-hook-form'
import { MutationResult, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import {
    DiagnoseInput,
    PeriodeInput,
    SaveOppgaveDocument,
    SaveOppgaveMutation,
    SykmeldingUnderArbeidStatus,
    SykmeldingUnderArbeidValues,
    UpdateDigitalisertSykmeldingDocument,
    UpdateDigitalisertSykmeldingMutation,
} from '../../../../graphql/queries/graphql.generated'
import { Location, useOppgaveParam, useSykmeldingParam } from '../../../../utils/useOppgaveParam'
import { UtenlanskFormValues } from '../../SykmeldingForm'
import { safeDate, safeString } from '../../../../utils/formUtils'
import { notNull, raise } from '../../../../utils/tsUtils'
import { PeriodeFormValue } from '../../Sykmeldingsperiode'
import { useModiaContext } from '../../../../modia/modia-context'
import { DiagnoseFormValue } from '../../../FormComponents/DiagnosePicker/diagnose-combobox/types'

type UseSave = [save: SubmitHandler<UtenlanskFormValues>, result: MutationResult<SaveOppgaveMutation>]
type UseSaveOptions = { fnr: string; onCompleted?: () => void }
type UseUpdate = [
    save: SubmitHandler<UtenlanskFormValues>,
    result: MutationResult<UpdateDigitalisertSykmeldingMutation>,
]
type UseUpdateOptions = { fnr: string; onCompleted?: () => void }
export function useHandleSave({ fnr, onCompleted }: UseSaveOptions): UseSave {
    const params = useOppgaveParam(Location.Utenlansk)
    const { selectedEnhetId } = useModiaContext()
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveDocument)
    const saveAndClose = async (data: UtenlanskFormValues): Promise<void> => {
        logger.info(`Saving incomplete oppgave for oppgaveId: ${params.oppgaveId}`)

        await saveOppgave({
            variables: {
                id: params.oppgaveId,
                values: mapFormValues(fnr, data),
                status: SykmeldingUnderArbeidStatus.UnderArbeid,
                enhetId: selectedEnhetId ?? raise('Oppgave kan ikke lagres uten valgt enhet'),
            },
            onCompleted,
        })
    }

    return [saveAndClose, mutationResult]
}

export function useHandleRegister({ fnr, onCompleted }: UseSaveOptions): UseSave {
    const params = useOppgaveParam(Location.Utenlansk)
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveDocument)
    const { selectedEnhetId } = useModiaContext()
    const registerAndSubmit: SubmitHandler<UtenlanskFormValues> = async (data): Promise<void> => {
        logger.info(`Submitting oppgave for oppgaveId: ${params.oppgaveId}`)

        await saveOppgave({
            variables: {
                id: params.oppgaveId,
                values: mapFormValues(fnr, data),
                status: SykmeldingUnderArbeidStatus.Ferdigstilt,
                enhetId: selectedEnhetId ?? raise('Oppgave kan ikke lagres uten valgt enhet'),
            },
            onCompleted,
        })
    }

    return [registerAndSubmit, mutationResult]
}

export function useHandleUpdateSykmelding({ fnr, onCompleted }: UseUpdateOptions): UseUpdate {
    const params = useSykmeldingParam()
    const [updateSykmelding, mutationResult] = useMutation(UpdateDigitalisertSykmeldingDocument)
    const { selectedEnhetId } = useModiaContext()

    const submitUpdateSykmelding: SubmitHandler<UtenlanskFormValues> = async (data): Promise<void> => {
        logger.info(`Submitting update sykmelding for sykmeldingId ${params.sykmeldingId}`)
        await updateSykmelding({
            variables: {
                sykmeldingId: params.sykmeldingId,
                values: mapFormValues(fnr, data),
                enhetId: selectedEnhetId ?? raise('Sykmeldingen kan ikke oppdateres uten valgt enhet'),
            },
            onCompleted,
        })
    }

    return [submitUpdateSykmelding, mutationResult]
}

function mapFormValues(fnr: string, formValues: UtenlanskFormValues): SykmeldingUnderArbeidValues {
    return {
        fnrPasient: fnr,
        skrevetLand: safeString(formValues.land),
        behandletTidspunkt: safeDate(formValues.behandletTidspunkt),
        hovedDiagnose: mapDiagnose(formValues.diagnoser.hoveddiagnose),
        biDiagnoser: formValues.diagnoser.bidiagnoser.map(mapDiagnose).filter(notNull),
        perioder: formValues.periode.map(mapPeriode).filter(notNull),
        folkeRegistertAdresseErBrakkeEllerTilsvarende: false,
        erAdresseUtland: formValues.erAdresseUtland ?? false,
    }
}

function mapDiagnose(diagnose: DiagnoseFormValue | null): DiagnoseInput | null {
    if (diagnose == null) return null
    if (diagnose.code == null) return null

    return {
        kode: diagnose.code,
        system: diagnose.system,
    }
}

function mapPeriode(periode: PeriodeFormValue | null): PeriodeInput | null {
    if (periode == null) return null

    const fom = safeDate(periode.range.fom)
    const tom = safeDate(periode.range.tom)
    if (fom == null || tom == null) return null

    return {
        fom,
        tom,
        type: periode.sykmeldingstype,
        grad: periode.grad ?? null,
    }
}
