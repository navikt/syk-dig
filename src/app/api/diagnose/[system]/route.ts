import { logger } from '@navikt/next-logger'
import { NextRequest, NextResponse } from 'next/server'

import { verifyAPIAuthenticated } from '../../../../auth/rsc'

import { searchSystem } from './_search-system'
import { DiagnoseSearchResult } from './_types'

type RouteHandlerParams = {
    params: { system: string }
}

export async function GET(request: NextRequest, { params: { system } }: RouteHandlerParams): Promise<NextResponse> {
    const authed = await verifyAPIAuthenticated()
    if (!authed) {
        return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
    }

    if (system !== 'icd10' && system !== 'icpc2') {
        logger.error(`Invalid system used for diagnose search: ${system}`)
        return NextResponse.json({ message: `${system} is not a valid kodesystem` }, { status: 400 })
    }
    const { searchParams } = new URL(request.url)
    const value = searchParams.get('value')
    if (value == null || typeof value !== 'string') {
        logger.error(`Missing or invalid value used for diagnose search: "${value}"`)
        return NextResponse.json({ message: `Missing search value query parameter` }, { status: 400 })
    }

    return NextResponse.json({ suggestions: searchSystem(system, value) } satisfies DiagnoseSearchResult)
}
