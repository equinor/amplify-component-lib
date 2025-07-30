import {
  RichTextEditor,
  RichTextEditorFeatures,
  RichTextEditorProps,
} from 'src/molecules';
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

test('Highlights text when button is clicked', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const button = await screen.findByTestId('highlight-button');

  expect(button).toBeInTheDocument();

  await user.dblClick(screen.getByText('test'));
  await user.click(button);

  expect(props.onChange).toHaveBeenCalledWith('<p><mark>test</mark></p>');
});
