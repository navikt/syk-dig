import 'next';
import '@testing-library/jest-dom/extend-expect';

import { server } from './src/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('@navikt/next-auth-wonderwall', () => ({
    validateAzureToken: () => Promise.resolve(true),
}));
