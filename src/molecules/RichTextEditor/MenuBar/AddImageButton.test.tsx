import { faker } from '@faker-js/faker';

import {
  RichTextEditor,
  RichTextEditorProps,
} from 'src/molecules/RichTextEditor/RichTextEditor';
import { RichTextEditorFeatures } from 'src/molecules/RichTextEditor/RichTextEditor.types';
import {
  fireEvent,
  renderWithProviders,
  screen,
} from 'src/tests/browsertest-utils';
import { userEvent } from 'src/tests/browsertest-utils';

function fakeProps(withImage = false): RichTextEditorProps {
  return {
    value: `<p>${faker.animal.fish()}</p>`,
    onChange: vi.fn(),
    onImageUpload: withImage ? vi.fn() : undefined,
  };
}

test('Able to click', async () => {
  const props = fakeProps(true);
  renderWithProviders(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );
  const user = userEvent.setup();

  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();

  await user.click(button);
});

test('Add image button works', async () => {
  const props = fakeProps(true);
  renderWithProviders(
    <RichTextEditor {...props} features={[RichTextEditorFeatures.IMAGES]} />
  );

  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();

  const inputField =
    document.querySelector<HTMLInputElement>('input[type="file"]');

  const spy = vi.spyOn(console, 'error');
  fireEvent.change(inputField!, 'empty');
  expect(spy).toHaveBeenCalledWith('Files undefined');

  const fakeFile = new File(['(⌐□_□)'], 'chucknorris.png');
  fireEvent.change(inputField!, { target: { files: [fakeFile] } });

  expect(props.onImageUpload).toBeCalledWith(fakeFile);
});

test('Hides button if not in features', async () => {
  const props = fakeProps(true);
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );

  const button = screen.queryByTestId('add-image-button');
  expect(button).not.toBeInTheDocument();
});
