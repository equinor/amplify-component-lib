import {
  RichTextEditor,
  RichTextEditorFeatures,
  RichTextEditorProps,
} from 'src/molecules';
import { renderWithProviders, screen } from 'src/tests/browsertest-utils';

function fakeProps(): RichTextEditorProps {
  return {
    value: `<p>test</p>`,
    onChange: vi.fn(),
  };
}

test('Hides button if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.HIGHLIGHT,
      ]}
    />
  );

  const input = screen.queryByTestId('highlight-button');

  expect(input).not.toBeInTheDocument();
});
