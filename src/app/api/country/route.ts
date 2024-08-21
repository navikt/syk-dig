/**
 * Source for country list:
 * https://github.com/stefangabos/world_countries/blob/master/data/countries/no/countries.json
 */
import { NextResponse } from 'next/server'

import { isUserLoggedIn } from '../../../auth/rsc'

import { countriesResponse } from './_countries'

export async function GET(): Promise<NextResponse> {
    const authed = await isUserLoggedIn()
    if (!authed) {
        return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
    }

    return NextResponse.json(countriesResponse)
}
