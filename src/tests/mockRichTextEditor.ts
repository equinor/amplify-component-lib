import { Mock } from 'vitest';

export class ClipboardDataMock {
  getData: Mock<any, [string]>;
  setData: Mock<any, [string, string]>;

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
  data: { [key: string]: string };

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
