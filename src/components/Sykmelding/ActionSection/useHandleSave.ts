import { SubmitHandler } from 'react-hook-form';
import { MutationResult, useMutation } from '@apollo/client';
import { logger } from '@navikt/next-logger';

import {
    SaveOppgaveDocument,
    SaveOppgaveMutation,
    SykmeldingUnderArbeidStatus,
} from '../../../graphql/queries/graphql.generated';
import { Location, useParam } from '../../../utils/useParam';
import { SykmeldingFormValues } from '../SykmeldingForm';
import { safeString } from '../../../utils/formUtils';

type UseSave = [save: SubmitHandler<SykmeldingFormValues>, result: MutationResult<SaveOppgaveMutation>];
type UseSaveOptions = { onCompleted?: () => void };

export function useHandleSave({ onCompleted }: UseSaveOptions): UseSave {
    const params = useParam(Location.Utenlansk);
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveDocument);
    const saveAndClose = async (data: SykmeldingFormValues): Promise<void> => {
        logger.info(`Saving incomplete oppgave for oppgaveId: ${params.oppgaveId}`);

        await saveOppgave({
            variables: {
                id: params.oppgaveId,
                values: {
                    // TODO expand syk-dig-backend schema to include all fields
                    fnrPasient: safeString(data.fnr),
                    skrevetLand: safeString(data.land),
                },
                status: SykmeldingUnderArbeidStatus.UnderArbeid,
            },
            onCompleted,
        });
    };

    return [saveAndClose, mutationResult];
}

export function useHandleRegister({ onCompleted }: UseSaveOptions = {}): UseSave {
    const params = useParam(Location.Utenlansk);
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveDocument);
    const registerAndSubmit: SubmitHandler<SykmeldingFormValues> = async (data): Promise<void> => {
        logger.info(`Submitting oppgave for oppgaveId: ${params.oppgaveId}`);

        await saveOppgave({
            variables: {
                id: params.oppgaveId,
                values: {
                    // TODO expand syk-dig-backend schema to include all fields
                    fnrPasient: safeString(data.fnr),
                    skrevetLand: safeString(data.land),
                },
                status: SykmeldingUnderArbeidStatus.Ferdigstilt,
            },
            onCompleted,
        });
    };

    return [registerAndSubmit, mutationResult];
}
