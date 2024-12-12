import { faker } from '@faker-js/faker';

import { RichTextEditor, RichTextEditorProps } from './RichTextEditor';
import { RichTextEditorFeatures } from './RichTextEditor.types';
import { colors } from 'src/atoms';
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
