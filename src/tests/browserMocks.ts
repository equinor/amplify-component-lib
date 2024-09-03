import { vi } from 'vitest';
import { Mock } from 'vitest';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

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

// Mock resize observer
const resizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', resizeObserver);

// Mock interaction observer
const MockIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal(`IntersectionObserver`, MockIntersectionObserver);

// Mock match media
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

// Mock globals used by RichTextEditor

export class ClipboardDataMock {
  getData: Mock;
  setData: Mock;

  constructor() {
    this.getData = vi.fn();
    this.setData = vi.fn();
  }
}

export class ClipboardEventMock extends Event {
  clipboardData: ClipboardDataMock;

  constructor(type: string, options?: EventInit) {
    super(type, options);
    this.clipboardData = new ClipboardDataMock();
  }
}

export class DataTransferMock {
  data: Record<string, string>;

  constructor() {
    this.data = {};
  }

  setData(format: string, data: string): void {
    this.data[format] = data;
  }

  getData(format: string): string {
    return this.data[format] || '';
  }
}

export class DragEventMock extends Event {
  dataTransfer: DataTransferMock;

  constructor(type: string, options?: EventInit) {
    super(type, options);
    this.dataTransfer = new DataTransferMock();
  }
}

export function mockGetBoundingClientRect(): DOMRect {
  const rec = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
  return { ...rec, toJSON: () => rec };
}

export class FakeDOMRectList extends Array<DOMRect> implements DOMRectList {
  item(index: number): DOMRect | null {
    return this[index];
  }
}
vi.stubGlobal('ClipboardEvent', ClipboardEventMock);
vi.stubGlobal('ClipboardData', ClipboardDataMock);
vi.stubGlobal('DragEvent', DragEventMock);

document.elementFromPoint = (): null => null;
HTMLElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = mockGetBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
