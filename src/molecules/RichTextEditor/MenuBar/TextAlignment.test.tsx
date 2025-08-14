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

test('Able to click alignment buttons', async () => {
  const props = fakeProps();
  renderWithProviders(
    <RichTextEditor
      {...props}
      removeFeatures={[RichTextEditorFeatures.IMAGES]}
    />
  );
  const user = userEvent.setup();

  const left = await screen.findByTestId('align-left-button');
  const center = await screen.findByTestId('align-center-button');
  const right = await screen.findByTestId('align-right-button');

  expect(left).toBeInTheDocument();
  expect(center).toBeInTheDocument();
  expect(right).toBeInTheDocument();

  await user.click(left);

  expect(props.onChange).toHaveBeenCalledWith(
    '<p style="text-align: left;">test</p>'
  );
  await user.click(center);
  expect(props.onChange).toHaveBeenCalledWith(
    '<p style="text-align: center;">test</p>'
  );
  await user.click(right);
  expect(props.onChange).toHaveBeenCalledWith(
    '<p style="text-align: right;">test</p>'
  );
});

test('Hides buttons if not in features', async () => {
  renderWithProviders(
    <RichTextEditor
      {...fakeProps()}
      removeFeatures={[
        RichTextEditorFeatures.IMAGES,
        RichTextEditorFeatures.ALIGNMENT,
      ]}
    />
  );

  const left = screen.queryByTestId('align-left-button');
  const center = screen.queryByTestId('align-center-button');
  const right = screen.queryByTestId('align-right-button');

  expect(left).not.toBeInTheDocument();
  expect(center).not.toBeInTheDocument();
  expect(right).not.toBeInTheDocument();
});
