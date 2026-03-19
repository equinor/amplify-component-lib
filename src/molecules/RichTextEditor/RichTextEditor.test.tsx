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
    onImageRemove: withImage ? vi.fn() : undefined,
  };
}

async function waitForEditorReady(container: HTMLElement) {
  await waitFor(() => {
    const editor = container.querySelector('.tiptap');
    expect(editor).not.toBeNull();
    expect(editor).toHaveAttribute('contenteditable', 'true');
  });
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
  await waitForEditorReady(container);

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
  await waitForEditorReady(container);

  const colorInput = container.querySelector('input') as Element;

  fireEvent.input(colorInput, { target: { value: '#333333' } });
});

test('Calls onImageUpload as expected', async () => {
  const props = fakeProps(true);

  const { container } = renderWithProviders(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );
  const user = userEvent.setup();
  await waitForEditorReady(container);

  expect(props.onImageRemove).not.toHaveBeenCalled();
  expect(props.onImageUpload).not.toHaveBeenCalled();

  const uploadInput = container.querySelector('input') as HTMLElement;

  const fakeFile = new File(
    ['hei'],
    `${faker.animal.dog()}.${faker.system.fileExt('image/png')}`,
    { type: 'image/png' }
  );
  await user.upload(uploadInput, fakeFile);

  expect(props.onImageUpload).toHaveBeenCalledExactlyOnceWith(fakeFile);
});

test('Open file dialog', async () => {
  const props = fakeProps(true);

  const { container } = renderWithProviders(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );
  const user = userEvent.setup();
  await waitForEditorReady(container);

  const uploadButton = screen.getByTestId('add-image-button');
  await user.click(uploadButton);
});

test('Creating table works as expected', async () => {
  const props = fakeProps();

  const { container } = renderWithProviders(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.TABLE]} />
  );
  const user = userEvent.setup();
  await waitForEditorReady(container);

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
  await waitFor(() => {
    expect(screen.getByRole('img')).toHaveAttribute('src', randomUrl);
    expect(screen.getByRole('img')).toHaveAttribute('alt', alt);
  });
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

  const { container } = renderWithProviders(
    <RichTextEditor {...props} label={label} meta={meta} helperText={helper} />
  );
  await waitForEditorReady(container);

  expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByText(meta)).toBeInTheDocument();
  expect(screen.getByText(helper)).toBeInTheDocument();
});

test(`Shows variant icon as expected`, async () => {
  const props = fakeProps(true);
  const helperText = faker.animal.fish();

  const { container } = renderWithProviders(
    <RichTextEditor {...props} variant="error" helperText={helperText} />
  );
  await waitForEditorReady(container);

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

describe('Image upload behavior (EditorProvider)', () => {
  test('Normal typing does not trigger image upload', async () => {
    const onImageUpload = vi.fn();
    const onChange = vi.fn();
    const props = fakeProps(true);
    props.onImageUpload = onImageUpload;
    props.onChange = onChange;

    const { container } = renderWithProviders(
      <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
    );
    const user = userEvent.setup();
    await waitForEditorReady(container);

    const textEditor = container.querySelector('.tiptap') as HTMLElement;
    expect(textEditor).not.toBeNull();

    // Type text using userEvent to properly trigger Tiptap updates
    await user.type(textEditor, 'test text');
    expect(onChange).toHaveBeenCalled();
    onChange.mockClear();

    await user.type(textEditor, ' more text');
    expect(onChange).toHaveBeenCalled();
    onChange.mockClear();

    await user.type(textEditor, ' even more');
    expect(onChange).toHaveBeenCalled();

    // onImageUpload should NOT have been called just from typing
    expect(onImageUpload).not.toHaveBeenCalled();
  });

  test('Multiple images with the same src render correctly', async () => {
    const onImageUpload = vi.fn().mockResolvedValue({
      src: 'https://example.com/uploaded-image.png',
      alt: '',
    });
    const props = fakeProps(true);
    props.onImageUpload = onImageUpload;

    const sameImageUrl =
      'https://images.unsplash.com/photo-1682687221363-72518513620e';

    const { container } = renderWithProviders(
      <RichTextEditor
        {...props}
        value={`<p><img src="${sameImageUrl}" /><img src="${sameImageUrl}" /><img src="${sameImageUrl}" /></p>`}
        features={[RichTextEditorFeatures.IMAGES]}
      />
    );
    // Wait until all three images are visible and have the expected src
    await waitFor(() => {
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThanOrEqual(3);
      images.forEach((img) => {
        expect(img.src).toBe(sameImageUrl);
      });
    });
  });

  test('onRemovedImagesChange is not called when no images are deleted', async () => {
    const onRemovedImagesChange = vi.fn();
    const onChange = vi.fn();
    const props = fakeProps();
    props.onImageUpload = vi.fn();
    props.onChange = onChange;
    props.onRemovedImagesChange = onRemovedImagesChange;

    const { container } = renderWithProviders(
      <RichTextEditor
        {...props}
        value="<p>Some text</p>"
        features={[RichTextEditorFeatures.IMAGES]}
      />
    );
    const user = userEvent.setup();
    await waitForEditorReady(container);

    const textEditor = container.querySelector('.tiptap') as HTMLElement;

    // Type text using userEvent to properly trigger Tiptap updates
    await user.type(textEditor, 'more ');
    expect(onChange).toHaveBeenCalled();

    // onRemovedImagesChange should NOT be called when typing without deleting images
    expect(onRemovedImagesChange).not.toHaveBeenCalled();
  });

  test('onImageRemove is called exactly once even when editor updates happen during a slow removal', async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1682687221363-72518513620e';

    // Controlled promise lets us keep onImageRemove pending while typing occurs
    let resolveRemove!: () => void;
    const removePromise = new Promise<void>((resolve) => {
      resolveRemove = resolve;
    });
    const onImageRemove = vi.fn(() => removePromise);
    const onChange = vi.fn();

    const { container, rerender } = renderWithProviders(
      <RichTextEditor
        value={`<p><img src="${imageUrl}" /></p>`}
        onChange={onChange}
        onImageUpload={vi.fn()}
        onImageRemove={onImageRemove}
        features={[RichTextEditorFeatures.IMAGES]}
      />
    );
    const user = userEvent.setup();
    await waitForEditorReady(container);

    // Remove the image by updating the value prop — triggers useEffect → setContent → onUpdate → handleImageCheck
    // handleImageCheck detects the image is gone and calls onImageRemove (which is now blocked on removePromise)
    rerender(
      <RichTextEditor
        value="<p></p>"
        onChange={onChange}
        onImageUpload={vi.fn()}
        onImageRemove={onImageRemove}
        features={[RichTextEditorFeatures.IMAGES]}
      />
    );

    await waitFor(() => {
      expect(onImageRemove).toHaveBeenCalledOnce();
    });
    expect(onImageRemove).toHaveBeenCalledOnce();

    // Type while onImageRemove is still pending — this triggers another handleImageCheck call,
    // which must set needsRecheck instead of running concurrently
    const textEditor = container.querySelector('.tiptap') as HTMLElement;
    await user.type(textEditor, 'x');

    // Unblock onImageRemove — the recheck fires but must NOT call onImageRemove again,
    // since the image is now in deletedImages
    resolveRemove();

    await waitFor(() => {
      expect(onImageRemove).toHaveBeenCalledOnce();
    });
  });
});
