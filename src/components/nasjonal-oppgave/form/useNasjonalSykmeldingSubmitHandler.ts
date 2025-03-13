import { MutationResult, useMutation } from '@apollo/client'
import { logger } from '@navikt/next-logger'
import { SubmitHandler } from 'react-hook-form'

import { mapFormValueToNasjonalSykmelding } from '../smreg/nasjonal-sykmelding-mapping'
import { useModiaContext } from '../../../modia/modia-context'
import { raise } from '../../../utils/tsUtils'
import {
    NasjonalSykmeldingFragment,
    SaveOppgaveNasjonalDocument,
    SaveOppgaveNasjonalMutation,
    SykmeldingUnderArbeidStatus,
} from '../../../graphql/queries/graphql.generated'

import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'

type UseSave = [save: SubmitHandler<NasjonalFormValues>, result: MutationResult<SaveOppgaveNasjonalMutation>]
type UseSaveOptions = {
    oppgaveId: string
    sykmelding: NasjonalSykmeldingFragment
    status: SykmeldingUnderArbeidStatus
    onCompleted?: () => void
}
export function useSubmitNasjonalSykmelding({ oppgaveId, sykmelding, status, onCompleted }: UseSaveOptions): UseSave {
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveNasjonalDocument)
    const { selectedEnhetId } = useModiaContext()
    const registerAndSubmit: SubmitHandler<NasjonalFormValues> = async (data: NasjonalFormValues): Promise<void> => {
        logger.info(`Submitting nasjonal oppgave for oppgaveId: ${oppgaveId}`)
        const mappedValues = mapFormValueToNasjonalSykmelding(data, sykmelding)

        await saveOppgave({
            variables: {
                oppgaveId: oppgaveId,
                sykmeldingValues: mappedValues,
                sykmeldingStatus: status,
                navEnhet: selectedEnhetId ?? raise('Oppgave kan ikke lagres uten valgt enhet'),
            },
            onCompleted,
        })
    }

    return [registerAndSubmit, mutationResult]
}
