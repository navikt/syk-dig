import { NextRequest, NextResponse } from 'next/server'
import { randomSessionId } from '@unleash/nextjs'

import { isLocalOrDemo } from './utils/env'
import { UNLEASH_COOKIE_NAME } from './toggles/cookie'
import { setSessionCookieIfUnset } from './mocks/session'

/**
 * Middleware is run on every document request, it handles CSP,
 * generates unleash session id, and gives the layout.tsx a
 * path to redirect on for auth
 */
export default async function middleware(req: NextRequest): Promise<NextResponse> {
    const requestHeaders = new Headers(req.headers)

    const [cspHeader, nonce] = createCsp()
    // Disable CSP in dev and demo
    if (!isLocalOrDemo) {
        requestHeaders.set('x-nonce', nonce)
        requestHeaders.set('Content-Security-Policy', cspHeader)
    }

    const res = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    if (isLocalOrDemo) {
        // Set a session cookie we can use for mock engine
        setSessionCookieIfUnset(req, res)
    }

    const existingCookie = req.cookies.get(UNLEASH_COOKIE_NAME)
    if (existingCookie == null) {
        res.cookies.set(UNLEASH_COOKIE_NAME, randomSessionId())
    }
    return res
}

function createCsp(): [string, string] {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}' https://cdn.nav.no;
        img-src 'self' blob: data:;
        font-src 'self' https://cdn.nav.no;
        object-src 'self';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
    `
        .replace(/\s{2,}/g, ' ')
        .trim()

    return [cspHeader, nonce]
}

export const config = {
    runtime: 'nodejs',
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
}
