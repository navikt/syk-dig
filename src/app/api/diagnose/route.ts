import { logger } from '@navikt/next-logger'
import { NextRequest } from 'next/server'

import { DiagnoseSystem } from '../../../components/FormComponents/DiagnosePicker/diagnose-combobox/types'
import { isUserLoggedIn } from '../../../auth/rsc'

import { searchSystem } from './search-system'

export async function GET(request: NextRequest): Promise<Response> {
    const userLoggedIn = await isUserLoggedIn()
    if (!userLoggedIn) {
        return Response.json({ reason: 'Not logged in' }, { status: 401 })
    }

    const system = request.nextUrl.searchParams.get('system')
    if (system !== 'ICD10' && system !== 'ICPC2') {
        logger.error(`Invalid system used for diagnose search: ${system}`)
        return Response.json({ reason: `${system} is not a valid kodesystem` }, { status: 400 })
    }

    const value = request.nextUrl.searchParams.get('value')
    if (value == null || typeof value !== 'string') {
        logger.error(`Missing or invalid value used for diagnose search: "${value}"`)
        return Response.json({ reason: `Invalid or missing search string` }, { status: 400 })
    }

    return Response.json({
        suggestions: searchSystem(system.toLowerCase() as Lowercase<DiagnoseSystem>, value),
    })
}
