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

test('Able to insert lists', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  // Wait for tiptap init
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = userEvent.setup();

  const bullet = await screen.findByTestId('bullet-list-button');
  const ordered = await screen.findByTestId('ordered-list-button');

  expect(bullet).toBeInTheDocument();
  expect(ordered).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));

  expect(bullet).toBeEnabled();

  await user.click(bullet);

  expect(props.onChange).toHaveBeenNthCalledWith(
    1,
    `<ul><li><p>test</p></li></ul>`
  );

  await user.click(bullet);
  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(2, `<p>test</p>`)
  );

  await user.click(ordered);
  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(
      3,
      `<ol><li><p>test</p></li></ol>`
    )
  );

  await user.click(ordered);
  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(4, '<p>test</p>')
  );
});

test('Able to write lists', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  // Wait for tiptap init
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const user = userEvent.setup();

  const bullet = await screen.findByTestId('bullet-list-button');

  expect(bullet).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));

  await user.click(bullet);

  await user.keyboard('k');

  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(
      2,
      `<ul><li><p>k</p></li></ul>`
    )
  );

  await user.keyboard('{Enter}');

  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(
      3,
      `<ul><li><p>k</p></li><li><p></p></li></ul>`
    )
  );
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.LISTS,
      ]}
    />
  );

  const bullet = screen.queryByTestId('bullet-list-button');
  const ordered = screen.queryByTestId('ordered-list-button');

  expect(bullet).not.toBeInTheDocument();
  expect(ordered).not.toBeInTheDocument();
});
