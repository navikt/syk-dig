import { createYoga } from 'graphql-yoga'
import { addResolversToSchema } from '@graphql-tools/schema'
import { logger } from '@navikt/next-logger'
import { buildClientSchema, IntrospectionQuery } from 'graphql/utilities'

import introspection from '../../schema.json'

import { mockResolvers } from './graphql-mock-resolvers'

interface NextContext {
    params: Promise<Record<string, string>>
}

export function createMockGraphQLHandler(): (request: Request, ctx: NextContext) => Response | Promise<Response> {
    const base = buildClientSchema(introspection.data as unknown as IntrospectionQuery)
    const schema = addResolversToSchema({
        schema: base,
        resolvers: mockResolvers,
    })

    const { handleRequest } = createYoga<NextContext>({
        schema,
        logging: logger,
        graphqlEndpoint: '/api/graphql-mock',
        fetchAPI: { Response },
    })

    return handleRequest
}
