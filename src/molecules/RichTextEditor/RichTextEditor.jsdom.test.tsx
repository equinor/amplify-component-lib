import { faker } from '@faker-js/faker';

import { RichTextEditor, RichTextEditorProps } from './RichTextEditor';
import { RichTextEditorFeatures } from './RichTextEditor.types';
import { colors } from 'src/atoms';
import {
  VARIANT_COLORS,
  VARIANT_HELPER_TEXT_COLORS,
} from 'src/atoms/style/colors';
import { renderWithProviders, screen } from 'src/tests/jsdomtest-utils';

function fakeProps(withImage = false): RichTextEditorProps {
  return {
    value: `<p>${faker.animal.fish()}</p>`,
    onChange: vi.fn(),
    onImageUpload: withImage ? vi.fn() : undefined,
  };
}

test('Creating table with highlight works as expected', async () => {
  const props = fakeProps();

  renderWithProviders(
    <RichTextEditor
      {...props}
      features={[RichTextEditorFeatures.TABLE]}
      highlighted={true}
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const editor = screen.getByTestId('richtext-editor').querySelector('.tiptap');

  expect(editor).toHaveStyle(
    `box-shadow: inset 0 -2px ${colors.dataviz.darkblue.darker}`
  );
});

test('Variant gets expected colors', async () => {
  const props = fakeProps();

  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
      variant="error"
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const editor = screen.getByTestId('richtext-editor').querySelector('.tiptap');

  expect(editor).toHaveStyle(
    `box-shadow: inset 0 -2px ${VARIANT_COLORS['error']}`
  );
});

test('Helper text gets expected colors', async () => {
  const props = fakeProps();

  const helper = faker.animal.dog();

  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
      variant="error"
      helperText={helper}
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(screen.getByText(helper)).toHaveStyleRule(
    'color',
    VARIANT_HELPER_TEXT_COLORS['error']
  );
});

test('Not setting maxHeight adds height: 100% on wrapper', async () => {
  const props = fakeProps();

  const label = faker.vehicle.vehicle();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
      label={label}
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const wrapper = screen.getByText(label).parentElement!.parentElement!;

  expect(wrapper).toHaveStyle('height: 100%');
});

test('Setting maxHeight removes height: 100% on wrapper', async () => {
  const props = fakeProps();

  const label = faker.vehicle.vehicle();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
      label={label}
      maxHeight="400px"
    />
  );

  // Wait for tip tap to initialize
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const wrapper = screen.getByText(label).parentElement!.parentElement!;

  expect(wrapper).not.toHaveStyle('height: 100%');
});
