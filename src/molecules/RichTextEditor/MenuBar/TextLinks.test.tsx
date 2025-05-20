import { faker } from '@faker-js/faker';

import {
  RichTextEditor,
  RichTextEditorFeatures,
  RichTextEditorProps,
} from 'src/molecules';
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
  const user = userEvent.setup();

  const link = await screen.findByTestId('link-button');
  const unsetLink = await screen.findByTestId('unsetlink-button');

  expect(link).toBeInTheDocument();
  expect(link).toBeDisabled();
  expect(unsetLink).toBeInTheDocument();

  await user.dblClick(screen.getByText('test'));

  await waitFor(() => expect(link).toBeEnabled());

  await user.click(link);

  const randomUrl = faker.internet.url();
  await user.type(screen.getByPlaceholderText(/insert link/i), randomUrl);

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
