import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { test, vi } from 'vitest';

const customRender = (ui: React.ReactElement, options?: any) =>
  render(ui, options);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, userEvent };

// re-export vitest stuff
export { test, vi };

// Add ResizeObserver
global.ResizeObserver = require('resize-observer-polyfill');

// Mock localStorage
const localStorageMock = (function () {
  let store: any = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
