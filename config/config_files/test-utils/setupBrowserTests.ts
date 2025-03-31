import { cleanup } from '@testing-library/react';

import { handlers as customHandlers } from './customMock';
import { handlers as samHandlers } from './samMock';

import { setupWorker } from 'msw/browser';
import { beforeEach } from 'vitest';

const worker = setupWorker(
  ...customHandlers,
  ...samHandlers,
);



beforeEach(() => {
  cleanup();
});

export { worker };