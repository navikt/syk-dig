import 'next';
import '@testing-library/jest-dom/extend-expect';

import { toHaveNoViolations } from 'jest-axe';

import { server } from './src/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('@navikt/next-auth-wonderwall', () => ({
    validateAzureToken: () => Promise.resolve(true),
}));

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        runtimeEnv: 'test',
    },
}));

expect.extend(toHaveNoViolations);
