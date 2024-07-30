import { throwServerError } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import { logger } from '@navikt/next-logger'

import { OppgaveSchema } from '../schema/oppgave/Oppgave'
import { PasientNavnSchema } from '../schema/Pasient'
import { RuleHitErrorsSchema } from '../schema/RuleHitErrors'
import { SykmelderSchema } from '../schema/Sykmelder'

export class OppgaveAlreadySolvedError extends Error {}

export class BadRequestError extends Error {}

export class OppgaveGoneError extends Error {}

export class UnauthorizedError extends Error {}

const smregRestLink = new RestLink({
    uri: '/api/smreg/api/v1/',
    typePatcher: {
        Oppgave: (data) => OppgaveSchema.parse(data),
        Pasient: (data) => PasientNavnSchema.parse(data),
        RuleHits: (data) => RuleHitErrorsSchema.nullable().parse(data),
        Sykmelder: (data) => SykmelderSchema.parse(data),
    },
    customFetch: async (input, init) => {
        logger.info(`Fetching smreg (${input})`)

        const res = await fetch(input, init)

        logger.info(`Fetched smreg (${input}) OK`)

        if (res.url.endsWith('/send') && res.status === 400) {
            logger.info('smreg responded with 400, response probably has rulehits')
            return new Response(res.body, {
                status: 200,
                headers: res.headers,
            })
        }

        return res
    },
    responseTransformer: async (response: Response, typeName) => {
        // 204 No Content from POST
        if (!(response instanceof Response) && Object.keys(response).length === 0) return null

        if (!response.ok) {
            await handleNotOkResponse(response)
        }

        if (response.headers.get('Content-Type') === 'text/plain') {
            if (typeName === 'RuleHits') {
                const serverError = await response.text()
                logger.info(`Server responded with "${serverError}"`)
                // This means the server responded with a specific error, apollo needs to error
                throwServerError(response, undefined, serverError)
            }
            return response.text()
        } else {
            return response.json()
        }
    },
})

async function handleNotOkResponse(res: Response): Promise<never> {
    switch (res.status) {
        case 400:
            logger.warn(`Oppgave ${res.url} (400) er ikke tilgjengelig, body: ${await res.text()}`)
            throw new BadRequestError(`Klarte ikke å hente en gyldig oppgave-id fra lenken: ${window.location.href}`)
        case 401:
            throw new UnauthorizedError(
                `Du har blitt logget ut, eller har ugyldig tilgang. Vennligst last siden på nytt.`,
            )
        case 403:
            throw new UnauthorizedError(
                `Du har ikke tilgang til oppgaven. Sjekk om du har riktige tilganger for å behandle slike oppgaver`,
            )
        case 404:
            throw new OppgaveAlreadySolvedError(
                `Fant ingen uløste oppgaver. Oppgaven finnes ikke eller er allerede løst.`,
            )
        case 410:
            throw new OppgaveGoneError(`Fant ingen skannede dokumenter. Oppgaven er sendt tilbake til Gosys.`)
        default:
            throw new Error(`Ukjent feil med statuskode: ${res.status} ${res.statusText}, body: ${await res.text()}`)
    }
}

export default smregRestLink
