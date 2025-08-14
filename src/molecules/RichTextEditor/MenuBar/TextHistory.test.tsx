import {
  RichTextEditor,
  RichTextEditorProps,
} from 'src/molecules/RichTextEditor/RichTextEditor';
import { RichTextEditorFeatures } from 'src/molecules/RichTextEditor/RichTextEditor.types';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

function fakeProps(): RichTextEditorProps {
  return {
    value: `<p>test</p>`,
    onChange: vi.fn(),
  };
}

test('Able to click undo/redo buttons', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const undo = await screen.findByTestId('undo-button');
  const redo = await screen.findByTestId('redo-button');

  expect(undo).toBeInTheDocument();
  expect(undo).toBeDisabled();
  expect(redo).toBeInTheDocument();
  expect(redo).toBeDisabled();

  await user.click(screen.getByText('test'));

  await user.keyboard('i');

  expect(undo).toBeEnabled();
  expect(redo).toBeDisabled();

  await user.click(undo);
  expect(props.onChange).toHaveBeenNthCalledWith(2, '<p>test</p>');

  await user.click(redo);
  expect(props.onChange).toHaveBeenNthCalledWith(3, '<p>testi</p>');
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.UNDO_REDO,
      ]}
    />
  );

  const undo = screen.queryByTestId('undo-button');
  const redo = screen.queryByTestId('redo-button');

  expect(undo).not.toBeInTheDocument();
  expect(redo).not.toBeInTheDocument();
});
