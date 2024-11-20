import { handlers } from 'src/tests/mockHandlers';

import { setupWorker } from 'msw/browser';
import { afterEach, beforeAll } from 'vitest';

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

afterEach(() => {
  worker.resetHandlers();
});

export { worker };
