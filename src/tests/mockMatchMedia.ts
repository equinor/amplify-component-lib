import { vi } from 'vitest';
const mockMatchMedia = (query: string) => {
  return {
    matches: import.meta.env.DARK === 'true',
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
};

vi.stubGlobal('matchMedia', mockMatchMedia);
