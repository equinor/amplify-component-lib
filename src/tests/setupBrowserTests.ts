import { cleanup } from '@testing-library/react';

import { handlers } from './mockHandlers';

import { setupWorker } from 'msw/browser';
import { beforeEach } from 'vitest';

const worker = setupWorker(...handlers);

beforeEach(() => {
  cleanup();
});

export { worker };
