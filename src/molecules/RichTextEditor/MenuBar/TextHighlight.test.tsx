import {
  RichTextEditor,
  RichTextEditorProps,
} from 'src/molecules/RichTextEditor/RichTextEditor';
import { RichTextEditorFeatures } from 'src/molecules/RichTextEditor/RichTextEditor.types';
import {
  renderWithProviders,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

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
      extendFeatures={[RichTextEditorFeatures.HIGHLIGHT]}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.HIGHLIGHT,
      ]}
    />
  );

  const input = screen.queryByTestId('highlight-button');

  expect(input).not.toBeInTheDocument();
});

test('Highlights text when button is clicked', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      extendFeatures={[RichTextEditorFeatures.HIGHLIGHT]}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  // Wait for tiptap init
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = userEvent.setup();

  const button = await screen.findByTestId('highlight-button');

  expect(button).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));
  await user.click(button);

  await waitFor(
    () =>
      expect(props.onChange).toHaveBeenCalledWith('<p><mark>test</mark></p>'),
    { timeout: 5000 }
  );
});
