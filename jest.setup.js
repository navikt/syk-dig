import 'next';
import '@testing-library/jest-dom/extend-expect';

import { toHaveNoViolations } from 'jest-axe';
import { Modal } from '@navikt/ds-react';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';

import { server } from './src/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('@navikt/next-auth-wonderwall', () => ({
    validateAzureToken: () => Promise.resolve(true),
}));

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        runtimeEnv: 'test',
    },
}));

Modal.setAppElement(document.createElement('div'));

mockRouter.useParser(createDynamicRouteParser(['/utenlandsk/[oppgaveId]']));

expect.extend(toHaveNoViolations);

process.env.DEBUG_PRINT_LIMIT = '30000';
