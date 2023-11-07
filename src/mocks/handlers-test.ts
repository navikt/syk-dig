import { HttpResponse, RequestHandler, http } from 'msw'

import { api } from '../utils/apiUtils'
import { DiagnoseSearchResult, searchSystem } from '../pages/api/diagnose/[system].api'
import { countriesResponse, Country } from '../pages/api/country/index.api'

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
