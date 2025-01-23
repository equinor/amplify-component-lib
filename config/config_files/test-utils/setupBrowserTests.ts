import { cleanup } from '@testing-library/react';

import { handlers as customHandlers } from './customMock';
import { handlers as samHandlers } from './samMock';

import { setupWorker } from 'msw/browser';
import { afterEach, beforeAll, beforeEach } from 'vitest';

const worker = setupWorker(
  ...customHandlers,
  ...samHandlers,
);

beforeAll(async () => {
  await worker.start({
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