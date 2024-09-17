import { Page, Request } from '@playwright/test'

export async function waitForGraphQL(page: Page): Promise<Request> {
    return await page.waitForRequest((req) => {
        return req.url().includes('api/graphql') && req.method() === 'POST'
    })
}

export async function clickAndWait(click: Promise<void>, waiter: ReturnType<typeof waitForGraphQL>): Promise<Request> {
    const [, request] = await Promise.all([click, waiter])

    return request
}
