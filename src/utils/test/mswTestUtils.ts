import { http, HttpResponse } from 'msw'

import { server } from '../../mocks/server'
import { DiagnoseSystem } from '../../components/FormComponents/DiagnosePicker/diagnose-combobox/types'
import { searchSystem } from '../../app/api/diagnose/search-system'

export function mockDiagnoseEndpointReal(): void {
    server.use(
        http.get(
            '/api/diagnose',
            async ({ request }) => {
                const url = new URL(request.url)
                const system = url.searchParams.get('system')?.toLowerCase() as Lowercase<DiagnoseSystem>
                const value = url.searchParams.get('value') as string

                return HttpResponse.json({ suggestions: searchSystem(system, value) }, { status: 200 })
            },
            { once: false },
        ),
    )
}
