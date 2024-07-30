import { cleanup } from '@testing-library/react';

import { handlers } from 'src/tests/mockHandlers';

import { setupServer } from 'msw/node';
import { afterEach, beforeAll } from 'vitest';

import '@testing-library/jest-dom';
import 'jest-styled-components';

const server = setupServer(...handlers);

beforeAll(() => {
  vi.stubEnv('VITE_IS_MOCK', 'true');
  server.listen({ onUnhandledRequest: 'error' });
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export { server };
