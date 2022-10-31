import { z } from 'zod'
import { logger } from '@navikt/next-logger'
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { getServerEnv, isLocalOrDemo } from '../utils/env'

import { AktivEnhet, AktivEnhetSchema, Veileder, VeilederSchema } from './ModiaResponseSchema'

const env = getServerEnv()

export interface ClientError<T> {
    errorType: T
    message: string
}

export type ModiaContext = Veileder & AktivEnhet

export type ModiaContextError = ClientError<'MODIA_ERROR' | 'PARSE_ERROR' | 'FETCH_ERROR'>

export async function getModiaContext(userAccessToken: string): Promise<ModiaContext | ModiaContextError> {
    if (isLocalOrDemo) {
        logger.warn('Using mocked modia context for local development (or demo)')
        return {
            navn: 'Johan J. Johansson',
            ident: '0129381203',
            enheter: [
                { enhetId: '0312', navn: 'NAV Sagene' },
                { enhetId: '0314', navn: 'NAV Fagene' },
            ],
            aktivEnhet: '0314',
        }
    }

    const modiaOboToken = await grantAzureOboToken(userAccessToken, env.MODIACONTEXTHOLDER_SCOPE)
    if (isInvalidTokenSet(modiaOboToken)) {
        logger.error(
            new Error(`Unable to get modia obo token: ${modiaOboToken.errorType} ${modiaOboToken.message}`, {
                cause: modiaOboToken.error instanceof Error ? modiaOboToken.error : undefined,
            }),
        )
        return {
            errorType: 'FETCH_ERROR',
            message: 'Klarte ikke å hente veileder',
        }
    }

    const [veileder, aktivEnhet] = await Promise.allSettled([
        fetchModia({ path: 'decorator/v2', schema: VeilederSchema, what: 'veileder' }, modiaOboToken),
        fetchModia({ path: 'context/aktivenhet', schema: AktivEnhetSchema, what: 'aktiv enhet' }, modiaOboToken),
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
        navn: veileder.value.navn,
        ident: veileder.value.ident,
        enheter: veileder.value.enheter,
    }
}

async function fetchModia<SchemaType extends z.ZodTypeAny>(
    { path, schema, what }: { path: string; schema: SchemaType; what: 'veileder' | 'aktiv enhet' },
    accessToken: string,
): Promise<z.infer<SchemaType> | ModiaContextError> {
    const url = `https://${env.MODIACONTEXTHOLDER_HOST}/modiacontextholder/api/${path}`

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
