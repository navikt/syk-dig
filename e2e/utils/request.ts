import { Page, Request } from '@playwright/test'

export async function waitForGraphQL(page: Page, operationName: string): Promise<Request> {
    return await page.waitForRequest((req) => {
        if (req.url().includes('api/graphql') && req.method() === 'POST') {
            const postData = req.postDataJSON()
            if (!postData) return false
            return postData.operationName === operationName
        }
        return false
    })
}

export async function clickAndWait(click: Promise<void>, waiter: ReturnType<typeof waitForGraphQL>): Promise<Request> {
    const [, request] = await Promise.all([click, waiter])

    return request
}
