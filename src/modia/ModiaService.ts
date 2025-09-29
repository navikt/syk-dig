import * as z from 'zod'
import { logger } from '@navikt/next-logger'
import { getToken, requestOboToken } from '@navikt/oasis'
import { headers } from 'next/headers'

import { getServerEnv, isLocalOrDemo } from '../utils/env'

import { AktivEnhet, AktivEnhetSchema, Veileder, VeilederSchema } from './ModiaResponseSchema'

export interface ClientError<T> {
    errorType: T
    message: string
}

export type ModiaData = Veileder & AktivEnhet

export type ModiaDataError = ClientError<'MODIA_ERROR' | 'PARSE_ERROR' | 'FETCH_ERROR' | 'UNKNOWN_ERROR'>

export async function getModiaData(): Promise<ModiaData | ModiaDataError> {
    if (isLocalOrDemo) {
        logger.warn('Using mocked modia context for local development (or demo)')
        return {
            fornavn: 'Johan J.',
            etternavn: 'Johansson',
            ident: '0129381203',
            enheter: [
                { enhetId: '0312', navn: 'NAV Sagene' },
                { enhetId: '0314', navn: 'NAV Fagene' },
            ],
            aktivEnhet: null,
        }
    }

    const requestHeaders = await headers()
    const token = getToken(requestHeaders)
    if (!token) {
        logger.error('No access token found in request when fetching modia context')
        return {
            errorType: 'FETCH_ERROR',
            message: 'Klarte ikke å hente veileder',
        }
    }

    const modiaOboResult = await requestOboToken(token, getServerEnv().MODIACONTEXTHOLDER_SCOPE)
    if (!modiaOboResult.ok) {
        logger.error(
            new Error(`Unable to get modia obo token: ${modiaOboResult.error.message}`, {
                cause: modiaOboResult.error,
            }),
        )
        return {
            errorType: 'FETCH_ERROR',
            message: 'Klarte ikke å hente veileder',
        }
    }

    const [veileder, aktivEnhet] = await Promise.allSettled([
        fetchModia({ path: 'decorator/v2', schema: VeilederSchema, what: 'veileder' }, modiaOboResult.token),
        fetchModia({ path: 'context/aktivenhet', schema: AktivEnhetSchema, what: 'aktiv enhet' }, modiaOboResult.token),
    ])

    if (veileder.status === 'rejected' || aktivEnhet.status === 'rejected') {
        if (veileder.status === 'rejected') {
            logger.error(veileder.reason)
        }
        if (aktivEnhet.status === 'rejected') {
            logger.error(aktivEnhet.reason)
        }

        return {
            errorType: 'FETCH_ERROR',
            message: 'Henting av veileder eller aktiv enhet feilet',
        }
    }

    if ('errorType' in aktivEnhet.value) {
        return aktivEnhet.value
    } else if ('errorType' in veileder.value) {
        return veileder.value
    }

    return {
        aktivEnhet: aktivEnhet.value.aktivEnhet,
        fornavn: veileder.value.fornavn,
        etternavn: veileder.value.etternavn,
        ident: veileder.value.ident,
        enheter: veileder.value.enheter,
    }
}

async function fetchModia<SchemaType extends z.ZodTypeAny>(
    { path, schema, what }: { path: string; schema: SchemaType; what: 'veileder' | 'aktiv enhet' },
    accessToken: string,
): Promise<z.infer<SchemaType> | ModiaDataError> {
    const url = `http://${getServerEnv().MODIACONTEXTHOLDER_HOST}/api/${path}`

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

        if (!response.ok) {
            logger.error(
                `ModiaContextHolder responded with ${response.status} ${
                    response.statusText
                } for path ${path}, body: ${await response.text()}`,
            )

            return { errorType: 'MODIA_ERROR', message: `Klarte ikke å hente ${what}` }
        }

        const parsed = schema.safeParse(await response.json())
        if (parsed.success) {
            return parsed.data
        } else {
            const errorMessage = `Unable to parse modia context response: ${parsed.error.message}`
            logger.error(errorMessage)
            return { errorType: 'PARSE_ERROR', message: `Klarte ikke å hente veileder` }
        }
    } catch (e) {
        logger.error('Unknown modia error: Unable to get veileder from modia context')
        throw e
    }
}
