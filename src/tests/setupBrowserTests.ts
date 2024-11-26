import { cleanup } from '@testing-library/react';

import { handlers } from 'src/tests/mockHandlers';

import { setupWorker } from 'msw/browser';
import { afterEach, beforeAll, beforeEach } from 'vitest';

import 'vitest-browser-react';

const worker = setupWorker(...handlers);

beforeAll(() => {
  worker.start({
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
