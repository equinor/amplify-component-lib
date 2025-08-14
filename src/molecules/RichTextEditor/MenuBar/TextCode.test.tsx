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

test('Able to click code button', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const button = await screen.findByTestId('code-button');

  expect(button).toBeInTheDocument();

  await user.click(button);

  expect(props.onChange).toHaveBeenCalledWith('<pre><code>test</code></pre>');

  await user.click(button);
  expect(props.onChange).toHaveBeenCalledWith('<p>test</p>');
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.CODE,
      ]}
    />
  );

  const button = screen.queryByTestId('code-button');

  expect(button).not.toBeInTheDocument();
});
