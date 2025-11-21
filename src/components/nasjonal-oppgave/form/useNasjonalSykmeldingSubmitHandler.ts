import { useMutation } from '@apollo/client/react'
import { logger } from '@navikt/next-logger'
import { SubmitHandler } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { ServerError } from '@apollo/client'

import { mapFormValueToNasjonalSykmelding } from '../nasjonal-sykmelding-mapping'
import { useModiaContext } from '../../../modia/modia-context'
import { raise } from '../../../utils/tsUtils'
import {
    NasjonalSykmeldingFragment,
    SaveOppgaveNasjonalDocument,
    SaveOppgaveNasjonalMutation,
    SykmeldingUnderArbeidStatus,
} from '../../../graphql/queries/graphql.generated'
import { redirectTilModia } from '../../../utils/modia'
import { redirectTilGosys } from '../../../utils/gosys'

import { NasjonalFormValues } from './NasjonalSykmeldingFormTypes'

type UseSave = [save: SubmitHandler<NasjonalFormValues>, result: useMutation.Result<SaveOppgaveNasjonalMutation>]
type UseSaveOptions = {
    oppgaveId: string
    sykmelding: NasjonalSykmeldingFragment
    status: SykmeldingUnderArbeidStatus
    onCompleted?: () => void
}
export function useSubmitNasjonalSykmelding({ oppgaveId, sykmelding, status }: UseSaveOptions): UseSave {
    const [saveOppgave, mutationResult] = useMutation(SaveOppgaveNasjonalDocument)
    const { selectedEnhetId } = useModiaContext()
    const params = useSearchParams()
    const router = useRouter()
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
            onCompleted: (data) => {
                const hasRuleHit: boolean = data.lagreNasjonalOppgave?.__typename === 'ValidationResult'
                logger.info(
                    `Submitted nasjonal sykmelding (oppgaveId: ${oppgaveId}, status: ${status}) OK (rule hits: ${hasRuleHit})`,
                )

                if (!hasRuleHit) {
                    if (params?.get('source') === 'registrer-sykmelding') {
                        router.push('/registrer-sykmelding')
                    } else if (status === SykmeldingUnderArbeidStatus.Ferdigstilt) {
                        redirectTilModia()
                    } else {
                        redirectTilGosys()
                    }
                }
            },
            onError: (error) => {
                if (ServerError.is(error)) {
                    logger.info(
                        `Server responded with ${error.statusCode} (save nasjonal sykmelding, oppgaveId: ${oppgaveId}, status: ${status}), squelching error log`,
                    )
                    return
                }
                throw error
            },
        })
    }

    return [registerAndSubmit, mutationResult]
}
