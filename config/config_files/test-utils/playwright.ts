import { expect, test as base } from '@playwright/test';

import { handlers as appHandlers } from './mock';
import { handlers as portalHandlers } from './portalMock';

import { http } from 'msw';
import type { MockServiceWorker } from 'playwright-msw';
import { createWorkerFixture } from 'playwright-msw';

const test = base.extend<{
  worker: MockServiceWorker;
  http: typeof http;
}>({
  worker: createWorkerFixture([...appHandlers, ...portalHandlers]),
  http,
});

export { expect, test };
