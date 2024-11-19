import { faker } from '@faker-js/faker';
import { fireEvent, waitFor } from '@testing-library/dom';

import { mergeDefaults } from './custom-extensions/mergeDefaults';
import { RichTextEditor, RichTextEditorProps } from './RichTextEditor';
import { RichTextEditorFeatures } from './RichTextEditor.types';
import type { AmplifyKitOptions } from 'src/molecules/RichTextEditor/custom-extensions/AmplifyKit';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeProps(withImage = false): RichTextEditorProps {
  return {
    value: `<p>${faker.animal.fish()}</p>`,
    onChange: vi.fn(),
    onImageUpload: withImage ? vi.fn() : undefined,
  };
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

  const uploadButton = screen.getByTestId('add-image-button');
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

  const tableButton = screen.getByTestId('add-table-button');
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

describe('Editor defaults can be merged', () => {
  const uniqe: Partial<AmplifyKitOptions> = {
    bold: { HTMLAttributes: { class: 'bolder' } },
    bulletList: { HTMLAttributes: { class: 'ammo-list' } },
  };

  const removedExtensions: Partial<AmplifyKitOptions> = {
    bold: false,
  };

  const unconfigured: Partial<AmplifyKitOptions> = {
    bold: undefined,
    bulletList: undefined,
  };

  it('should return defaults when options is undefined', () => {
    const defaults = uniqe;
    const result = mergeDefaults({ options: undefined, defaults });
    expect(result).toEqual(defaults);
    const resultEmpty = mergeDefaults({ options: {}, defaults });
    expect(resultEmpty).toEqual(defaults);
  });

  it('should merge options and defaults correctly', () => {
    const defaults = uniqe;
    const options = removedExtensions;
    const result = mergeDefaults({ options, defaults });
    expect(result).toEqual({
      bold: options.bold,
      bulletList: defaults.bulletList,
    });
  });

  it('should overwrite defaults with options', () => {
    const defaults = unconfigured;
    const options = removedExtensions;
    const result = mergeDefaults({ options, defaults });
    expect(result.bold).toBe(false);
  });

  it('should not overwrite defaults when property is undefined', () => {
    const defaults = uniqe;
    const options = unconfigured;
    const result = mergeDefaults({ options, defaults });
    expect(result).toEqual(defaults);
  });

  it('should merge defaults and options when both are objects', () => {
    const defaults = unconfigured;
    const options = uniqe;
    const result = mergeDefaults({ options, defaults });
    expect(result).toEqual(options);
  });
});
