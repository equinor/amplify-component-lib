import { faker } from '@faker-js/faker';
import { fireEvent, waitFor, within } from '@testing-library/dom';

import { mergeDefaults } from './custom-extensions/mergeDefaults';
import { RichTextEditor, RichTextEditorProps } from './RichTextEditor';
import { RichTextEditorFeatures } from './RichTextEditor.types';
import { getVariantIcon } from 'src/atoms/utils/forms';
import type { AmplifyKitOptions } from 'src/molecules/RichTextEditor/custom-extensions/AmplifyKit';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

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
  renderWithProviders(<RichTextEditor {...props} value={`<p>${fish}</p>`} />);

  await waitFor(() => expect(screen.getByText(fish)).toBeInTheDocument(), {
    timeout: 1000,
  });
});

test('Throws error if providing RichTextEditorFeature.IMAGES but not an image handler', () => {
  const props = fakeProps();
  expect(() =>
    renderWithProviders(
      <RichTextEditor
        {...props}
        extendFeatures={[RichTextEditorFeatures.IMAGES]}
      />
    )
  ).toThrowError();
});

test("Calls 'onChange' when inputting text", async () => {
  const props = fakeProps();

  const { container } = renderWithProviders(
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

  const { container } = renderWithProviders(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.TEXT_COLOR]} />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const colorInput = container.querySelector('input') as Element;

  fireEvent.input(colorInput, { target: { value: '#333333' } });
});

test('Calls onImageUpload as expected', async () => {
  const props = fakeProps(true);

  const { container } = renderWithProviders(
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

  renderWithProviders(
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

  renderWithProviders(
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

  renderWithProviders(
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

test('Throws error if trying to use both remove strategies', () => {
  console.error = vi.fn();

  const props = fakeProps();
  expect(() =>
    renderWithProviders(
      <RichTextEditor
        {...props}
        onRemovedImagesChange={vi.fn()}
        onImageRemove={vi.fn()}
      />
    )
  ).toThrowError();
});

test('Shows label / meta / helper as expected', async () => {
  const props = fakeProps(true);
  const label = faker.airline.airline().name;
  const meta = faker.commerce.department();
  const helper = faker.food.fruit();

  renderWithProviders(
    <RichTextEditor {...props} label={label} meta={meta} helperText={helper} />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByText(meta)).toBeInTheDocument();
  expect(screen.getByText(helper)).toBeInTheDocument();
});

test(`Shows variant icon as expected`, async () => {
  const props = fakeProps(true);
  const helperText = faker.animal.fish();

  renderWithProviders(
    <RichTextEditor {...props} variant="error" helperText={helperText} />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const variantIcon = within(
    screen.getByText(helperText).parentElement!
  ).getByTestId('eds-icon-path');
  expect(variantIcon).toHaveAttribute(
    'd',
    getVariantIcon('error').svgPathData as string
  );
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
