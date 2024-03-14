import { handlers as appHandlers } from './mock';
import { handlers as portalHandlers } from './portalMock';

import { setupServer } from 'msw/node';
import { afterEach, beforeAll } from 'vitest';

import '@testing-library/jest-dom';

const server = setupServer(...appHandlers, ...portalHandlers);

beforeAll(() => {
  vi.stubEnv('VITE_IS_MOCK', 'true');
  server.listen({ onUnhandledRequest: 'error' });
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

export { server };
