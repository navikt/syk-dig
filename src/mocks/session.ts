import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'syk-dig-session-id'

export function setSessionCookieIfUnset(req: NextRequest, res: NextResponse): void {
    if (req.cookies.get(SESSION_COOKIE_NAME)?.value == null) {
        const sessionId = crypto.randomUUID()

        res.cookies.set({
            name: SESSION_COOKIE_NAME,
            value: sessionId,
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
        })
    }
}

export async function getSessionId(): Promise<string | null> {
    const cookieStore = await cookies()

    return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null
}
