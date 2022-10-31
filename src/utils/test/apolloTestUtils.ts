import { FetchResult, TypedDocumentNode } from '@apollo/client'
import { MockedResponse, ResultFunction } from '@apollo/client/testing'

export function createMock<Query, Variables extends Record<string, unknown>>(mockedResponse: {
    request: { query: TypedDocumentNode<Query, Variables>; variables?: Variables }
    result?: FetchResult<Query> | ResultFunction<FetchResult<Query>>
    error?: Error
    delay?: number
    newData?: ResultFunction<FetchResult>
}): MockedResponse<Query> {
    return mockedResponse
}
