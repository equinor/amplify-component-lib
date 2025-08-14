import { faker } from '@faker-js/faker';

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

test('Able to insert links', async () => {
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

  const link = await screen.findByTestId('link-button');
  const unsetLink = await screen.findByTestId('unsetlink-button');

  expect(link).toBeInTheDocument();
  expect(link).toBeDisabled();
  expect(unsetLink).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));

  await user.click(link);

  const randomUrl = faker.internet.url();
  const linkField = await screen.findByPlaceholderText(/insert link/i);
  await user.type(linkField, randomUrl);

  await user.click(screen.getByRole('button', { name: /save/i }));

  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(
      3,
      `<p><a target="_blank" rel="noopener noreferrer nofollow" href="${randomUrl}">test</a></p>`
    )
  );

  await user.click(unsetLink);
  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(4, '<p>test</p>')
  );
});

test('Able to insert links with {Enter}', async () => {
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

  const link = await screen.findByTestId('link-button');
  const unsetLink = await screen.findByTestId('unsetlink-button');

  expect(link).toBeInTheDocument();
  expect(unsetLink).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));

  await user.click(link);

  const randomUrl = faker.internet.url();
  const linkField = await screen.findByPlaceholderText(/insert link/i);
  await user.type(linkField, randomUrl);

  await user.keyboard('{Enter}');

  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(
      3,
      `<p><a target="_blank" rel="noopener noreferrer nofollow" href="${randomUrl}">test</a></p>`
    )
  );

  await user.click(unsetLink);
  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(4, '<p>test</p>')
  );
});

test('Prepends https if link doesnt include it', async () => {
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

  const link = await screen.findByTestId('link-button');
  const unsetLink = await screen.findByTestId('unsetlink-button');

  expect(link).toBeInTheDocument();
  expect(link).toBeDisabled();
  expect(unsetLink).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));

  await user.click(link);

  const randomUrl = 'vg.no';
  await user.type(screen.getByPlaceholderText(/insert link/i), randomUrl);

  await user.keyboard('{Enter}');

  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(
      3,
      `<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://${randomUrl}">test</a></p>`
    )
  );

  await user.click(unsetLink);
  await waitFor(() =>
    expect(props.onChange).toHaveBeenNthCalledWith(4, '<p>test</p>')
  );
});

test('Trying to insert invalid link doesnt work', async () => {
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

  const link = await screen.findByTestId('link-button');
  const unsetLink = await screen.findByTestId('unsetlink-button');

  expect(link).toBeInTheDocument();
  expect(link).toBeDisabled();
  expect(unsetLink).toBeInTheDocument();

  await user.tripleClick(screen.getByText('test'));

  await user.click(link);

  const randomUrl = faker.animal.dog();
  await user.type(screen.getByPlaceholderText(/insert link/i), randomUrl);

  await user.click(screen.getByRole('button', { name: /save/i }));

  // Save button still there
  await waitFor(() =>
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  );

  await waitFor(() =>
    expect(screen.getByPlaceholderText(/insert link/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    )
  );
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.LINKS,
      ]}
    />
  );

  const link = screen.queryByTestId('link-button');
  const unset = screen.queryByTestId('unsetlink-button');

  expect(link).not.toBeInTheDocument();
  expect(unset).not.toBeInTheDocument();
});
