import { cleanup } from '@testing-library/react';

import { handlers } from './mockHandlers';

import { setupServer } from 'msw/node';
import { afterEach, beforeAll } from 'vitest';

import '@testing-library/jest-dom';
import 'jest-styled-components';

const server = setupServer(...handlers);

beforeAll(() => {
  vi.stubEnv('VITE_IS_MOCK', 'true');
  vi.stubEnv('VITE_NAME', 'Amplify components');
  vi.stubEnv('VITE_API_CLIENT_ID', 'fake-id');
  server.listen({
    onUnhandledRequest: (req, print) => {
      if (req.url.includes('api') && req.url.includes('https')) print.error();
      return;
    },
  });
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
  // JSDOM has no native popover state or :popover-open selector support.
  const openPopovers = new WeakSet<Element>();
  const nativeMatches = Element.prototype.matches;
  vi.spyOn(Element.prototype, 'matches').mockImplementation(function (
    this: Element,
    selector: string
  ) {
    return selector === ':popover-open'
      ? openPopovers.has(this)
      : nativeMatches.call(this, selector);
  });
  HTMLElement.prototype.showPopover = vi.fn(function (this: HTMLElement) {
    openPopovers.add(this);
  });
  HTMLElement.prototype.hidePopover = vi.fn(function (this: HTMLElement) {
    openPopovers.delete(this);
  });
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export { server };
