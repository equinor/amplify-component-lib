import { handlers } from 'src/tests/mockHandlers';

import { setupWorker } from 'msw/browser';
import { afterEach, beforeAll } from 'vitest';

import 'vitest-browser-react';

const worker = setupWorker(...handlers);

beforeAll(() => {
  worker.start({
    onUnhandledRequest: (req, print) => {
      if (req.url.includes('api')) print.error();
      return;
    },
  });
});

afterEach(() => {
  worker.resetHandlers();
});

export { worker };
