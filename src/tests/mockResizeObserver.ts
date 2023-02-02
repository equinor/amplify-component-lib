import { vi } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
vi.stubGlobal('ResizeObserver', require('resize-observer-polyfill'));
