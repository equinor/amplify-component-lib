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

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByText(randomText)).toBeInTheDocument();
});

test('Image read token prop works as expected', async () => {
  const randomUrl =
    'https://images.unsplash.com/photo-1682687221363-72518513620e';
  const randomToken = 'sv=2023-08-03';

  render(
    <RichTextDisplay
      value={`<img src="${randomUrl}"/>`}
      imgReadToken={randomToken}
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    `${randomUrl}?${randomToken}`
  );
});

test('Shows content when sending in new value', async () => {
  const content = faker.animal.dog();
  const { rerender } = render(<RichTextDisplay value={content} />);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByText(content)).toBeInTheDocument();

  const newContent = faker.airline.airplane().name;
  rerender(<RichTextDisplay value={newContent} />);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByText(newContent)).toBeInTheDocument();

  expect(screen.queryByText(content)).not.toBeInTheDocument();
});
