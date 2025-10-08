import React, { ReactElement } from 'react'
import { BodyLong, Heading, Skeleton, TextField } from '@navikt/ds-react'
import { useController, useFormContext } from 'react-hook-form'
import { QueryResult, useQuery } from '@apollo/client'
import { logger } from '@navikt/next-logger'

import { getSectionTitle, sections } from '../../sections'
import FormSection from '../../../form-layout/FormSection'
import { NasjonalFormValues } from '../NasjonalSykmeldingFormTypes'
import { PasientDocument, PasientQuery, PasientQueryVariables } from '../../../../graphql/queries/graphql.generated'

type Props = {
    ferdigstilt: boolean
}

function PasientOpplysningerFormSection({ ferdigstilt }: Props): ReactElement {
    return (
        <FormSection id="pasientopplysninger-seksjon" title={getSectionTitle(sections.PASIENTOPPLYSNINGER)}>
            <div className="grid grid-cols-2 gap-8">
                <FodselsnummerField ferdigstilt={ferdigstilt} />
                <PersonDisplay />
            </div>
        </FormSection>
    )
}

function FodselsnummerField({ ferdigstilt }: Props): ReactElement {
    const { field, fieldState } = useController<NasjonalFormValues, 'pasientopplysninger.fnr'>({
        name: 'pasientopplysninger.fnr',
        rules: {
            required: 'Pasientens fødselsnummer må være definert',
            minLength: { value: 11, message: 'Pasientens fødselsnummer må være 11 siffer' },
            maxLength: { value: 11, message: 'Pasientens fødselsnummer må være 11 siffer' },
            pattern: {
                value: /^[0-9]{11}$/,
                message: 'Pasientens fødselsnummer er ikke på et gyldig format',
            },
        },
    })

    return (
        <TextField
            {...field}
            value={field.value ?? ''}
            error={fieldState.error?.message}
            className="grow"
            disabled={ferdigstilt}
            id="pasientopplysninger.fnr"
            label="1.2 Fødselsnummer (11 siffer)"
        />
    )
}

function PersonDisplay(): ReactElement {
    const { watch } = useFormContext<NasjonalFormValues>()
    const fnr = watch('pasientopplysninger.fnr')
    const { data, error, loading } = usePersonName(fnr)

    return (
        <div className="navds-form-field navds-form-field--medium grow">
            <Heading level="2" size="xsmall">
                Navn
            </Heading>
            {!loading && data?.pasientNavn?.__typename === 'Navn' ? (
                <BodyLong>
                    {data?.pasientNavn.fornavn} {data?.pasientNavn.mellomnavn} {data?.pasientNavn.etternavn}
                </BodyLong>
            ) : loading ? (
                <Skeleton width="67%" variant="rounded" />
            ) : (
                error && (
                    <BodyLong className="text-red-500">
                        En feil oppsto ved henting av pasient info. Ta kontakt dersom feilen vedvarer.
                    </BodyLong>
                )
            )}
        </div>
    )
}

function usePersonName(fnr: string | null): QueryResult<PasientQuery, PasientQueryVariables> {
    return useQuery(PasientDocument, {
        fetchPolicy: 'network-only',
        skip: fnr != null && fnr.length !== 11,
        notifyOnNetworkStatusChange: true,
        context: { headers: { 'X-Pasient-Fnr': fnr } },
        onError: (e) => logger.error(e),
    })
}

export default PasientOpplysningerFormSection
