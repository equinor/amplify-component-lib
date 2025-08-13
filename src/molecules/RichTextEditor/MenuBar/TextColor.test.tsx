import {
  RichTextEditor,
  RichTextEditorProps,
} from 'src/molecules/RichTextEditor/RichTextEditor';
import { RichTextEditorFeatures } from 'src/molecules/RichTextEditor/RichTextEditor.types';
import {
  fireEvent,
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

test('Able to change color', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();
  const input = await screen.findByTestId('text-color-input');

  await user.tripleClick(screen.getByText('test'));
  expect(input).toBeInTheDocument();

  (input as HTMLInputElement).value = '#f50000';
  fireEvent.input(input, '#f50000');

  await waitFor(
    () =>
      expect(props.onChange).toHaveBeenCalledWith(
        '<p><span style="color: rgb(245, 0, 0);">test</span></p>'
      ),
    { timeout: 5000 }
  );
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.TEXT_COLOR,
      ]}
    />
  );

  const input = screen.queryByTestId('text-color-input');

  expect(input).not.toBeInTheDocument();
});
