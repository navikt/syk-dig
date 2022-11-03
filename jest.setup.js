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

window.ResizeObserver = jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
}));

Modal.setAppElement(document.createElement('div'));

mockRouter.useParser(createDynamicRouteParser(['/oppgave/[oppgaveId]']));

expect.extend(toHaveNoViolations);

process.env.DEBUG_PRINT_LIMIT = 50000;
