import nock from 'nock'

import { searchSystem } from '../../app/api/diagnose/search-system'
import { DiagnoseSystem } from '../../components/FormComponents/DiagnosePicker/diagnose-combobox/types'

export function mockDiagnoseEndpoint(): void {
    nock('http://localhost:3000')
        .persist()
        .get('/api/diagnose')
        .query(true)
        .reply(200, (uri) => {
            const url = new URL(uri, 'http://localhost:3000')
            const system = url.searchParams.get('system')?.toLowerCase() as Lowercase<DiagnoseSystem>
            const value = url.searchParams.get('value') as string

            return { suggestions: searchSystem(system, value) }
        })
}
