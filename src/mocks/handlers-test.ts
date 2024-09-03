import { RequestHandler } from 'msw'

/**
 * These are only used in MSW during tests, normally we use the real API routes in next
 */
export const handlers: RequestHandler[] = []
