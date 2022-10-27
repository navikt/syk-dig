import { SubmitHandler } from 'react-hook-form';
import { MutationResult, useMutation } from '@apollo/client';
import { logger } from '@navikt/next-logger';

import {
    DiagnoseInput,
    PeriodeInput,
    SaveOppgaveDocument,
    SaveOppgaveMutation,
    SykmeldingUnderArbeidStatus,
    SykmeldingUnderArbeidValues,
} from '../../../graphql/queries/graphql.generated';
import { Location, useParam } from '../../../utils/useParam';
import { SykmeldingFormValues } from '../SykmeldingForm';
import { safeDate, safeString } from '../../../utils/formUtils';
import { DiagnoseFormValue } from '../DiagnoseFormSection';
import { notNull } from '../../../utils/tsUtils';
import { PeriodeFormValue } from '../Sykmeldingsperiode';
import { useSelectedModiaEnhet } from '../../../graphql/localState/modia';

type UseSave = [save: SubmitHandler<SykmeldingFormValues>, result: MutationResult<SaveOppgaveMutation>];
type UseSaveOptions = { onCompleted?: () => void };

export function useHandleSave({ onCompleted }: UseSaveOptions): UseSave {
    const params = useParam(Location.Utenlansk);
    const enhetId = useSelectedModiaEnhet();
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveDocument);
    const saveAndClose = async (data: SykmeldingFormValues): Promise<void> => {
        logger.info(`Saving incomplete oppgave for oppgaveId: ${params.oppgaveId}`);

        await saveOppgave({
            variables: {
                id: params.oppgaveId,
                values: mapFormValues(data),
                status: SykmeldingUnderArbeidStatus.UnderArbeid,
                enhetId,
            },
            onCompleted,
        });
    };

    return [saveAndClose, mutationResult];
}

export function useHandleRegister({ onCompleted }: UseSaveOptions = {}): UseSave {
    const params = useParam(Location.Utenlansk);
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveDocument);
    const enhetId = useSelectedModiaEnhet();
    const registerAndSubmit: SubmitHandler<SykmeldingFormValues> = async (data): Promise<void> => {
        logger.info(`Submitting oppgave for oppgaveId: ${params.oppgaveId}`);

        await saveOppgave({
            variables: {
                id: params.oppgaveId,
                values: mapFormValues(data),
                status: SykmeldingUnderArbeidStatus.Ferdigstilt,
                enhetId,
            },
            onCompleted,
        });
    };

    return [registerAndSubmit, mutationResult];
}

function mapFormValues(formValues: SykmeldingFormValues): SykmeldingUnderArbeidValues {
    const cleanFnr = safeString(formValues.fnr);

    if (cleanFnr == null) {
        throw new Error(`FNR is invalid (${cleanFnr}), did RHF validation fail?`);
    }

    return {
        fnrPasient: cleanFnr,
        skrevetLand: safeString(formValues.land),
        behandletTidspunkt: safeDate(formValues.behandletTidspunkt),
        hovedDiagnose: mapDiagnose(formValues.diagnoser.hoveddiagnose),
        biDiagnoser: formValues.diagnoser.bidiagnoser.map(mapDiagnose).filter(notNull),
        perioder: formValues.periode.map(mapPeriode).filter(notNull),
        harAndreRelevanteOpplysninger: formValues.harAndreRelevanteOpplysninger,
    };
}

function mapDiagnose(diagnose: DiagnoseFormValue | null): DiagnoseInput | null {
    if (diagnose == null) return null;
    if (diagnose.code == null) return null;

    return {
        kode: diagnose.code,
        system: diagnose.system,
    };
}

function mapPeriode(periode: PeriodeFormValue | null): PeriodeInput | null {
    if (periode == null) return null;

    const fom = safeDate(periode.range.fom);
    const tom = safeDate(periode.range.tom);
    if (fom == null || tom == null) return null;

    return {
        fom,
        tom,
        type: periode.sykmeldingstype,
        grad: periode.grad ?? null,
    };
}
