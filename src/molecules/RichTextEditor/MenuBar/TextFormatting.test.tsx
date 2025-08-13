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

test('Able to click bold+italic buttons', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const bold = await screen.findByTestId('bold-button');
  const italic = await screen.findByTestId('italic-button');

  await user.tripleClick(screen.getByText('test'));

  expect(bold).toBeInTheDocument();
  expect(italic).toBeInTheDocument();

  await user.click(bold);

  await waitFor(
    () =>
      expect(props.onChange).toHaveBeenNthCalledWith(
        1,
        '<p><strong>test</strong></p>'
      ),
    { timeout: 2000 }
  );

  await user.click(bold);
  await waitFor(
    () => expect(props.onChange).toHaveBeenNthCalledWith(2, '<p>test</p>'),
    { timeout: 2000 }
  );

  await user.click(italic);

  await waitFor(
    () =>
      expect(props.onChange).toHaveBeenNthCalledWith(3, '<p><em>test</em></p>'),
    { timeout: 2000 }
  );

  await user.click(italic);
  await waitFor(
    () => expect(props.onChange).toHaveBeenNthCalledWith(4, '<p>test</p>'),
    { timeout: 2000 }
  );
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.FORMATTING,
      ]}
    />
  );

  const bold = screen.queryByTestId('bold-button');
  const italic = screen.queryByTestId('italic-button');

  expect(bold).not.toBeInTheDocument();
  expect(italic).not.toBeInTheDocument();
});
