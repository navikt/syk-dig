import { http, HttpResponse } from 'msw'

import { server } from '../../../mocks/server'
import sykmelder from '../mock/sykmelder.json'
import { apiUrl } from '../smreg/api'

export function mockBehandlerinfo(): void {
    server.use(http.get(apiUrl('/proxy/sykmelder/:hpr'), () => HttpResponse.json(sykmelder)))
}
