import { HttpResponse, RequestHandler, http } from 'msw'

import { api } from '../utils/apiUtils'
import { searchSystem } from '../app/api/diagnose/[system]/_search-system'
import { DiagnoseSearchResult } from '../app/api/diagnose/[system]/_types'
import { countriesResponse } from '../app/api/country/_countries'
import { Country } from '../app/api/country/_types'

/**
 * These are only used in MSW during tests, normally we use the real API routes in next
 */
export const handlers: RequestHandler[] = [
    http.get(api('/api/diagnose/:system'), async ({ request, params }) => {
        const url: URL = new URL(request.url)
        const value: string = url.searchParams.get('value') ?? ''
        const system = params.system
        if (system !== 'icd10' && system !== 'icpc2') {
            throw new Error(`Illegal path parameter: ${system}`)
        }

        return HttpResponse.json<DiagnoseSearchResult>({ suggestions: searchSystem(system, value) })
    }),
    http.get(api('/api/country'), async () => {
        return HttpResponse.json<Country[]>(countriesResponse)
    }),
]
