import { NextRequest, NextResponse } from 'next/server'
import { randomSessionId } from '@unleash/nextjs'

import { UNLEASH_COOKIE_NAME } from '../toggles/rsc'

export default async function middleware(req: NextRequest): Promise<NextResponse> {
    const res = NextResponse.next()

    const url: URL = new URL(req.url)
    res.headers.set('x-path', url.pathname + url.search)

    const existingCookie = req.cookies.get(UNLEASH_COOKIE_NAME)
    if (existingCookie != null) {
        return res
    }

    res.cookies.set(UNLEASH_COOKIE_NAME, randomSessionId())

    return res
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
