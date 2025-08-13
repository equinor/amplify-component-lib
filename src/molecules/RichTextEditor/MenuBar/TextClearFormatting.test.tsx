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

function fakeProps(text = faker.animal.fish()): RichTextEditorProps {
  return {
    value: `<p><span style="color: #f50000">${text}</span></p>`,
    onChange: vi.fn(),
  };
}

test('Able to click clear formatting button', async () => {
  const text = faker.person.firstName();
  const props = fakeProps(text);
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const button = await screen.findByTestId('clear-formatting');

  await user.tripleClick(screen.getByText(text));

  await user.click(button);

  await waitFor(() =>
    expect(props.onChange).toHaveBeenCalledWith(`<p>${text}</p>`)
  );
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.CLEAR_FORMATTING,
      ]}
    />
  );

  const button = screen.queryByTestId('clear-formatting');
  expect(button).not.toBeInTheDocument();
});
