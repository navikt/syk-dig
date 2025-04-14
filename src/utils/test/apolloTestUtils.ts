import { FetchResult, TypedDocumentNode, Unmasked } from '@apollo/client'
import { MockedResponse, ResultFunction } from '@apollo/client/testing'

export function createMock<Query, Variables extends Record<string, unknown>>(mockedResponse: {
    request: { query: TypedDocumentNode<Query, Variables>; variables?: Variables }
    result?: FetchResult<Unmasked<Query>> | ResultFunction<FetchResult<Unmasked<Query>>, Record<string, unknown>>
    error?: Error
    delay?: number
    newData?: ResultFunction<FetchResult<Unmasked<Query>>>
}): MockedResponse<Query> {
    return mockedResponse
}
