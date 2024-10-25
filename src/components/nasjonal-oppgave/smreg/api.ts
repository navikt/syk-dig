import { bundledEnv } from '../../../utils/env'

export function apiUrl(path: Parameters<typeof fetch>[0]): string {
    return `${bundledEnv.NEXT_PUBLIC_RUNTIME_ENV === 'test' ? 'http://localhost' : ''}/api/smreg/api/v1${path}`
}
