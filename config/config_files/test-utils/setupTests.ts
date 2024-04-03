import { IconData } from '@equinor/eds-icons';
import { cleanup, within } from '@testing-library/react';
import { handlers as appHandlers } from './mock';
import { handlers as portalHandlers } from './portalMock';
import { MatcherResult } from './vitest';

import { setupServer } from 'msw/node';
import { afterEach, beforeAll } from 'vitest';

import '@testing-library/jest-dom';

const server = setupServer(...appHandlers, ...portalHandlers);

beforeAll(() => {
  vi.stubEnv('VITE_IS_MOCK', 'true');
  server.listen({ onUnhandledRequest: 'error' });
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();

  expect.extend({
    toContainEDSIcon(received: HTMLElement, expected: IconData): MatcherResult {
      const svgPaths = within(received).getAllByTestId('eds-icon-path');
      const pass = !!svgPaths.find(
        (p) => p.getAttribute('d') === expected.svgPathData
      );
      const message = () =>
        `Received element ${
          pass
            ? 'contains an EDS icon with name:'
            : 'does not contain an EDS icon with name:'
        } ${expected.name}`;
      return {
        pass,
        message,
      };
    },
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());

export { server };
