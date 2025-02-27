export const allowedAPIs = [
    'GET /api/v1/proxy/pasient',
    'GET /api/v1/proxy/sykmelder/[id|hpr]',
    'POST /api/v1/proxy/oppgave/[id|hpr]/tilgosys',
    'POST /api/v1/proxy/oppgave/[id|hpr]/avvis',
    'POST /api/v1/proxy/oppgave/[id|hpr]/send',
    'POST /api/v1/proxy/sykmelding/[uuid]',
    'GET /api/v1/proxy/pdf/[id|hpr]/[id|hpr]',
]

const UUID = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g
const OPPGAVE_OR_HPR = /[0-9]{7,9}/g

export function cleanPath(value: string): string {
    return value?.replace(UUID, '[uuid]').replace(OPPGAVE_OR_HPR, '[id|hpr]')
}
