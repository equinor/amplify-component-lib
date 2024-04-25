import { faker } from '@faker-js/faker';
import { fireEvent, waitFor } from '@testing-library/dom';

import RichTextEditor, { RichTextEditorProps } from './RichTextEditor';
import {
  DEFAULT_FEATURES,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { render, screen, userEvent } from 'src/tests/test-utils';

function fakeProps(withImage = false): RichTextEditorProps {
  return {
    value: `<p>${faker.animal.fish()}</p>`,
    onChange: vi.fn(),
    onImageUpload: withImage ? vi.fn() : undefined,
  };
}

function randomFeatures(amount: number): RichTextEditorFeatures[] {
  return faker.helpers.arrayElements(DEFAULT_FEATURES, amount);
}

test('Shows text that is input', async () => {
  const props = fakeProps(true);
  const fish = faker.animal.fish();
  render(<RichTextEditor {...props} value={`<p>${fish}</p>`} />);

  await waitFor(() => expect(screen.getByText(fish)).toBeInTheDocument(), {
    timeout: 1000,
  });
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

  const { container } = render(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let textInput = container.querySelector('.tiptap');

  expect(textInput).not.toBeNull();

  textInput = textInput!;

  const randomFish = faker.animal.fish();
  fireEvent.change(textInput, {
    target: { textContent: randomFish },
  });

  expect(screen.getByText(randomFish)).toBeInTheDocument();
});

test('Setting color works as expected', async () => {
  const props = fakeProps();

  const { container } = render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.TEXT_COLOR]} />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const colorInput = container.querySelector('input') as Element;

  fireEvent.input(colorInput, { target: { value: '#333333' } });
});

test('Calls onImageUpload as expected', async () => {
  const props = fakeProps(true);

  const { container } = render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );
  const user = userEvent.setup();

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

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

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const uploadButton = screen.getByRole('button');

  await user.click(uploadButton);
});

test('Creating table works as expected', async () => {
  const props = fakeProps();

  render(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.TABLE]} />
  );
  const user = userEvent.setup();

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const tableButton = screen.getByRole('button');

  await user.click(tableButton);

  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('Images work as expected', async () => {
  const randomUrl =
    'https://images.unsplash.com/photo-1682687221363-72518513620e';
  const alt = faker.animal.crocodilia();
  const props = fakeProps(true);

  render(
    <RichTextEditor
      {...props}
      value={`<img src="${randomUrl}" alt="${alt}" />`}
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByRole('img')).toHaveAttribute('src', randomUrl);

  expect(screen.getByRole('img')).toHaveAttribute('alt', alt);
});
