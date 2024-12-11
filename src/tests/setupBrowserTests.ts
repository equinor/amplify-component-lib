import { cleanup } from '@testing-library/react';

import { handlers } from './mockHandlers';

import { setupWorker } from 'msw/browser';
import { afterEach, beforeAll, beforeEach } from 'vitest';

const worker = setupWorker(...handlers);

beforeAll(() => {
  worker.start({
    quiet: true,
    onUnhandledRequest: (req, print) => {
      if (req.url.includes('api') && req.url.includes('https')) print.error();
      return;
    },
  });
});

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  worker.resetHandlers();
});

export { worker };
