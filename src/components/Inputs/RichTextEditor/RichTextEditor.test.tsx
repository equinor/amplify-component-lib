import { faker } from '@faker-js/faker';
import { fireEvent } from '@testing-library/dom';

import RichTextEditor, { RichTextEditorProps } from './RichTextEditor';
import {
  DEFAULT_FEATURES,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import {
  ClipboardDataMock,
  ClipboardEventMock,
  DragEventMock,
  FakeDOMRectList,
  mockGetBoundingClientRect,
} from 'src/tests/mockRichTextEditor';
import { render, screen, userEvent } from 'src/tests/test-utils';

vi.stubGlobal('ClipboardEvent', ClipboardEventMock);
vi.stubGlobal('ClipboardData', ClipboardDataMock);
vi.stubGlobal('DragEvent', DragEventMock);

document.elementFromPoint = (): null => null;
HTMLElement.prototype.getBoundingClientRect = mockGetBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = mockGetBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();

function fakeProps(withImage = false): RichTextEditorProps {
  return {
    value: faker.animal.fish(),
    onChange: vi.fn(),
    onImageUpload: withImage ? vi.fn() : undefined,
  };
}

function randomFeatures(amount: number): RichTextEditorFeatures[] {
  return faker.helpers.arrayElements(DEFAULT_FEATURES, amount);
}

test('Shows text that is input', async () => {
  const props = fakeProps(true);
  render(<RichTextEditor {...props} />);

  expect(screen.getByText(props.value || '')).toBeInTheDocument();
});

test('Throws error if providing RichTextEditorFeature.IMAGES but not an image handler', () => {
  console.error = vi.fn();

  const props = fakeProps();
  expect(() =>
    render(
      <RichTextEditor
        {...props}
        extendFeatures={[RichTextEditorFeatures.IMAGES]}
      />
    )
  ).toThrowError();
});

test("Throws error if specifying 'features' and 'extendFeatures' / 'removeFeatures'", () => {
  console.error = vi.fn();

  const props = fakeProps();

  expect(() =>
    render(
      <RichTextEditor
        {...props}
        features={randomFeatures(5)}
        extendFeatures={randomFeatures(4)}
      />
    )
  ).toThrowError();

  expect(() =>
    render(
      <RichTextEditor
        {...props}
        features={randomFeatures(5)}
        removeFeatures={randomFeatures(4)}
      />
    )
  ).toThrowError();
});

test("Throws error if 'features' is empty", () => {
  console.error = vi.fn();

  const props = fakeProps();

  expect(() =>
    render(<RichTextEditor {...props} removeFeatures={DEFAULT_FEATURES} />)
  ).toThrowError();
  expect(() =>
    render(<RichTextEditor {...props} features={[]} />)
  ).toThrowError();
});

test("Calls 'onChange' when inputting text", async () => {
  const props = fakeProps();

  const { container } = render(<RichTextEditor {...props} />);

  let textInput = container.querySelector('.tiptap');

  expect(textInput).not.toBeNull();

  textInput = textInput as Element;

  const randomFish = faker.animal.fish();
  fireEvent.change(textInput, {
    target: { textContent: randomFish },
  });

  expect(screen.getByText(randomFish)).toBeInTheDocument();
});

test('Inputting link works as expected with valid link', async () => {
  const props = fakeProps();
  render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.LINKS]} />
  );

  const user = userEvent.setup();

  const linkButton = screen.getAllByRole('button')[0];

  await user.click(linkButton);

  const textField = screen.getByRole('textbox');

  const randomUrl = faker.internet.url();

  await user.type(textField, randomUrl);

  const saveButton = screen.getByRole('button', { name: /save/i });

  await user.click(saveButton);

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

test('Inputting link works as expected with invalid link', async () => {
  const props = fakeProps();
  render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.LINKS]} />
  );

  const user = userEvent.setup();

  const linkButton = screen.getAllByRole('button')[0];

  await user.click(linkButton);

  const randomUrl = faker.animal.rabbit();

  const textField = screen.getByRole('textbox');

  await user.type(textField, randomUrl);

  const saveButton = screen.getByRole('button', { name: /save/i });

  await user.click(saveButton);

  expect(textField).toBeInTheDocument();

  await user.clear(textField);

  await user.type(textField, faker.internet.url());

  await user.click(saveButton);

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});

test('Unsetting link works', async () => {
  const props = fakeProps();
  const randomLink = faker.internet.url();
  const value = `<p>This text contains a <a target="_blank" rel="noopener noreferrer nofollow" href="${randomLink}">link</a></p>`;
  render(
    <RichTextEditor
      {...props}
      value={value}
      features={[RichTextEditorFeatures.LINKS]}
    />
  );

  const user = userEvent.setup();

  await user.dblClick(screen.getByText(/this text contains a/i));

  const unsetLinkButton = screen.getAllByRole('button')[1];

  await user.click(unsetLinkButton);
});

test('Setting color works as expected', async () => {
  const props = fakeProps();

  const { container } = render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.TEXT_COLOR]} />
  );

  const colorInput = container.querySelector('input') as Element;

  fireEvent.input(colorInput, { target: { value: '#333333' } });
});

test('Calls onImageUpload as expected', async () => {
  const props = fakeProps(true);

  const { container } = render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );
  const user = userEvent.setup();

  const uploadInput = container.querySelector('input') as HTMLElement;

  const fakeFile = new File(
    ['hei'],
    `${faker.animal.dog()}.${faker.system.fileExt('image/png')}`,
    { type: 'image/png' }
  );
  await user.upload(uploadInput, fakeFile);

  expect(props.onImageUpload).toHaveBeenCalledWith(fakeFile);
});

test('Open file dialog', async () => {
  const props = fakeProps(true);

  render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );
  const user = userEvent.setup();

  const uploadButton = screen.getByRole('button');

  await user.click(uploadButton);
});
