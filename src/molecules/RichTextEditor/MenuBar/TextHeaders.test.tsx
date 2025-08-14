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

test('Able to click header buttons', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const heading2 = await screen.findByTestId('h2-button');
  const heading3 = await screen.findByTestId('h3-button');

  await user.tripleClick(screen.getByText('test'));

  expect(heading2).toBeInTheDocument();
  expect(heading3).toBeInTheDocument();

  await user.click(heading2);

  expect(props.onChange).toHaveBeenNthCalledWith(1, '<h2>test</h2>');

  await user.click(heading2);
  expect(props.onChange).toHaveBeenNthCalledWith(2, '<p>test</p>');

  await user.click(heading3);

  expect(props.onChange).toHaveBeenNthCalledWith(3, '<h3>test</h3>');

  await user.click(heading3);
  expect(props.onChange).toHaveBeenNthCalledWith(4, '<p>test</p>');
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.HEADERS,
      ]}
    />
  );

  const heading2 = screen.queryByTestId('h2-button');
  const heading3 = screen.queryByTestId('h3-button');

  expect(heading2).not.toBeInTheDocument();
  expect(heading3).not.toBeInTheDocument();
});
