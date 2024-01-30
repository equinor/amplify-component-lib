import { faker } from '@faker-js/faker';

import RichTextDisplay from './RichTextDisplay';
import {
  ClipboardDataMock,
  ClipboardEventMock,
  DragEventMock,
  FakeDOMRectList,
  mockGetBoundingClientRect,
} from 'src/tests/mockRichTextEditor';
import { render, screen } from 'src/tests/test-utils';

vi.stubGlobal('ClipboardEvent', ClipboardEventMock);
vi.stubGlobal('ClipboardData', ClipboardDataMock);
vi.stubGlobal('DragEvent', DragEventMock);

document.elementFromPoint = (): null => null;
HTMLElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = mockGetBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();

test('RichTextDisplay shows value as expected', async () => {
  const randomText = faker.animal.dog();
  render(<RichTextDisplay value={`<p>${randomText}</p>`} />);

  expect(screen.getByText(randomText)).toBeInTheDocument();
});
