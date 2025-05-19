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
} from 'src/tests/browsertest-utils';

function fakeProps(text = faker.animal.fish()): RichTextEditorProps {
  return {
    value: `<p><span style="color: #f50000">${text}</span></p>`,
    onChange: vi.fn(),
  };
}

test('Able to click clear formatting button', async () => {
  const text = faker.animal.dog();
  const props = fakeProps(text);
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const button = await screen.findByTestId('clear-formatting');

  await user.dblClick(screen.getByText(text));

  await user.click(button);

  expect(props.onChange).toHaveBeenCalledWith(`<p>${text}</p>`);
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
