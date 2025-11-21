import { ApolloLink, TypedDocumentNode, Unmasked } from '@apollo/client'
import { MockLink } from '@apollo/client/testing'

export function createMock<Query, Variables extends Record<string, unknown>>(mockedResponse: {
    request: { query: TypedDocumentNode<Query, Variables>; variables?: Variables }
    result?:
        | ApolloLink.Result<Unmasked<Query>>
        | MockLink.ResultFunction<ApolloLink.Result<Unmasked<Query>>, Record<string, unknown>>
    error?: Error
    delay?: number
    newData?: MockLink.ResultFunction<ApolloLink.Result<Unmasked<Query>>>
}): MockLink.MockedResponse<Query> {
    return mockedResponse
}
