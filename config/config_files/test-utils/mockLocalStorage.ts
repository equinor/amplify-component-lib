import { vi } from 'vitest';

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

vi.stubGlobal('localStorage', localStorageMock);
